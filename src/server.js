import express from "express"
import blogPostsRouter from "./apis/blogs/index.js"
import listEndpoints from "express-list-endpoints"
import { badRequestHandler, genericServerErrorHandler, notFoundHandler, unauthorizedHandler } from "./errorHandlers.js"
import filesRouter from "./apis/files/index.js"
import {join} from "path"
import cors from "cors"

const server = express()

const port = 3002
const publicFolderPath = join(process.cwd(), "./public")
server.use(express.static(publicFolderPath))
server.use(cors())
server.use(express.json())

server.use("/blogPosts",blogPostsRouter )
server.use("/files", filesRouter)

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericServerErrorHandler)

server.listen(port, ()=> {
console.table(listEndpoints(server))
console.log("Server is running on port:", port)
})