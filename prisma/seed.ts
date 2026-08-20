import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { resolveDatabaseUrl } from "../lib/database-url"
import { seedWebsiteContent } from "../lib/seed-website-content"

resolveDatabaseUrl()

const prisma = new PrismaClient()

async function main() {
  const result = await seedWebsiteContent(prisma, { skipAdmin: false })
  console.log("Seed complete:", result)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
