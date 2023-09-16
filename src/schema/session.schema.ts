import {object,string} from 'zod'

export const craeteSessionSchema =object({
    body:object({
        email:string({
            required_error:'Email is require'
        }),
        password:string({
            required_error:'Password is require'
        })
    })
})