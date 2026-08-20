import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!hasDatabaseUrl()) {
    return NextResponse.json({ error: "No database" }, { status: 500 })
  }

  const prisma = await prismaReady()
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  })

  const header = [
    "id",
    "type",
    "status",
    "source",
    "name",
    "phone",
    "interest",
    "createdAt",
  ]
  const rows = leads.map((l) =>
    [
      l.id,
      l.type,
      l.status,
      l.source,
      l.name || "",
      l.phone || "",
      l.interest || "",
      l.createdAt.toISOString(),
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(","),
  )
  const csv = [header.join(","), ...rows].join("\n")

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=leads.csv",
    },
  })
}
