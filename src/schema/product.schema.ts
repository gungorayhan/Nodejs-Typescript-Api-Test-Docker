import { object, string, number, TypeOf } from "zod"

const payload = {
    body: object({
        title: string({
            required_error: 'Title is required'
        }),
        description: string({
            required_error: 'Description is required'
        }).min(120, 'Description should be at least 120 chareaters long'),
        price: number({
            required_error: 'Price is required'
        }),
        image: string({
            required_error: 'Image is required'
        })
    })
}

const params = {
    params: object({
        productId: string({
            required_error: 'productId is required'
        })
    })
}

export const createProductSchema = object({
    ...payload
})

export const updateProductSchema = object({
    ...payload,
    ...params
})

export const deleteProducSchema = object({
    ...params
})

export const getProdcutSchema=object({
    ...params
})

export type CreateProductInput= TypeOf<typeof createProductSchema>
export type UpdateProductInput = TypeOf<typeof updateProductSchema>
export type GetProductInput=TypeOf<typeof getProdcutSchema>
export type DeleteProductInput = TypeOf<typeof deleteProducSchema>