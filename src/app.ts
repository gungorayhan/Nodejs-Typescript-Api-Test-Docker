import express,{Request,Response} from  "express"
import config from "config"
import logger from "./utils/logger"
import connect from "./utils/connect"
import createServer from "./utils/server"
import { startMetricsServer } from "./utils/metrics"


const port = config.get<number>('port')

const app= createServer();

app.listen(port,()=>{
    logger.info(`App is running on port: http://localhost:${port}`)
    connect()
    startMetricsServer()
})