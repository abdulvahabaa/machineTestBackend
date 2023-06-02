import express from "express";
import {
  createPost,
  deletePost,
  editPost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";


/* FILE STORAGE */

const storage = multer.memoryStorage()
const upload = multer({ storage:storage })
  

const router = express.Router();

// create post
router.post("/create",verifyToken,  upload.single("picture"), createPost);


/* Delete */
router.delete("/:id/deletePost", verifyToken, deletePost);

/* Edit*/
router.put("/edit", verifyToken, upload.single("picture"), editPost);



export default router;
