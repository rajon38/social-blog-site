import { Modal as BootstrapModal, Button } from "react-bootstrap";
import {useEffect, useRef} from "react";
import {GetProfileDetails, ProfileUpdateRequest} from "../../APIRequest/userAPI.js";

import {useNavigate} from "react-router-dom";
import {ErrorToast, getBase64, IsEmail, IsEmpty, IsMobile} from "../../helper/FormHelper.js";
import {getUserDetails} from "../../helper/SessionHelper.js";

// eslint-disable-next-line react/prop-types
const Modal = ({ show, onClose }) => {
    let emailRef, firstNameRef, lastNameRef, usernameRef, phoneNumberRef, passwordRef, profileRef, userImgView = useRef();

    useEffect(()=> {
        (async ()=>{
            await GetProfileDetails()
        })();
    },[])

    const ProfileData = getUserDetails();

    let navigate = useNavigate();

    const PreviewImage = () =>{
        let ImgFile = profileRef.files[0];
        getBase64(ImgFile).then((base64Img) =>{
            userImgView.src = base64Img;
        })
    }

    const UpdateMyProfile = async () =>{
        let email = emailRef.value;
        let firstName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let username = usernameRef.value;
        let phoneNumber = phoneNumberRef.value;
        let password = passwordRef.value;
        let profile = userImgView.src;


        if (IsEmail(email)){
            ErrorToast("valid Email Address Required!")
        }else if (IsEmpty(firstName)){
            ErrorToast("First Name Required !")
        } else if (IsEmpty(lastName)) {
            ErrorToast("Last Name Required !")
        } else if (IsEmpty(username)) {
            ErrorToast("username Required !")
        } else if (!IsMobile(phoneNumber)) {
            ErrorToast("Valid Mobile  Required !")
        } else if (IsEmpty(password)) {
            ErrorToast("Password Required !")
        }else{
            let result = await ProfileUpdateRequest(email, firstName, lastName, phoneNumber, password, profile)
            if (result === true){
                navigate("/")
            }
        }

    }
    return (
        <BootstrapModal show={show} onHide={onClose} size="xl">
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>Edit Profile</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>

                <div className="container-fluid">
                    <img ref={(input)=>userImgView=input}  style={{height:'5rem', width: '5rem'}} src={ProfileData['profile']} alt=""/>
                    <hr/>
                    <div className="row">
                        <div className="col-4 p-2">
                            <label>Profile Picture</label>
                            <input onChange={PreviewImage} ref={(input)=>profileRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="file"/>
                        </div>
                        <div className="col-4 p-2">
                            <label>Email Address</label>
                            <input key={Date.now()} defaultValue={ProfileData['email']} readOnly={true}  ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                        </div>
                        <div className="col-4 p-2">
                            <label>First Name</label>
                            <input  key={Date.now()} defaultValue={ProfileData['firstName']} ref={(input)=>firstNameRef=input} placeholder="First Name" className="form-control animated fadeInUp" type="text"/>
                        </div>
                        <div className="col-4 p-2">
                            <label>Last Name</label>
                            <input key={Date.now()} defaultValue={ProfileData['lastName']}  ref={(input)=>lastNameRef=input} placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                        </div>
                        <div className="col-4 p-2">
                            <label>username</label>
                            <input key={Date.now()} defaultValue={ProfileData['username']} readOnly={true}  ref={(input)=>usernameRef=input} placeholder="username" className="form-control animated fadeInUp" type="text"/>
                        </div>
                        <div className="col-4 p-2">
                            <label>Mobile</label>
                            <input key={Date.now()} defaultValue={ProfileData['phoneNumber']} ref={(input)=>phoneNumberRef=input} placeholder="Phone Number" className="form-control animated fadeInUp" type="mobile"/>
                        </div>
                        <div className="col-4 p-2">
                            <label>Password</label>
                            <input key={Date.now()} defaultValue={ProfileData['password']}  ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                        </div>
                    </div>
                </div>
            </BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button variant="danger" onClick={onClose}>
                    Close
                </Button>
                <Button variant="success" onClick={UpdateMyProfile}>
                    Update
                </Button>
            </BootstrapModal.Footer>
        </BootstrapModal>
    );
};

export default Modal;
