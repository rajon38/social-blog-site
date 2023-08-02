import {Fragment, useState, useEffect} from 'react';
import ReactCodeInput from "react-code-input";
import {ErrorToast} from "../../helper/FormHelper";
import {RecoverVerifyOTPRequest} from "../../APIRequest/userAPI.js";
import {getEmail} from "../../helper/SessionHelper";
import {useNavigate} from "react-router-dom";
import Countdown from 'react-countdown';

const VerifyOTP = () => {
    const navigate = useNavigate();
  
    const defaultInputStyle = {
      fontFamily: 'monospace',
      MozAppearance: 'textfield',
      margin: '4px',
      paddingLeft: '8px',
      width: '45px',
      borderRadius: '3px',
      height: '45px',
      fontSize: '32px',
      border: '1px solid lightskyblue',
      boxSizing: 'border-box',
      color: 'black',
      backgroundColor: 'white',
      borderColor: 'lightgrey',
    };
  
    const [otp, setOtp] = useState('');
    const [expirationTime, setExpirationTime] = useState(Date.now() + 120 * 1000);
  
    useEffect(() => {
      // update the expiration time only once when the component mounts
      setExpirationTime(Date.now() + 120 * 1000);
    }, []);
  
    const handleOtpChange = (value) => {
      setOtp(value);
    };
  
    const handleSubmitOtp = () => {
      if (otp.length === 6) {
        RecoverVerifyOTPRequest(getEmail(), otp).then((result) => {
          if (result === true) {
            navigate('/CreatePassword');
          }
        });
      } else {
        ErrorToast('Enter 6 Digit Code');
      }
    };
  
    const Completionist = () => <h3>Your OTP Code Time Is Expired</h3>;
  
    return (
      <Fragment>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6 center-screen">
              <div className="card w-90  p-4">
                <div className="card-body">
                  <h4>OTP VERIFICATION </h4>
                  <Countdown key={expirationTime} date={expirationTime}>
                    <Completionist />
                  </Countdown>
  
                  <p>A 6 Digit verification code has been sent to your email address. </p>
                  <ReactCodeInput onChange={handleOtpChange} inputStyle={defaultInputStyle} fields={6} />
                  <br /> <br />
                  <button onClick={handleSubmitOtp} className="btn w-100 animated fadeInUp float-end btn-success">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
export default VerifyOTP;