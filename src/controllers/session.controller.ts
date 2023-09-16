import {Request,Response,NextFunction} from "express"
import { validatePassword } from "../services/user.service"
import { createSession, findSession,updateSession } from "../services/session.service"
import { signJwt } from "../utils/jwt.utils"
import config from "config"

export async function createUserSessionHandler(req:Request,res:Response){

    //validate the user's password
    const user = await validatePassword(req.body)
    if(!user) return res.status(401).send('Invalid email or password')

    // create a session
    const session = await createSession(user._id, req.get('user-agent') || '')

    // create an access token 
    const accessToken = await signJwt(
        {...user,session:session._id},
        {expiresIn:config.get('accessTokenTtl')} 
        )

    // create a refresh token 
    const refreshToken =await signJwt(
        {...user,session:session._id},
        {expiresIn:config.get('refreshTokenTtl')} 
        )
        res.setHeader('x-refresh',refreshToken)
    // return access  refresh tokens
    return res.send({accessToken,refreshToken})
}

export async function getUserSessionsHandler(req:Request,res:Response){
    const userId = res.locals.user._id
    const sessions = await findSession({user:userId,valid:true})
    return res.send(sessions)
}

export async function deleteSessionHandler(req:Request,res:Response){
    const sessionId= res.locals.user.session;
    console.log(sessionId,"sessions ıd")
    await updateSession({_id:sessionId},{valid:false})

    return res.send({
        accessToken:null,
        refreshToken:null
    })
}