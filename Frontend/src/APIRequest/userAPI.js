import axios from "axios";
import {ErrorToast,SuccessToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state/settings-slice.js";
import {getToken,setToken,setEmail,setOTP,setUserDetails} from "../helper/SessionHelper.js";
import {SetProfile} from "../redux/state/profile-slice.js";
import {BaseURL} from "../helper/config.js";

const AxiosHeader = {headers:{"token":getToken()}}


//registration API
export async function RegistrationRequest(firstName,lastName,profile,username,phoneNumber,email,password){
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + "/users/register"
        let PostBody = {firstName:firstName,lastName:lastName,profile:profile,username:username,phoneNumber:phoneNumber,email:email,password:password}
        let res = await axios.post(URL,PostBody)
        store.dispatch(HideLoader());
        if (res.status === 200){
            if(res.data['status']==="fail"){
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
        }else {
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }catch (e) {
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        return false;
    }
}



//LogIn API
export async function LoginRequest(email,password){
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL + "/users/login";
        let PostBody={"email":email,"password":password}
        let res =await axios.post(URL,PostBody);
        setToken(res.data['token']);
        setUserDetails(res.data['data']);
        SuccessToast("Login Success");
        store.dispatch(HideLoader())
        return true;
    }catch (e) {
        store.dispatch(HideLoader())
        ErrorToast("Invalid Email or Password")
        return  false;
    }
}


//Profile-Details API

export async function GetProfileDetails(){
    try {
        store.dispatch(ShowLoader())
        let URL=BaseURL+"/users/profile";
        let res=await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(res.status===200){
            store.dispatch(SetProfile(res.data['data'][0]))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
    }
}



//ProfileUpdateRequest
export async function ProfileUpdateRequest(firstName,lastName,profile,username,phoneNumber,email,password){
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + "/users/update";
        let PostBody = {firstName:firstName,lastName:lastName,profile:profile,username:username,phoneNumber:phoneNumber,email:email,password:password}
        let UserDetails ={firstName:firstName,lastName:lastName,profile:profile,username:username,phoneNumber:phoneNumber,email:email}
        let res = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())
        if (res.status === 200){
            SuccessToast("Profile Update Success");
            setUserDetails(UserDetails);
            return true;
        }else {
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    }
}


//recoverVerifyEmail
export async function RecoverVerifyEmailRequest(email){
    try {
        store.dispatch(ShowLoader())
        let URL=BaseURL+"/users/varifyEmail/"+email;
        let res=await axios.get(URL);
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status']==="fail"){
                ErrorToast("No user found");
                return false;
            }
            else{
                setEmail(email)
                SuccessToast("A 6 Digit verification code has been sent to your email address. ");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong");
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    }
}


//VerifyOTP
export async function RecoverVerifyOTPRequest(email,OTP){
    try {
        store.dispatch(ShowLoader());
        let URL=BaseURL+"/users/verifyOTP/"+email+"/"+OTP;
        let res=await axios.get(URL);
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status']==="fail"){
                ErrorToast("Code Verification Fail");
                return false;
            }
            else{
                setOTP(OTP)
                SuccessToast("Code Verification Success");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    }
}


//reset password
export async function RecoverResetPassRequest(email,OTP,password){
    try {
        store.dispatch(ShowLoader())
        let URL=BaseURL+"/users/resetPass";
        let PostBody={email:email,OTP:OTP,password:password};
        let res=await axios.post(URL,PostBody);
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status']==="fail"){
                ErrorToast(res.data['data']);
                return false;
            }
            else{
                setOTP(OTP)
                SuccessToast("NEW PASSWORD CREATED");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    }
}

export function CreateNewBlog(title,author,description,date,image){


    store.dispatch(ShowLoader())

    let URL=BaseURL+"/blogs/create-blog";
    let PostBody={"title":title,"author":author,"description":description,"image":image,"date":date}

    return axios.post(URL,PostBody,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            SuccessToast("Blog post created successfully")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }

    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    })
}
