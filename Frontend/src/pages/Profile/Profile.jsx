import "./profile.css"
import Navbar from "../../components/Navber/NavbarContainer.jsx";
import LazyLoader from "../../components/Loader/LazyLoader.jsx";
import {Fragment, lazy, Suspense} from "react";
import {useSelector} from "react-redux";
const ProfileLeftbar =lazy(()=>import ("../../components/ProfileLeftsideContainer/profileleftbar.jsx"));
const ProfileMainPost = lazy(()=>import ("../../components/ProfilePostContainer/post.jsx")) ;
const ProfileRightbar =lazy(() => import('../../components/ProfileRightsiteContainer/Profilerightbar.jsx'));
const Profile = () => {
    const userDetails = useSelector((state)=>state.user);
    let user = userDetails.user
    console.log(user)
    return (
        <Fragment>
        <div className='ProfileContainer'>
            <Suspense fallback={<LazyLoader/>}>
            <Navbar/>
            <div className='subProfileContainer'>
                <ProfileLeftbar/>
                <ProfileMainPost/>
                <ProfileRightbar/>
            </div>
            </Suspense>
        </div>
        </Fragment>
    );
};

export default Profile;