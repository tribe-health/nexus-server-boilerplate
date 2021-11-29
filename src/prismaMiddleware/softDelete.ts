import { Prisma, PrismaClient } from '@prisma/client'

export function applySoftDeleteMiddleware(prisma: PrismaClient): void {
  softDelete(prisma, Prisma.ModelName.User)
}

/**
 * @param modelName Referenced model must define isDeleted
 */
function softDelete(prisma: PrismaClient, modelName: Prisma.ModelName): void {
  prisma.$use(enforceSoftDelete(modelName))
  prisma.$use(preventRead(modelName))
  prisma.$use(preventUpdate(modelName))
}

function enforceSoftDelete(modelName: Prisma.ModelName) {
  return async function (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>,
  ): Promise<any> {
    if (params.model == modelName) {
      if (params.action == 'delete') {
        params.action = 'update'
        params.args['data'] = { isDeleted: true }
      }
      if (params.action == 'deleteMany') {
        params.action = 'updateMany'
        if (params.args.data != undefined) {
          params.args.data['isDeleted'] = true
        } else {
          params.args['data'] = { isDeleted: true }
        }
      }
    }
    return next(params)
  }
}

/**
 * Exclude deleted records if they have not been explicity requested
 */
function preventRead(modelName: Prisma.ModelName) {
  return async function (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>,
  ): Promise<any> {
    if (params.model == modelName) {
      if (params.action == 'findUnique') {
        params.action = 'findFirst'
        params.args.where['isDeleted'] = false
      }
      if (params.action == 'findMany') {
        if (params.args.where != undefined) {
          if (params.args.where.isDeleted == undefined) {
            params.args.where['isDeleted'] = false
          }
        } else {
          params.args['where'] = { deleted: false }
        }
      }
    }
    return next(params)
  }
}

/**
 * Exclude deleted records
 */
function preventUpdate(modelName: Prisma.ModelName) {
  return async function (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>,
  ): Promise<any> {
    if (params.model == modelName) {
      if (params.action == 'update') {
        // Changing update to updateMany alters return type of update queries from modelName to { count: n }
        params.action = 'updateMany'
        params.args.where['isDeleted'] = false
      }
      if (params.action == 'updateMany') {
        if (params.args.where != undefined) {
          params.args.where['isDeleted'] = false
        } else {
          params.args['where'] = { isDeleted: false }
        }
      }
    }
    return next(params)
  }
}
