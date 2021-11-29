import { ApolloServer } from 'apollo-server-express'
import * as dotenv from 'dotenv'
import express from 'express'
import expressJwt from 'express-jwt'
import { graphqlUploadExpress } from 'graphql-upload'
import jwksRsa from 'jwks-rsa'

import { createContext } from './context'
import { schema } from './schema'

dotenv.config()

const PORT = parseInt(`${process.env.PORT}`, 10) || 4000

async function startApolloServer() {
  const server = new ApolloServer({
    schema: schema,
    context: createContext,
  })
  await server.start()

  const app = express()

  app.use(
    expressJwt({
      secret: jwksRsa.expressJwtSecret({
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256'],
      credentialsRequired: false,
      resultProperty: 'locals.user',
    }),
  )
  app.use(graphqlUploadExpress())

  server.applyMiddleware({
    app,
    path: '/',
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  await new Promise((resolve) => app.listen({ port: PORT }, resolve))
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
  )
}

startApolloServer()
