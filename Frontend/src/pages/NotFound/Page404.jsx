import  {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../../components/Loader/LazyLoader";
const NotFound =lazy(() => import('../../components/NotFound/NotFound'));
const Page404 = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <NotFound/>
            </Suspense>
        </Fragment>
    );
};

export default Page404;