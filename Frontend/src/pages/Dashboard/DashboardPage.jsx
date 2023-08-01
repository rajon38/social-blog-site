import  {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../../components/Loader/LazyLoader.jsx";
import "./home.css"
import Leftbar from "../../components/LeftSideContainer/Leftbar.jsx";
import Rightbar from "../../components/RightSideContainer/Rightbar.jsx";
import Navbar from "../../components/Navber/Navbar.jsx";
const MainPost =lazy(() => import('../../components/MainPostContainer/MainPost.jsx'));
const DashboardPage = () => {
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