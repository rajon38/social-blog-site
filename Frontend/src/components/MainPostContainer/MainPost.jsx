
import { useEffect, useState } from 'react';
import "./mainPost.css";
import ContentPost from "../ContentPostContainer/ContentPost";
import Post from '../PostContainer/Post';
import { useSelector } from 'react-redux';
import { getFollowingPosts } from "../../APIRequest/userAPI.js";
import {getUserDetails} from "../../helper/SessionHelper.js";

export default function MainPost() {
    // const userDetails = useSelector((state) => state.profile.value); 
    const ProfileData = getUserDetails();// Access the 'value' property from the 'profile' state
    const user = ProfileData; // No need to use userDetails.profile as it's already the profile object
    const userId = user?.other?._id; // Access the userId directly

    const [post, setPost] = useState([]);

    useEffect(() => {
        console.log("UserId:", userId);
        const fetchPosts = async () => {
            try {
                const posts = await getFollowingPosts(userId);
                if (posts) {
                    setPost(posts);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        if (userId) {
            fetchPosts();
        }
    }, [userId]);

    return (
        <div className='mainPostContainer'>
            <ContentPost />
            {post.map((item) => (
                <Post key={item._id} post={item} />
            ))}
        </div>
    );
}
