const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  like:{
    type:Array,
  },
  dislike:{
    type:Array,
  },
  comments:[
    {
              user:{
                        type:mongoose.Schema.ObjectId,
                        required:true
              },
              username:{
                        type:String,
                        required:true
              },
              profile:{
                        type:String
              },
              comment:{
                        type:String,
                        required:true
              }
    }
  ]
});

const blogs = mongoose.model('blogs', blogSchema);

module.exports = blogs;