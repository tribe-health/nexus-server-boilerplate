import { rule } from 'graphql-shield'
import { JwtPayload } from 'jsonwebtoken'

import { Context } from '../context'

function checkPermission(jwtPayload: JwtPayload | null, permission: string) {
  if (jwtPayload && jwtPayload.permissions) {
    return jwtPayload.permissions.includes(permission)
  }
  return false
}
function checkRole(jwtPayload: JwtPayload | null, role: string) {
  if (jwtPayload && jwtPayload.roles) {
    return jwtPayload.roles.includes(role)
  }
  return false
}

export const rules = {
  isAuthenticated: rule({ cache: 'contextual' })(
    async (_parent, _args, ctx: Context) => {
      return Boolean(ctx.jwtPayload?.sub)
    },
  ),
  isUser: rule({ cache: 'contextual' })((_parent, _args, context: Context) => {
    return checkRole(context.jwtPayload, 'user')
  }),
  isCreateMyUser: rule()((_parent, _args, _context: Context, info) => {
    return info.path.prev?.key === 'createMyUser'
  }),
  canReadUser: rule()((parent, _args, context: Context) => {
    return (
      (parent.authenticationId === context.jwtPayload?.sub &&
        checkPermission(context.jwtPayload, 'read:own_user')) ||
      checkPermission(context.jwtPayload, 'read:any_user')
    )
  }),
  canUpdateUser: rule()((parent, _args, context: Context) => {
    return (
      (parent.authenticationId === context.jwtPayload?.sub &&
        checkPermission(context.jwtPayload, 'update:own_user')) ||
      checkPermission(context.jwtPayload, 'update:any_user')
    )
  }),
  canDeleteUser: rule()((parent, _args, context: Context) => {
    return (
      (parent.authenticationId === context.jwtPayload?.sub &&
        checkPermission(context.jwtPayload, 'delete:own_user')) ||
      checkPermission(context.jwtPayload, 'delete:any_user')
    )
  }),
}
