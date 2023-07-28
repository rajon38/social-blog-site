import React, { useState, useRef} from 'react'
import { Link } from 'react-router-dom';
import {ErrorToast, IsEmail, IsEmpty, IsMobile} from "../../helper/FormHelper";
import "./signup.css";
import { signup } from '../../Component/ReduxContainer/apiCall';
// import app from '../../firebase';
import { useNavigate } from 'react-router-dom';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default function Signup() {
  let emailRef,firstNameRef,lastNameRef,mobileRef,userRef,passwordRef=useRef();

  let navigate=useNavigate();
  // const [firstName , setFirstName] = useState('');
  // const [lastName , setLastName] = useState('');
  // const [email , setEmail] = useState('');
  // const [phonenumber , setphonenumber] = useState('');
  // const [username , setusername] = useState('');
  // const [password , setpassword] = useState('');
  // const [file , setfile] = useState(null);
  // const navigator = useNavigate();
        
  const onRegistration = ()=>{
    // e.preventDefault();
        let email=emailRef.value;
        let firstName=firstNameRef.value;
        let lastName=lastNameRef.value;
        let phonenumber=mobileRef.value;
        let username=userRef.value;
        let password= passwordRef.value;
    if(IsEmail(email)){
      ErrorToast("Valid Email Address Required !")
  }
  else if(IsEmpty(firstName)){
    ErrorToast("First Name Required !")
  }
  else if(IsEmpty(lastName)){
    ErrorToast("Last Name Required !")
  }
  else if(IsEmpty(username)){
      ErrorToast("Username Name Required !")
  }
  else if(!IsMobile(phonenumber)){
      ErrorToast("Valid Mobile  Required !")
  }
  else if(IsEmpty(password)){
      ErrorToast("Password Required !")
  }
  else{
    signup(email,firstName,lastName,username,phonenumber,password).then((result)=>{
          if(result===true){
              navigate("/login")
          }
      })
  }
  //   const fileName = new Date().getTime() + file?.name;
  //   const storage = getStorage(app);
  //   const StorageRef = ref(storage , fileName);
    
  //   const uploadTask = uploadBytesResumable(StorageRef, file);
  //   uploadTask.on('state_changed', 
  // (snapshot) => {
  //   // Observe state change events such as progress, pause, and resume
  //   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //   console.log('Upload is ' + progress + '% done');
  //   switch (snapshot.state) {
  //     case 'paused':
  //       console.log('Upload is paused');
  //       break;
  //     case 'running':
  //       console.log('Upload is running');
  //       break;
  //   }
  // }, 
  // (error) => {
  //   // Handle unsuccessful uploads
  // }, 
  // () => {
  //   // Handle successful uploads on complete
  //   // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //     signup(dispatch ,{email , password , username , phonenumber , profile:downloadURL});
  //     })
  //   });

  }
  // console.log(userDetails?.Status)
  //   if(userDetails?.Status==='Pending'){
    //     navigator("/verify/email");
  //   }
  return (
    <div className='mainContainerForsignup'>
      <div className='submainContainer'>
        <div style={{flex:1 , marginLeft:150  , marginBottom:"170px"}}>
          <p className='logoText'>Soc<span className='part'>ial</span></p>
          <p className='introtext'>Connect with your <span className='part'>family and friends </span></p>
        </div>
        <div style={{flex:3}}>
          <p className='createaccountTxt'>Create New Account</p>
          {/* <input type="file" name="file" id="file" onChange={(e)=>setfile(e.target.files[0])} /> */}
          <input type="text" placeholder='Firstname' ref={(input)=>firstNameRef=input} className='inputText' />
          <input type="text" placeholder='Lastname' ref={(input)=>lastNameRef=input} className='inputText' />
          <input type="text" placeholder='Username' ref={(input)=>userRef=input} className='inputText' />
          <input type="text" placeholder='Phonenumber' ref={(input)=>mobileRef=input} className='inputText' />
          <input type="email" name="" id="" placeholder='email' ref={(input)=>emailRef=input} className='inputText' />
          <input type="password" placeholder='******' name="" ref={(input)=>passwordRef=input} id="" className='inputText' />
          <button className='btnforsignup' onClick={onRegistration}>Signup</button>
          <Link to={"/"}>
          <p style={{textAlign:'start' , marginLeft:"30.6%" }}>Already have a account</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
