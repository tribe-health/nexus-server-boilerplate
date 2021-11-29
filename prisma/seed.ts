import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function range(start: number, end?: number, interval = 1) {
  // TODO: Deal with negative values and reversed ranges.
  const offset = end ? start : 0
  const length = (end ? end - start : start) / interval
  return Array.from({ length }, (_, i) => i * interval + offset)
}

async function main() {
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
