import  {lazy, Suspense} from 'react';
import LazyLoader from "../components/Loader/LazyLoader";
const VerifyOTP =lazy(() => import('../components/User/VerifyOTP'));
const VerifyOTPPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <VerifyOTP/>
        </Suspense>
    );
};
export default VerifyOTPPage;