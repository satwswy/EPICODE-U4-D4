import express from "express";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { getBlogPosts, writeBlogPosts } from "../../lib/fs-tools";

const blogPostsRouter = express.Router();


blogPostsRouter.post("/", async (req, res, next) => {
  try {
    const newBlogPost = { ...req.body, createdAt: new Date(), id: uniqid() };
    const blogPostsArray = await getBlogPosts();
    blogPostsArray.push(newBlogPost);
    await writeBlogPosts(blogPostsArray);
    res.status(201).send({ id: newBlogPost.id });
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.get("/", async (req, res, next) => {
  try {
    const blogPostsArray = await getBlogPosts();
    res.send(blogPostsArray);
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.get("/:blogPostId", async (req, res, next) => {
  try {
    const blogID = req.params.blogPostId;
    const blogPostsArray = await getBlogPosts();
    const blogPostFound = blogPostsArray.find(
      (current) => current.id === blogID
    );
    res.send(blogPostFound);
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.put("/:blogPostId", async (req, res, next) => {
  try {
    const blogPostsArray = await getBlogPosts();
    const index = blogPostsArray.findIndex(
      (current) => current.id === req.params.blogPostId
    );
    if (index !== -1) {
      const oldPost = blogPostsArray[index];
      const updatedPost = { ...oldPost, ...req.body, updatedAt: new Date() };
      blogPostsArray[index] = updatedPost;
      await writeBlogPosts(blogPostsArray);
      res.send(updatedPost);
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.blogPostId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.delete("/:blogPostId", async (req, res, next) => {
    try {
        const blogPostsArray = await getBlogPosts();
  const remainingPosts = blogPostsArray.filter(
    (current) => current.id !== req.params.blogPostId
  );
 await writeBlogPosts(remainingPosts);
  res.status(204).send();
    } catch (error) {
        next(error)
    }
   
});

export default blogPostsRouter;
