import  {Fragment} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import SendOTPPage from "./pages/SendOTPPage.jsx";
import VerifyOTPPage from "./pages/VerifyOTPPage.jsx";
import CreatePasswordPage from "./pages/CreatePasswordPage.jsx";
import Page404 from "./pages/NotFound/Page404.jsx";
import {getToken} from "./helper/SessionHelper.js";
import DashboardPage from "./pages/Dashboard/Dashboard.jsx";

const App = () => {
    if(getToken()){
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<DashboardPage/>}/>
                    </Routes>
                </BrowserRouter>
            </Fragment>
        );
    }

else
    {
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="Login" replace/>}/>
                        <Route path="/Login" element={<LoginPage/>}/>
                        <Route path="/Registration" element={<RegistrationPage/>}/>
                        <Route path="/SendOTP" element={<SendOTPPage/>}/>
                        <Route path="/VerifyOTP" element={<VerifyOTPPage/>}/>
                        <Route path="/CreatePassword" element={<CreatePasswordPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </BrowserRouter>
            </Fragment>
        );
    }
};

export default App;