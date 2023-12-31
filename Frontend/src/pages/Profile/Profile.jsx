import "./profile.css"
import Navbar from "../../components/Navber/NavbarContainer.jsx";
import LazyLoader from "../../components/Loader/LazyLoader.jsx";
import {Fragment, lazy, Suspense} from "react";
const ProfileLeftbar =lazy(()=>import ("../../components/ProfileLeftsideContainer/profileleftbar.jsx"));
const ProfileMainPost = lazy(()=>import ("../../components/ProfilePostContainer/post.jsx")) ;
const ProfileRightbar =lazy(() => import('../../components/ProfileRightsiteContainer/Profilerightbar.jsx'));
const Profile = () => {
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