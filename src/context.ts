import { PrismaClient } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express'
import { JwtPayload } from 'jsonwebtoken'

import { applySoftDeleteMiddleware } from './prismaMiddleware/softDelete'

export type Context = {
  prisma: PrismaClient
  jwtPayload: JwtPayload | null
}

const prisma = new PrismaClient()

applySoftDeleteMiddleware(prisma)

export async function createContext(ctx: ExpressContext): Promise<Context> {
  const jwtPayload = ctx.res.locals.user

  return { prisma, jwtPayload }
}
