import  {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../components/Loader/LazyLoader.jsx";
const Registration =lazy(() => import('../components/User/Registration'));
const RegistrationPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <Registration/>
            </Suspense>
        </Fragment>
    );
};

export default RegistrationPage;