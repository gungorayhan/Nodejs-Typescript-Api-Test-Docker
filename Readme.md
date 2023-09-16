## npm 
npm init -y <br/>
npx tsc --init <br/> 
tsconfig.json add ->  "outDir":"build" <br/>
npm i express zod config cors express mongoose pino pino-pretty dayjs bcrypt jsonwebtoken lodash nanoid <br/>

npm i @types/body-parser @types/config @types/cors @types/express @types/node @types/pino @types/bcrypt @types/jsonwebtoken @types/lodash @types/nanoid ts-node-dev typescript -D

## src
src/app.ts<br/>

## script
"dev":"ts-node-dev --respawn --transpile-only src/app.ts"<br/>

## add config
default.ts

## utils
db connect - logger 

## routes
test-> curl http://localhost:1337/healthcheck

## middleware 
validateResource

## models
user.model

## controllers
user.controller

## services
user.service

## schema
user.schema