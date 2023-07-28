const Blogs = require('../Models/Blog_model'); // Import the Artwork model
const userModel=require('../Models/User_model');

// Create a new artwork
// const createBlogs = async (req, res) => {
//   try {
//     const { title, description, author, date, image } = req.body;
//     const newArtwork = await Blogs.create({ title, description, author, date, image });
//     res.status(201).json(newArtwork);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while creating the artwork.' });
//   }
// };

// Create a new artwork
const createBlogs = async (req, res) => {
  try {
    let {title , description, author, date, image} = req.body;
    let newpost = new Blogs({
      title, description, author, date, image, user:req.user.id
    })
    const post = await newpost.save()
    res.status(200).json(post)
  } catch (error) {
     return res.status(500).json("Internal error occured")
  }
};

// Get all artworks
const getAllBlogs = async (req, res) => {
  try {
    const blog = await Blogs.find();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the Blog.' });
  }
};

// Get a single artwork by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findById(id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the Blog.' });
  }
};

// Update an artwork by ID
const updateBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, author, date, image } = req.body;
    const updatedBlog = await Blogs.findByIdAndUpdate(id, { title, description, author, date, image }, { new: true });
    
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the Blog.' });
  }
};

// Delete an artwork by ID
const deleteBlogs= async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blogs.findByIdAndRemove(id);
    
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    
    res.json({ message: 'Blog deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the Blog.' });
  }
};

//Like
const like= async (req, res) => {
  try {
    const post = await Blogs.findById(req.params.id);
    if(!post.like.includes(req.user.id)){
          if(post.dislike.includes(req.user.id)){
                await post.updateOne({$pull:{dislike:req.user.id}})
          }
          await post.updateOne({$push:{like:req.user.id}})
          return res.status(200).json("Post has been liked")
          
    }else{
          await post.updateOne({$pull:{like:req.user.id}});
          return res.status(200).json("Post has been unlike")
    }
    
  } catch (error) {
    return res.status(500).json("Internal server error ")     
  }
};

//Dislike
const dislike= async (req, res) => {
  try {
    const post = await Blogs.findById(req.params.id);
    if(!post.dislike.includes(req.user.id)){
          if(post.like.includes(req.user.id)){
                await post.updateOne({$pull:{like:req.user.id}})
          }
          await post.updateOne({$push:{dislike:req.user.id}})
          return res.status(200).json("Post has been disliked")
    }else{
          await post.updateOne({$pull:{dislike:req.user.id}});
          return res.status(200).json("Post has been unlike")
    }
    
  } catch (error) {
    return res.status(500).json("Internal server error")
  }
};

//Comment 
const comment= async (req, res) => {
  // try {
    const {comment , postid , profile} = req.body;
    const comments={
          user:req.user.id,
          username:req.user.username,
          comment,
          profile
    }
    const post = await Blogs.findById(postid);
    post.comments.push(comments);
    await post.save();
    res.status(200).json(post);
  // } catch (error) {
  //       return res.status(500).json("Internal server error")
  // }
};

/// Get a Following user
const following= async (req, res) => {
  // try {
    const user = await userModel.findById(req.params.id);
    const followinguser = await Promise.all(
          user.Following.map((item)=>{
                return User.findById(item)
          })
    )

    let followingList=[];
    followinguser.map((person)=>{
          const {email, password , phonenumber , Following , Followers , ...others} = person._doc;
          followingList.push(others);
    })

    res.status(200).json(followingList);
  // } catch (error) {
  //      return res.status(500).json("Internal server error")
  // }
};

/// Get a Followers user
const followers= async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const followersuser = await Promise.all(
          user.Followers.map((item)=>{
                return User.findById(item)
          })
    )

    let followersList=[];
    followersuser.map((person)=>{
          const {email, password , phonenumber , Following , Followers , ...others} = person._doc;
          followersList.push(others);
    })

    res.status(200).json(followersList);
  } catch (error) {
    return res.status(500).json("Internal server error")
  }
};






module.exports = {
    createBlogs,
    getAllBlogs,
    getBlogById,
    updateBlogs,
  deleteBlogs,
  like,
  dislike,
  comment,
  following,
  followers,
};