import supertest from "supertest";
import createServer from "../utils/server"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose";
import { createProduct } from "../services/product.service";
import { signJwt } from "../utils/jwt.utils";

const app = createServer();

const userId= new mongoose.Types.ObjectId().toString();
export const productPayload = {
    user: userId,
    title: 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
    description: "Design for first-time Dslr",
    price: 20000,
    image:"https://i.imgur.com/QlRphfQ.jpg"
}

export const userPayload={
    _id:userId,
    email:'merndeveloperjs@gmail.com',
    name:'ayhangungor'
}

describe.skip('product', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())
    })

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    })

    describe('get product route', () => {

        describe('given the product does not exits', () => {
            it('should return a 404', async () => {
                //expect(true).toBe(true)
                const productId = 'product-123';
                await supertest(app).get(`/api/products/${productId}`).expect(404)
            })
        })

        describe("given the product does exist", () => {
            it("sholuld return 200 status and the product", async()=> {

                const product = await createProduct(productPayload)

               const {body,statusCode}= await supertest(app).get(`/api/products/${product.productId}`)

               expect(statusCode).toBe(200)
               expect(body.productId).toBe(product.productId);

            })
        })

    })

    describe('create product route',()=>{
            describe('given the user is not logged in ',()=>{
                //it.only
                it('should return a 403',async()=>{

                    const {statusCode} = await supertest(app).post('/api/products')
                    expect(statusCode).toBe(403)

                })
            })
            //describe.only
            //describe.skip
            describe('given the user is logged in ',()=>{
                it('should return a 200 and create the product',async()=>{
                    const jwt = await signJwt(userPayload)
                    const {statusCode,body} = await supertest(app).post('/api/products')
                    .set('Authorization', `Bearer ${jwt}`)
                    .send(productPayload)
                    expect(statusCode).toBe(200)
                    expect(body).toEqual({
                        __v: 0,
                        _id: expect.any(String),
                        title: 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
                        description: "Design for first-time Dslr",
                        price: 20000,
                        image:"https://i.imgur.com/QlRphfQ.jpg",
                        productId: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        user: expect.any(String),
                    })
                })
            })
    })
})