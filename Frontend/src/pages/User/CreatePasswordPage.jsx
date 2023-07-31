import  { lazy, Suspense} from 'react';
import LazyLoader from "../../components/Loader/LazyLoader.jsx";
const CreatePassword =lazy(() => import('../../components/User/CreatePassword.jsx'));
const CreatePasswordPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <CreatePassword/>
        </Suspense>
    );
};
export default CreatePasswordPage;