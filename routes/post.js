import express from "express";
import {
  createPost,
  deletePost,
  editPost,


} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";


/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });
  

const router = express.Router();

// create post
router.post("/create", verifyToken, upload.single("picture"), createPost);


/* Delete */
router.delete("/:id/deletePost", verifyToken, deletePost);

/* Edit*/
router.put("/edit", verifyToken, upload.single("picture"), editPost);



export default router;
