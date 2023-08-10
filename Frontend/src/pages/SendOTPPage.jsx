import {lazy, Suspense} from 'react';
import LazyLoader from "../components/Loader/LazyLoader.jsx";
const SendOTP =lazy(() => import('../components/User/SendOTP'));
const SendOTPPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <SendOTP/>
        </Suspense>
    );
};

export default SendOTPPage;