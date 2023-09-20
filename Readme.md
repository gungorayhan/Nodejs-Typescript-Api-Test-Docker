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


## test 
npm i supertest jest ts-jest @types/jest @types/supertest -D <br/>

jest.config.js <br/>

__test__ folder <br/>

package.json --> "test":"jest"

npm run test and npm run --watchAll <br/> 
npm run test --detectOpenHandles

## api performance with prometheus

npm i prom-client response-time

npm i @types/response-time -D <br/>

utils -> metric -> create new app 

## swagger 
npm i swagger-jsdoc swagger-ui-express <br/>
npm i @types/swagger-jsdoc @types/swagger-ui-express -D <br/>
utils -> swagger <br/> 
tsconfig.json -> "resolveJsonModule":true <br/>




## env 
npm i docenv

## docker 
.dockerignore <br/>

Dockerfile <br/>

docker build . -t rest-api<br/>
docker pull mongo<br/>
 
## docker --link  --> mongoose.connect("mongodb://mongo-alias:27017/rest-api-typescript") --- use alias name 
docker run ---name mongo-server -p 27017:27017 -d mongo<br/> 
docker run --link mongo-server:mongo-alias -p 1337:1337 -d todo-app<br/>

## docker --network mongoose.connect("mongodb://mongo-server:27017/todos") -- use container name
docker network create --drive bridge --submit 182.18.0.1/24 --gateway 182.18.0.1 rest-api-network <br/>
docker run --name mongo-server --net rest-api-network -d mongo<br/>
docker run --net rest-api-network -p 1337:1337 rest-api <br/>

## docker-compose.yml
docker-compose.yml <br/>
docker-compose build<br/>
docker-compose up <br/>


