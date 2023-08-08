import  {lazy, Suspense} from 'react';
import LazyLoader from "../../components/Loader/LazyLoader.jsx";
const VerifyOTP =lazy(() => import('../../components/User/VerifyOTP.jsx'));
const VerifyOTPPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <VerifyOTP/>
        </Suspense>
    );
};
export default VerifyOTPPage;