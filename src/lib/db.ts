import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | null }

function createClient(): PrismaClient | null {
  const url = process.env.DATABASE_URL
  if (!url || url.includes('[PASSWORD]') || url.includes('[HOST]')) return null
  try {
    const adapter = new PrismaPg({ connectionString: url })
    return new PrismaClient({ adapter })
  } catch {
    return null
  }
}

export const db = (globalForPrisma.prisma !== undefined
  ? globalForPrisma.prisma
  : createClient()) as PrismaClient

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
