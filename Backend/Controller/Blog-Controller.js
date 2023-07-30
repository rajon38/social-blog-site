const Blogs = require('../Models/Blog_model'); // Import the Artwork model
const User = require('../Models/User_model');


const createBlogs = async (req, res) => {
<<<<<<< HEAD
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
=======
    // console.log('Request Body:', req.body);
    // console.log('Authenticated User:', req.user);
    try {
        let {title ,author, description,date, image} = req.body;
        let newpost = await Blogs.create({
            title, description, author,date, image, user: req.user._id

        })


        const post = await newpost.save()
        res.status(200).json({
            success: true,
            message: 'Blog post created successfully',
            data: post
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in blog post",
            error:error.message
        })
    }
>>>>>>> f1f891f6cca537cedf5f794ccf54195a063e0299
};

// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blog = await Blogs.find({});
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the Blog.' });
    }
};

// Get a single blog ID
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

// Update blog by ID
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

// Delete blog by ID
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
        if(!post.like.includes(req.user._id)){
            if(post.dislike.includes(req.user._id)){
                await post.updateOne({$pull:{dislike:req.user._id}})
            }
            await post.updateOne({$push:{like:req.user._id}})
            return res.status(200).json("Post has been liked")

        }else{
            await post.updateOne({$pull:{like:req.user._id}});
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
        if(!post.dislike.includes(req.user._id)){
            if(post.like.includes(req.user._id)){
                await post.updateOne({$pull:{like:req.user._id}})
            }
            await post.updateOne({$push:{dislike:req.user._id}})
            return res.status(200).json("Post has been disliked")
        }else{
            await post.updateOne({$pull:{dislike:req.user._id}});
            return res.status(200).json("Post has been unlike")
        }

    } catch (error) {
        return res.status(500).json("Internal server error")
    }
};

//Comment
const commentPost = async (req, res) => {
    try {
        const { comment } = req.body;
        const postId = req.params.id;

        // Validate the required field in the request body
        if (!comment) {
            return res.status(400).json("The 'comment' field is required.");
        }

        // Additional validation for the length of the comment
        if (comment.length < 3 || comment.length > 500) {
            return res
                .status(400)
                .json("The 'comment' field length must be between 3 and 500 characters.");
        }

        // Fetch the user information from the database
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json("User not found.");
        }

        const comments = {
            user: req.user._id,
            username: user.username,
            profile: user.profile,
            comment,
        };

        // Find the blog post by its ID
        const post = await Blogs.findById(postId);

        if (!post) {
            return res.status(404).json("Blog post not found.");
        }

        // Add the comment to the post's comments array and save the post
        post.comments.push(comments);
        await post.save();

        // Respond with the updated post (including the new comment)
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
};


// Get a Following user
const following= async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
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
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
};

// follwinguser

// const following=async(req,res)=>{
//   try {
//     if(req.params.id!=req.params.user){
//       const user=await User.findById(req.params.id);
//       const otherusr=await User.findById(req.body.user)
//     }
//   } catch (error) {

//   }
// }



/// Get a Followers user
const followers= async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
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
    commentPost,
    following,
    followers,
};