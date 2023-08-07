class SessionHelper{
    setToken(token){
        localStorage.setItem("token",token)
    }
    getToken(){
        try{
            return localStorage.getItem("token")
        }
        catch(err){
            console.log("Error getting token")
            return false
        }
        
    }
    setUserDetails(UserDetails){
        localStorage.setItem("UserDetails",JSON.stringify(UserDetails))
    }
    getUserDetails(){
        try{
            // return localStorage.getItem("token")
            return JSON.parse(localStorage.getItem("UserDetails"))
        }
        catch(err){
            console.log("Error getting token")
            return false
        }
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
        window.location.href="/Login"
    }
}
export const {setEmail,getEmail,setOTP,getOTP,setToken,getToken,setUserDetails,getUserDetails,removeSessions}=new SessionHelper();