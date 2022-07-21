import express from "express";
import multer from "multer";
import { extname } from "path";
import { saveBlogPostsCovers } from "../../lib/fs-tools";

const filesRouter = express.Router();

filesRouter.post(
  "/singleCover/:id",
  multer({}).single("cover"),
  async (req, res, next) => {
    try {
      console.log("File: ", req.file);
      const fileName = extname(req.file.buffer);
      res.send("uploaded");
    } catch (error) {
      next(error);
    }
  }
);

filesRouter.post(
  "/multipleCover/:id",
  multer().array("covers"),
  async (req, res, next) => {
    try {
      console.log("Files: ", req.files);
      const arrayOfPromises = req.files.map((file) =>
        saveUsersAvatars(file.originalname, file.buffer)
      );
      await Promise.all(arrayOfPromises);
      res.send("UPLOADED");
    } catch (error) {
      next(error);
    }
  }
);
