import {object,string,TypeOf} from "zod"
import { Omit } from "lodash"

export const createUserSchema = object({
    body:object({
        name:string({
            required_error:'Name is Required'
        }),
        password:string({
            required_error:''
        }).min(6,'Password too short - should be 6 chars minimum'),
        passwordConfirmation:string({
            required_error:'password Confirimation is required'
        }),
        email:string({
            required_error:'Email is required'
        }).email('Not a valid email')
    }).refine((data)=>data.password===data.passwordConfirmation,{
        message:"Password do not match",
        path:["passwordConfirmation"]
    })
})

export type CreateUserInput = Omit<
TypeOf<typeof createUserSchema>,
'body.passwordConfirmation'
>
 
// type CreateUserInput = { 
//     body: {
//         email: string;
//         name: string;
//         password: string;
//         passwordConfirmation: string;
//     };
// }
//CreateUserInput['body']