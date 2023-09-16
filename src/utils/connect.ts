import mongoose from "mongoose"
import config from "config"
import logger from "./logger"

function connect(){
    const dbUri = config.get<string>("dbUri")
    try {
        mongoose.connect(dbUri)
        logger.info("DB connect")
    } catch (error) {
        logger.error(error)
        process.exit(1)
    }
}

export default connect