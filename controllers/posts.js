import Post from "../models/Post.js";
import User from "../models/User.js";
import multer from "multer"



  

/* CREATE */
export const createPost = async (req, res) => {
    console.log("here is your call>>><<<<<>>>>>><<<<<>>>>")
    console.log(req.body)
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    if(req.file){
    
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        description,
        picturePath,
       
      });
      await newPost.save();
    }else{
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        description,
        
      
      });
      await newPost.save();
    }
    

    const posts = await Post.find().sort("-createdAt");
    console.log("posts",posts)
    res.status(201).json(posts);
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
  console.log("Edit post Api#############")
  console.log (req.body)

  try {
    let edited=""
    const { postId, description, picturePath } = req.body;

    if(picturePath && description){
      edited= await  Post.findByIdAndUpdate(postId,{description: description, picturePath: picturePath},{new:true})

    }else if(picturePath == 'undefined' && description){
      edited= await  Post.findByIdAndUpdate(postId,{description: description,},{new:true})

    }else if(picturePath && description == 'undefined' ){
      edited= await  Post.findByIdAndUpdate(postId,{picturePath: picturePath,},{new:true})

    }

    console.log(edited);
   
    res.status(200).json(edited);
    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

