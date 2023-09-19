import { Express, Request, Response, NextFunction } from "express"
import { createUserHandler } from "./controllers/user.controllers"
import logger from "./utils/logger"
import validateResource from "./middleware/validateResource"
import { createUserSchema } from "./schema/user.schema"
import {
    createUserSessionHandler,
    deleteSessionHandler,
    getUserSessionsHandler
} from "./controllers/session.controller"
import { craeteSessionSchema } from "./schema/session.schema"
import deserializeUser from "./middleware/deserializeUser"
import requireUser from "./middleware/requireUser"
import { createProductSchema, deleteProducSchema, getProdcutSchema, updateProductSchema } from "./schema/product.schema"
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controllers/product.controller"


function routes(app: Express) {
    logger.info("Routes Here")

    /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
    app.get("/healthcheck", async (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
    app.post("/api/users", validateResource(createUserSchema), createUserHandler)
    app.post("/api/sessions", validateResource(craeteSessionSchema), createUserSessionHandler)
    app.get("/api/sessions", requireUser, getUserSessionsHandler)
    app.delete("/api/sessions", requireUser, deleteSessionHandler)

    app.post("/api/products", [requireUser, validateResource(createProductSchema)],
        createProductHandler
    )

    app.put("/api/products/:productId", [requireUser, validateResource(updateProductSchema)],
        updateProductHandler
    )

    app.get("/api/products/:productId", validateResource(getProdcutSchema),
        getProductHandler
    )

    app.delete("/api/products/:productId",[requireUser,validateResource(deleteProducSchema)],
        deleteProductHandler
    )
}


export default routes