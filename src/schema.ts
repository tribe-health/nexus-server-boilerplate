import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus'

import * as types from './nexusTypes'
import { permissions } from './permissions'

const schemaWithoutPermissions = makeSchema({
  types: [types],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

export const schema = applyMiddleware(schemaWithoutPermissions, permissions)
