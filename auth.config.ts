import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdminRoute = nextUrl.pathname.startsWith("/admin")
      const isLoginPage = nextUrl.pathname === "/admin/login"
      const isAuthApi = nextUrl.pathname.startsWith("/api/auth")

      if (isAuthApi) return true
      if (!isAdminRoute) return true
      if (isLoginPage) return true
      return isLoggedIn
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as "SUPER_ADMIN" | "EDITOR"
      }
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
