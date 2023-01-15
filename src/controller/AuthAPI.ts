import { ApolloError } from "apollo-server-errors";
import { verify } from 'jsonwebtoken'

export class AuthAPI{
    verifyToken(token: string): boolean{
        if(!token) throw new ApolloError('missing token')
        const decode = verify(token, process.env.JWT_SECRET)
        return !!decode
    }
}