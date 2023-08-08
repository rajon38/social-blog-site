class SessionHelper{
    setToken(token){
        localStorage.setItem("token",token)
    }
    getToken(){
        return localStorage.getItem("token")
    }
    setUserDetails(UserDetails){
        localStorage.setItem("UserDetails",JSON.stringify(UserDetails))
    }
    getUserDetails(){
        return JSON.parse(localStorage.getItem("UserDetails"))
    }
    setEmail(Email){
        localStorage.setItem("Email",Email)
    }
    getEmail(){
        return localStorage.getItem("Email")
    }
    setOTP(OTP){
        localStorage.setItem("OTP",OTP)
    }
    getOTP(){
        return localStorage.getItem("OTP")
    }
    removeSessions=()=>{
        localStorage.clear();
<<<<<<< HEAD
        window.location.href="/Login"
=======
        window.location.href="/login"
>>>>>>> a834a4492b2b1e3e0585b4caad4f97eb9c22ca1e
    }
}
export const {setEmail,getEmail,setOTP,getOTP,setToken,getToken,setUserDetails,getUserDetails,removeSessions}=new SessionHelper();