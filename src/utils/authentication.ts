import jwt, { JwtPayload } from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import { Request } from 'express'

const handleSigningKeyError = (err: Error, cb: any) => {
  if (err && err.name === 'SigningKeyNotFoundError') {
    return cb(null)
  }

  if (err) {
    return cb(err)
  }
}

const verifyToken = async (bearerToken: string): Promise<JwtPayload | null> => {
  const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  })
  const onError = handleSigningKeyError

  function getJwksClientKey(header: any, callback: any) {
    client.getSigningKey(header.kid, function (err, key) {
      if (err) {
        return onError(err, (newError: any) => callback(newError, null))
      }
      const signingKey = key.getPublicKey()
      callback(null, signingKey)
    })
  }

  return new Promise((resolve, reject) => {
    jwt.verify(
      bearerToken,
      getJwksClientKey,
      {
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256'],
      },
      (error, decoded) => {
        if (error) {
          reject({ error })
        }
        if (decoded) {
          resolve(decoded)
        }
      },
    )
  })
}

export const getUserToken = async (
  req: Request,
): Promise<JwtPayload | null> => {
  let userToken = null

  try {
    const authHeader = req?.headers?.authorization || ''
    if (authHeader) {
      const token = authHeader.split(' ')[1]
      const payload = await verifyToken(token)

      if (payload) {
        userToken = payload
      }
    }
  } catch (error) {
    console.log(error)
  }

  return userToken
}
