import  {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../../components/Loader/LazyLoader.jsx";
import "./home.css"
const Leftbar =lazy(()=>import ("../../components/LeftSideContainer/Leftbar.jsx"));
const Rightbar = lazy(()=>import ("../../components/RightSideContainer/Rightbar.jsx")) ;
import Navbar from "../../components/Navber/Navbar.jsx";
import {useSelector} from "react-redux";
const MainPost =lazy(() => import('../../components/MainPostContainer/MainPost.jsx'));
const DashboardPage = () => {
    const userDetails = useSelector((state)=>state.user);
    let user = userDetails.user
    console.log(user)
    return (
        <Fragment>
        <div className='home'>
                <Suspense fallback={<LazyLoader/>}>
                    <Navbar/>
                    <div className="ComponentContainer">
                        <Leftbar/>
                        <MainPost/>
                        <Rightbar/>
                    </div>
                </Suspense>
        </div>
        </Fragment>
    );
};

export default DashboardPage;