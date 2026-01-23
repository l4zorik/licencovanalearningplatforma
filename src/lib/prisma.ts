import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  if (!process.env.POSTGRES_PRISMA_URL) {
    console.warn('POSTGRES_PRISMA_URL is not defined. Prisma Client will not be initialized.')
    // Return a dummy object or undefined proxy to prevent immediate crash, 
    // but actual DB calls will fail or need checks. 
    // For now, we return undefined cast as any to satisfy type, 
    // but consuming code must check for existence or we handle it here.
    // Better strategy: Return a proxy that logs errors on access?
    // Simplest safe fix for deployment:
    return new PrismaClient({
      datasources: {
        db: {
          url: "postgresql://dummy:dummy@localhost:5432/dummy" // Fake URL to pass validation if empty
        }
      }
    })
  }
  return new PrismaClient()
}

export const prisma =
  globalThis.__prisma ??
  prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma
}