import axios from "axios";
import {loginStart , loginSuccess , loginFailure , logout} from "./userReducer";
import {ErrorToast, SuccessToast} from "../../helper/FormHelper";

export const login = async(dispatch , user)=>{
          dispatch(loginStart());
          try {
                   const res = await axios.post("http://localhost:5000/api/user/login" , user);
                   dispatch(loginSuccess(res.data)); 
          } catch (error) {
                    dispatch(loginFailure());
          }
}

export const VerifyEmail = async(dispatch , user)=>{
          dispatch(loginStart());
          try {
                   const res = await axios.post("http://localhost:5000/api/user/verify/email" , user);
                   dispatch(loginSuccess(res.data)); 
          } catch (error) {
                    dispatch(loginFailure());
          }
}



export const signup = async(firstName,lastName,email,phonenumber,username,password)=>{
    let URL="http://localhost:5000/api/v1/users/register";
    let PostBody={firstName:firstName,lastName:lastName,email:email,phonenumber:phonenumber,username:username,password:password}
    return axios.post(URL,PostBody).then((res)=>{
        if(res.status===200){
            if(res.data['success']===false){
                if(res.data['data']['keyPattern']['email']===1){
                    ErrorToast("Email Already Exist")
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong")
                    return false;
                }
            }
            else {
                SuccessToast("Registration Success")
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        return false;
    })
}