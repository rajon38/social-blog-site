import {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../../components/Loader/LazyLoader.jsx";
const Forgetpass =lazy(() => import('../../components/User/SendOTP.jsx'));
const ForgetpassPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <Forgetpass/>
            </Suspense>
        </Fragment>
    );
};

export default ForgetpassPage;