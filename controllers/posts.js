import Post from "../models/Post.js";
import User from "../models/User.js";
import multer from "multer"
import { deleteFromS3, getFromS3, uploadTos3 } from "./s3bucket.js";


  

/* CREATE */

export const createPost = async (req, res) => {
  console.log("reached<<<<<<>>>>>>")
  try {

    console.log("req.file",req.file) 


    const { userId, description } = req.body;
    const user = await User.findById(userId);

    if(req.file){
      const image = await uploadTos3(req.file)
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        description,
        picturePath: image,
        
      });
      await newPost.save();
    }else{

      console.log("heiiiiiiiii>>>><<<<<<<<")
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        description,
        
       
      });
      await newPost.save();
    }
   

    const posts = await Post.find().sort("-createdAt");
    const updatedPosts = [];

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const imageUrl = await getFromS3(post.picturePath);
      post.set({ picturePath: imageUrl });

      updatedPosts.push(post.toObject());
    }

    console.log(updatedPosts)
    res.status(201).json(updatedPosts);


  } catch (err) {

    res.status(409).json({ message: err.message });
  }
};





/* Delete */
export const deletePost= async (req,res) => {
  console.log("deletefuncion called>>>>>><<<<<<<<<")
  try {
    const { id } = req.params;
    const del = await Post.findByIdAndDelete(id)
    res.status(200).json(del);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const editPost = async (req, res) => {
  console.log("Edit post Api")
  console.log(req.file)
  try {
    const { postId, description, picturePath } = req.body;
    const findOldImageUrl =await Post.findById(postId)
    console.log("findOldImageUrl",findOldImageUrl)
    
    let updateNewImageUrl=findOldImageUrl.picturePath

    if(req.file){
    await deleteFromS3(findOldImageUrl.picturePath);
     updateNewImageUrl = await uploadTos3(req.file)
    console.log(updateNewImageUrl);
      }
    const edited= await  Post.findByIdAndUpdate(postId,{description: description, picturePath: updateNewImageUrl},{new:true})
    const imageUrl = await getFromS3(updateNewImageUrl);
    edited.set({ picturePath: imageUrl });
    console.log(edited);
   
    res.status(200).json(edited);
    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

