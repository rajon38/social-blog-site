import  {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../../components/Loader/LazyLoader.jsx";
const Home =lazy(() => import('../../components/Dashboard/Home.jsx'));
const DashboardPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <Home/>
            </Suspense>
        </Fragment>
    );
};

export default DashboardPage;