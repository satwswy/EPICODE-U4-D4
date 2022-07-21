import {fileURLToPath} from "url"
import {dirname, join} from "path"
import fs from "fs-extra"

const {readJSON, writeJSON, writeFile} = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)),"../data")
const blogPostsJSONPath = join(dataFolderPath, "blogPosts.json")
const blogPostsPublicFolderPath = join(process.cwd(), "./public/img/blogPosts")

export const getBlogPosts = () => readJSON(blogPostsJSONPath)
export const writeBlogPosts = blogPostsArray => writeJSON(blogPostsJSONPath, blogPostsArray) 

export const saveBlogPostsCovers = (fileName, contentAsABuffer) => writeFile(join(blogPostsPublicFolderPath, fileName), contentAsABuffer)
