import  {Fragment, useRef} from 'react';
import {ErrorToast, IsEmail} from "../../helper/FormHelper";
<<<<<<< HEAD
import {RecoverVerifyEmailRequest} from "../../APIRequest/userAPI.js";
=======
import {RecoverVerifyEmailRequest} from "../../APIRequest/UserAPI";
>>>>>>> a834a4492b2b1e3e0585b4caad4f97eb9c22ca1e
import {useNavigate} from "react-router-dom";

const SendOTP = () => {

    let emailRef=useRef();
    let navigate=useNavigate();

    const VerifyEmail=async () => {
        let email = emailRef.value;
        if (IsEmail(email)) {
            ErrorToast("Valid Email Address Required !")
        } else {
            let result = await RecoverVerifyEmailRequest(email)
            if (result === true) {
                navigate("/VerifyOTP")
            }
        }
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row d-flex justify-content-center">
<<<<<<< HEAD
                    <div className="col-md-7 col-lg-6 center-screen">
=======
                    <div className="col-md-7 col-lg-12 center-screen">
>>>>>>> a834a4492b2b1e3e0585b4caad4f97eb9c22ca1e
                        <div className="card w-100">
                            <div className="card-body text-start">
                                <h4>EMAIL ADDRESS</h4>
                                <hr/>
                                <label>Your email address</label>
                                <input ref={(input)=>emailRef=input}  placeholder="User Email" className="form-control" type="email"/>
                                <br/>
                                <button onClick={VerifyEmail} className="btn w-100 btn-success">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SendOTP;