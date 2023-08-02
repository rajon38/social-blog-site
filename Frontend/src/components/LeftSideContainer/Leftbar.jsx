import "./leftbar.css"
import {getToken, getUserDetails} from "../../helper/SessionHelper.js";
import {useEffect, useState} from "react";
import axios from "axios";
import image from "../../assets/images/Profile.png";
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg"
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg"
import image5 from "../../assets/images/image5.jpg";
import image6 from "../../assets/images/image6.jpg"
import store from "../../redux/store/store.js";
import {HideLoader, ShowLoader} from "../../redux/state/settings-slice.js";
import {BaseURL} from "../../helper/config.js";
import {ErrorToast} from "../../helper/FormHelper.js";
const Leftbar = () => {
    const userDetails = getUserDetails();
    let user = userDetails.user;
    console.log(user);
    let id = user?.other?._id;
    const AxiosHeader = {headers:{"token":getToken()}};
    const [post,setPost] = useState([]);
    useEffect(()=>{
        const getPost = async ()=>{
            try {
                store.dispatch(ShowLoader());
                let URL = BaseURL + "/users/flw/" + id;

                const result = await axios.get(URL,AxiosHeader);
                store.dispatch(HideLoader());
                setPost(result.data);

            }catch (e){
                ErrorToast("Something Went Wrong!");
                store.dispatch(HideLoader());
            }
        }
        getPost();
    },[])
    return (
        <div className='Leftbar'>
            <div className='NotificationsContainer'>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <p style={{marginLeft:"-14px"}}>Notifications</p>
                    <p style={{ color: "#aaa" , marginLeft:"40px" }}>See all</p>
                </div>
                <div style={{display:'flex' , alignItems:"center" , marginTop:-10}}>
                    <img src={`${image}`} className="notificationimg" alt="" />
                    <p style={{marginLeft:"5px" , color:"#aaa" , fontSize:13 , width:"120px" , textAlign:"start"}}>Madan like your post</p>
                    <img src={`${image1}`} className="likeimage" alt="" />
                </div>
                <div style={{display:'flex' , alignItems:"center" , marginTop:-10}}>
                    <img src={`${image}`} className="notificationimg" alt="" />
                    <p style={{marginLeft:"5px" , color:"#aaa" , fontSize:13 , textAlign:"start" , width:"120px"}}>Suman started to following you</p>
                    <img src={`${image2}`} className="followinguserimage" alt="" />
                </div>
                <div style={{display:'flex' , alignItems:"center" , marginTop:-10}}>
                    <img src={`${image2}`} className="notificationimg" alt="" />
                    <p style={{marginLeft:"5px" , color:"#aaa" , fontSize:13 , width:"120px" , textAlign:"start"}}>Madan like your post</p>
                    <img src={`${image3}`} className="likeimage" alt="" />
                </div>
                <div style={{display:'flex' , alignItems:"center" , marginTop:-10}}>
                    <img src={`${image}`} className="notificationimg" alt="" />
                    <p style={{marginLeft:"5px" , color:"#aaa" , fontSize:13 ,  width:"120px" , textAlign:"start"}}>Suman started to following you</p>
                    <img src={`${image4}`} className="followinguserimage" alt="" />
                </div>
                <div style={{display:'flex' , alignItems:"center" , marginTop:-10}}>
                    <img src={`${image6}`} className="notificationimg" alt="" />
                    <p style={{marginLeft:"5px" , color:"#aaa" , fontSize:13 ,  width:"120px" , textAlign:"start"}}>Suman started to following you</p>
                    <img src={`${image5}`} className="followinguserimage" alt="" />
                </div>
                <div style={{display:'flex' , alignItems:"center" , marginTop:-10}}>
                    <img src={`${image3}`} className="notificationimg" alt="" />
                    <p style={{marginLeft:"5px" , color:"#aaa" , fontSize:13 , width:"120px" , textAlign:"start"}}>Madan like your post</p>
                    <img src={`${image6}`} className="likeimage" alt="" />
                </div>

            </div>

            <div className='NotificationsContainer'>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <p style={{marginLeft:"-20px"}}>Explore</p>
                    <p style={{ color: "#aaa" , marginLeft:"40px" }}>See all</p>
                </div>
                <div>
                    {post.map((item)=>(
                        [item.image === '' ? '' :
                            <img src={`${item.image}`} className="exploreimage" alt="" />
                        ]

                    ))}


                </div>

            </div>

        </div>
    );
};

export default Leftbar;