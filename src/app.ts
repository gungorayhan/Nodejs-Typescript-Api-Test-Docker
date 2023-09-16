import express from  "express"
import config from "config"
import logger from "./utils/logger"
import connect from "./utils/connect"
import routes from "./routes"
import  deserializeUser  from "./middleware/deserializeUser"
const port = config.get<number>('port')
console.log(port)
const app=express()
app.use(express.json())

app.use(deserializeUser)

app.listen(port,()=>{
    logger.info(`App is running on port: http://localhost:${port}`)
    connect()
    routes(app)
})