import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { authConfig } from "./auth.config"
import { hasDatabaseUrl, prismaReady } from "@/lib/prisma"

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

async function logAttempt(email: string, success: boolean, ip?: string | null) {
  try {
    if (!hasDatabaseUrl()) return
    const prisma = await prismaReady()
    await prisma.loginAttempt.create({
      data: { email, success, ip: ip || null },
    })
  } catch {
    /* ignore */
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!process.env.AUTH_SECRET?.trim()) {
          console.error("[auth] AUTH_SECRET is missing")
          return null
        }

        if (!hasDatabaseUrl()) {
          console.error("[auth] DATABASE_URL / MYSQL_* is missing")
          return null
        }

        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) {
          console.error("[auth] invalid credentials payload", parsed.error)
          return null
        }

        const email = parsed.data.email.trim().toLowerCase()

        try {
          const prisma = await prismaReady()
          const user = await prisma.adminUser.findUnique({
            where: { email },
          })

          if (!user || !user.active) {
            await logAttempt(email, false)
            console.error("[auth] user not found or inactive", email)
            return null
          }

          const valid = await bcrypt.compare(
            parsed.data.password,
            user.passwordHash,
          )
          if (!valid) {
            await logAttempt(email, false)
            console.error("[auth] bad password for", user.email)
            return null
          }

          try {
            await prisma.adminUser.update({
              where: { id: user.id },
              data: { lastLoginAt: new Date() },
            })
          } catch (updateErr) {
            console.warn("[auth] lastLoginAt update skipped", updateErr)
          }
          await logAttempt(email, true)

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        } catch (err) {
          console.error("[auth] database error during login", err)
          return null
        }
      },
    }),
  ],
})
