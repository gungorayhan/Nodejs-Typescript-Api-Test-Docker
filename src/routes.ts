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
import { createProductHandler, getProductHandler, updateProductHandler } from "./controllers/product.controller"


function routes(app: Express) {
    logger.info("Routes Here")
    app.get("/healthcheck", async (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    app.post("/api/users", validateResource(createUserSchema), createUserHandler)
    app.post("/api/sessions", validateResource(craeteSessionSchema), createUserSessionHandler)
    app.get("/api/sessions", requireUser, getUserSessionsHandler)
    app.delete("/api/sessions", requireUser, deleteSessionHandler)

    app.post("/api/product", [requireUser, validateResource(createProductSchema)],
        createProductHandler
    )

    app.put("/api/product/:productId", [requireUser, validateResource(updateProductSchema)],
        updateProductHandler
    )

    app.get("/api/prodcut/:productId", validateResource(getProdcutSchema),
        getProductHandler
    )

    app.delete("/api/product/:productId",[requireUser,validateResource(deleteProducSchema)],
        deleteSessionHandler
    )
}


export default routes