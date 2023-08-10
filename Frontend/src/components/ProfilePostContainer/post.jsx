import "./post.css"
import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import {commentOnPost, dislikePost, GetUser, likePost} from "../../APIRequest/blogAPI.js";
import LikeIcon from "../../assets/images/like.png";
import anotheLikeIcon from "../../assets/images/setLike.png";
import ProfileImage from "../../assets/images/Profile.png";
import Moreoption from "../../assets/images/more.png";
import CommentIcon from "../../assets/images/speech-bubble.png";
import Shareicon from "../../assets/images/share.png";
// eslint-disable-next-line react/prop-types
export default function Post({detail}) {
    // console.log(detail)
    // const userDetails = useSelector((state) => state.profile);
    // let users = userDetails?.user;
    // const [user, setuser] = useState([]);
    // useEffect(() => {
    //     const getuser = async () => {
    //         try {
    //             // eslint-disable-next-line react/prop-types
    //             const userData = await GetUser(detail.user);
    //             if (userData) {
    //                 setuser(userData);
    //             } else {
    //                 console.log("Some error occurred");
    //             }
    //         } catch (error) {
    //             console.error("Error getting user details:", error);
    //         }
    //     };
    //     getuser();
    //     // eslint-disable-next-line react/prop-types
    // }, []);
    //
    // const userId = users.other._id;
    // // eslint-disable-next-line react/prop-types
    // const [Like, setLike] = useState(detail.like.includes(userId) ? anotheLikeIcon : LikeIcon);
    // // eslint-disable-next-line react/prop-types
    // const [count, setCount] = useState(detail.like.length);
    // // eslint-disable-next-line react/prop-types
    // const [Comments, setComments] = useState(detail.comments);
    // const [commentwriting, setCommentWriting] = useState('');
    // const [show, setShow] = useState(false);
    //
    // const handleLike = async () => {
    //     try {
    //         if (Like === LikeIcon) {
    //             // eslint-disable-next-line react/prop-types
    //             await likePost(detail._id);
    //             setLike(anotheLikeIcon);
    //             setCount(count + 1);
    //         } else {
    //             // eslint-disable-next-line react/prop-types
    //             await dislikePost(detail._id);
    //             setLike(LikeIcon);
    //             setCount(count - 1);
    //         }
    //     } catch (error) {
    //         console.error('Error handling like:', error);
    //     }
    // };
    //
    // const addComment = async () => {
    //     const comment = {
    //         // eslint-disable-next-line react/prop-types
    //         "postid": detail._id,
    //         "username": users.other.username,
    //         "comment": commentwriting,
    //         "profile": users.other?.profile
    //     };
    //     try {
    //         // eslint-disable-next-line react/prop-types
    //         const updatedPostData = await commentOnPost(detail._id, comment);
    //         setComments(updatedPostData.comments);
    //     } catch (error) {
    //         console.error('Error adding comment:', error);
    //     }
    // }
    //
    // const handleComment = () => {
    //     addComment();
    // }
    //
    // const handleshow = () => {
    //     setShow(!show);
    // };

    return (
        <div className='PostContainer'>
            {/*<div className='SubPostContainer'>*/}
            {/*    <div>*/}
            {/*        <div style={{ display: 'flex', alignItems: "center" }}>*/}
            {/*            {user.profile == ""? <img src={`${ProfileImage}`} className="PostImage" alt="" /> : <img src={`${user.profile}`} className="PostImage" alt="" />}*/}

            {/*            <div>*/}
            {/*                <p style={{ marginLeft: '5px', textAlign: "start" }}>{user.username}</p>*/}
            {/*                <p style={{ fontSize: "11px", textAlign: "start", marginLeft: 5, marginTop: -13, color: "#aaa" }}>Following by suman</p>*/}
            {/*            </div>*/}
            {/*            <img src={`${Moreoption}`} className="moreicons" alt="" />*/}
            {/*        </div>*/}
            {/*        /!* eslint-disable-next-line react/prop-types *!/*/}
            {/*        <p style={{ textAlign: 'start', width: "96%", marginLeft: 20, marginTop: 0 }}>{detail.title}</p>*/}
            {/*        /!* eslint-disable-next-line react/prop-types *!/*/}
            {/*        <p style={{ textAlign: 'start', width: "96%", marginLeft: 20, marginTop: 0 }}>{detail.author}</p>*/}
            {/*        /!* eslint-disable-next-line react/prop-types *!/*/}
            {/*        <p style={{ textAlign: 'start', width: "96%", marginLeft: 20, marginTop: 0 }}>{detail.description}</p>*/}
            {/*        /!* eslint-disable-next-line react/prop-types *!/*/}
            {/*        <img src={`${detail.image}`} className="PostImages" alt="" />*/}
            {/*        <div style={{ display: "flex" }}>*/}
            {/*            <div style={{ display: "flex", marginLeft: "10px" }}>*/}
            {/*                <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>*/}
            {/*                    <img src={`${Like}`} className="iconsforPost" onClick={handleLike} alt="" />*/}
            {/*                    <p style={{ marginLeft: "6px" }}>{count} Likes</p>*/}
            {/*                </div>*/}
            {/*                <div style={{ display: "flex", alignItems: "center", marginLeft: 20, cursor: "pointer" }}>*/}
            {/*                    <img src={`${CommentIcon}`} className="iconsforPost" onClick={handleshow} alt="" />*/}
            {/*                    <p style={{ marginLeft: "6px" }}>{Comments.length} Comments</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div style={{ display: "flex", alignItems: "center", marginLeft: 200, cursor: "pointer" }}>*/}
            {/*                <img src={`${Shareicon}`} className="iconsforPost" alt="" />*/}
            {/*                <p style={{ marginLeft: "6px" }}>Share</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        {show === true ?*/}
            {/*            <div style={{padding:'10px'}}>*/}
            {/*                <div style={{ display: "flex", alignItems: "center" }}>*/}
            {/*                    <img src={`${users.other.profile}`} className="PostImage" alt="" />*/}
            {/*                    <input type="text" className='commentinput' placeholder='Write your thought' onChange={(e) => setCommentWriting(e.target.value)} />*/}
            {/*                    <button className='addCommentbtn' onClick={handleComment}>Post</button>*/}
            {/*                </div>*/}
            {/*                {Comments.map((item) => (*/}
            {/*                    <div style={{ alignItems: "center" }} key={'profile'}>*/}
            {/*                        <div style={{display:"flex" , alignItems:"center"}}>*/}
            {/*                            {item.profile === '' ?*/}
            {/*                                <img src={`https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} className="PostImage" alt="" /> : <img src={`${item.profile}`} className="PostImage" alt="" />*/}
            {/*                            }*/}
            {/*                            <p style={{ marginLeft: "6px" , fontSize:18, marginTop:6 }}>{item.username}</p>*/}
            {/*                        </div>*/}
            {/*                        <p style={{ marginLeft: "55px" , textAlign:'start' , marginTop:-16 }}>{item.comment}</p>*/}
            {/*                        <p style={{ marginLeft: "55px" , textAlign:'start' , marginTop:-10 , color:"#aaa" , fontSize:11}}>Reply</p>*/}

            {/*                    </div>*/}

            {/*                ))}*/}
            {/*            </div>:''*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}