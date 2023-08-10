import  { useEffect, useState } from "react";
import { GetFollowers, GetUser } from "../../APIRequest/blogAPI.js";
import Follow from "../RightSideContainer/Follow.jsx";
import { useSelector } from "react-redux";
import './profilerightbar.css'

const Profilerightbar = () => {
    const userDetails = useSelector((state) => state.user);
    let user = userDetails?.user;
    let blogId = location.pathname.split("/")[2];
    let userId = user?.other?._id;
    const [followingUsers, setFollowingUsers] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch followers and user details using the provided API functions
                const followersData = await GetFollowers(blogId); // Replace blogId with the actual blog ID you want to fetch followers for
                const userData = await GetUser(userId); // Replace userId with the actual user ID you want to fetch details for

                // Store the fetched data into state variables
                setFollowingUsers(followersData);
                // Assuming GetUser returns an object with user details
                setSuggestedUsers([userData]); // If you want to show one user as a suggestion, put it in an array
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [blogId, userId]);

    return (
        <div className="Profilerightbar">
            <div className="profilerightcontainer">
                <h3>Followers</h3>
                <div>
                    {followingUsers.map((item) => (
                        <div style={{ marginTop: "10px" }} key={item.id}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginLeft: 10,
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={`${item.profile}`}
                                    className="Friendsimage"
                                    alt=""
                                />
                                <p style={{ textAlign: "start", marginLeft: "10px" }}>
                                    {item.username}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rightcontainer2">
                <h3 style={{ textAlign: "start", marginLeft: "10px" }}>
                    Suggested for you
                </h3>
                {suggestedUsers.map((item) => (
                    <Follow key={item.id} userdetails={item} />
                ))}
            </div>
        </div>
    );
};

export default Profilerightbar;








// import "./profilerightbar.css"
// import {useEffect, useState} from "react";
// // import {GetFollowers, GetUser} from "../../APIRequest/blogAPI.js";
// import Follow from "../RightSideContainer/Follow.jsx";
// import {getToken} from "../../helper/SessionHelper.js";
// import store from "../../redux/store/store.js";
// import {HideLoader, ShowLoader} from "../../redux/state/settings-slice.js";
// import {BaseURL} from "../../helper/config.js";
// import axios from "axios";
// import {ErrorToast} from "../../helper/FormHelper.js";
// import {useSelector} from "react-redux";
// import {useLocation} from "react-router-dom";
// const AxiosHeader = {headers:{"token":getToken()}}
// const Profilerightbar = () => {
//     const userDetails = useSelector((state)=>state.user);
//     let user = userDetails.user
//     let location = useLocation();
//     let id = location.pathname.split("/")[2];
//     let idforSuggest = user?.other?._id
//     const [Followinguser , setFollowinguser] = useState([]);
//     const [users , setUsers] = useState([]);
//     useEffect(() => {
//         const getuser = async()=> {
//             try {
//                 store.dispatch(ShowLoader())
//                 let URL = BaseURL + "/users/all/user/" + id;
//                 let res = await axios.post(URL, AxiosHeader);
//                 store.dispatch(HideLoader());
//                 if (res.status === 200) {
//                     setUsers(res.data); // Return the user details received from the response
//                     return true
//                 } else {
//                     ErrorToast("Something Went Wrong");
//                     return false;
//                 }
//             } catch (error) {
//                 console.log("Error")
//             }
//         }
//         const getFollowing = async()=>{
//             try {
//                 store.dispatch(ShowLoader())
//                 let URL = BaseURL + "/blogs/followers/" + idforSuggest;
//                 let res = await axios.post(URL, AxiosHeader);
//                 store.dispatch(HideLoader());
//                 if (res.status === 200){
//                     setFollowinguser(res.data)
//                     return true
//                 }else {
//                     ErrorToast("Something Went Wrong");
//                     return false;
//                 }
//             } catch (error) {
//                 console.log("Error")
//             }
//         }
//         getFollowing();
//         getuser();
//     },[])
//     return (
//         <div className='Profilerightbar'>
//             <div className='profilerightcontainer'>
//                 <h3>Followers</h3>
//                 <div>
//                     {Followinguser.map((item)=>(
//                         <div style={{marginTop:"10px"}} key="">
//                             <div style={{display:'flex' , alignItems:"center" , marginLeft:10 , cursor:"pointer"}}>
//                                 <img src={`${item.profile}`} className="Friendsimage" alt="" />
//                                 <p style={{textAlign:"start"  , marginLeft:"10px"}}>{item.username} </p>
//                             </div>
//                         </div>
//                     ))}
//
//
//
//                 </div>
//
//             </div>
//
//             <div className='rightcontainer2'>
//                 <h3 style={{textAlign:"start" , marginLeft:"10px"}}>Suggested for you</h3>
//                 {users.map((item)=>(
//                     <Follow userdetails={item} key=""/>
//                 ))}
//
//             </div>
//
//
//         </div>
//     );
// };
//
// export default Profilerightbar;
