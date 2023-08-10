import  {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../../components/Loader/LazyLoader.jsx";
import "./home.css"
const Leftbar =lazy(()=>import ("../../components/LeftSideContainer/Leftbar.jsx"));
const Rightbar = lazy(()=>import ("../../components/RightSideContainer/Rightbar.jsx")) ;
import NavbarContainer from "../../components/Navber/NavbarContainer.jsx";
const MainPost =lazy(() => import('../../components/MainPostContainer/MainPost.jsx'));
const DashboardPage = () => {
    return (
        <Fragment>
        <div className='home'>
                <Suspense fallback={<LazyLoader/>}>
                    <NavbarContainer/>
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