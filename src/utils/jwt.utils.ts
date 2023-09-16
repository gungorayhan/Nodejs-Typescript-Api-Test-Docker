import jwt from 'jsonwebtoken'
import config from 'config'

const publicKey=config.get<string>("publicKey")
const privateKey=config.get<string>("privateKey")


export async function signJwt(object:Object,options?: jwt.SignOptions | undefined){
    return await jwt.sign(object,privateKey,{
        ...(options && options)
        // ,
        // algorithm:'RS256'
    })
}


export async function verifyJwt(token:string){
    try {
        const decoded = await jwt.verify(token,privateKey)
        return {
            valid:true,
            expired:false,
            decoded
        }
    } catch (e:any) {
        return {
            valid:false,
            expired:e.message==='jwt expired',
            decoded:null
        }
    }
}


// function kayitsil(model:string){
//     return void
// delete top(80) persent tabloadi 
// from tabloadi
//  where modeladi=@model
// group by 
// having by
// }

// select kayitsil(modeladi),bantadi 
// from tabloadi
// where nolgeid=15;