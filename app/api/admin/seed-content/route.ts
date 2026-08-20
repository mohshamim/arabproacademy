import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prismaReady } from "@/lib/prisma"
import { seedWebsiteContent } from "@/lib/seed-website-content"

export async function POST() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 })
  }
  if (session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ ok: false, message: "Super Admin only" }, { status: 403 })
  }

  try {
    const prisma = await prismaReady()
    const result = await seedWebsiteContent(prisma, { skipAdmin: true })
    return NextResponse.json({
      ok: true,
      message: "Website content seeded into MySQL.",
      result,
    })
  } catch (err) {
    console.error("[seed-content]", err)
    return NextResponse.json(
      {
        ok: false,
        message: err instanceof Error ? err.message : "Seed failed",
      },
      { status: 500 },
    )
  }
}
