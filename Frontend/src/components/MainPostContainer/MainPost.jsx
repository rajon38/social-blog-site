import "./mainPost.css"
import ContentPost from "../ContentPostContainer/ContentPost"
import Post from '../PostContainer/Post';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const MainPost = () => {
    return (
        <div className='mainPostContainer'>
      <ContentPost/>
      {/* {post.map((item)=>(
          <Post post={item}/>
      ))} */}
    </div>
    );
};

export default MainPost;