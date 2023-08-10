import { Modal as BootstrapModal, Button } from "react-bootstrap";
import {useEffect, useRef} from "react";
import {GetProfileDetails, ProfileUpdateRequest} from "../../APIRequest/userAPI.js";

import {useNavigate} from "react-router-dom";
import {ErrorToast, getBase64, IsEmail, IsEmpty, IsMobile} from "../../helper/FormHelper.js";
import {getUserDetails} from "../../helper/SessionHelper.js";

// eslint-disable-next-line react/prop-types
const Modal = ({ show, onClose }) => {
    const ProfileData = getUserDetails();
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const phoneNumberRef = useRef();
    const passwordRef = useRef();
    const profileRef = useRef();
    const userImgViewRef = useRef();
    const statusRef = useRef(); // New ref for capturing status

    useEffect(() => {
        (async () => {
            await GetProfileDetails();
        })();
    }, []);

    const navigate = useNavigate();

    const PreviewImage = async () => {
        const ImgFile = profileRef.current.files[0];
        try {
            const base64Img = await getBase64(ImgFile);
            userImgViewRef.current.src = base64Img;
        } catch (error) {
            console.error("Error converting image to base64:", error);
        }
    };

    const UpdateMyProfile = async () => {
        const email = emailRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const username = usernameRef.current.value;
        const phoneNumber = phoneNumberRef.current.value;
        const password = passwordRef.current.value;
        const profile = userImgViewRef.current.src;
        const status = statusRef.current.value; // Get the status value from the ref

        if (IsEmail(email)) {
            ErrorToast("Valid Email Address Required!");
        } else if (IsEmpty(firstName)) {
            ErrorToast("First Name Required!");
        } else if (IsEmpty(lastName)) {
            ErrorToast("Last Name Required!");
        } else if (IsEmpty(username)) {
            ErrorToast("Username Required!");
        } else if (IsEmpty(status)) {
            ErrorToast("status Required!");
        } else if (IsEmpty(password)) {
            ErrorToast("Password Required!");
        } else if (!IsMobile(phoneNumber)) {
            ErrorToast("Valid Mobile Number Required!");
        } else {
            const result = await ProfileUpdateRequest(email, firstName, lastName, username, phoneNumber, password, profile, status);
            if (result === true) {
                navigate("/Profile");
            }
        }
    };
    return (
        <BootstrapModal show={show} onHide={onClose} size="xl">
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>Edit Profile</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>

                <div className="container-fluid">
                    <img ref={userImgViewRef}  style={{height:'5rem', width: '5rem'}} src={ProfileData.profile} alt=""/>
                    <hr/>
                    <div className="row">
                        <div className="col-4 p-2">
                            <label>Profile Picture</label>
                            <input onChange={PreviewImage} ref={profileRef} placeholder="User profile" className="form-control animated fadeInUp" type="file"/>
                        </div>
                        <div className="col-4 p-2">
                            <label>Email Address</label>
                            <input key={Date.now()} defaultValue={ProfileData.email} readOnly={true}  ref={emailRef} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                        </div>
                        <div className="col-4 p-2">
                            <label>First Name</label>
                            <input  key={Date.now()} defaultValue={ProfileData.firstName} ref={firstNameRef} placeholder="First Name" className="form-control animated fadeInUp" type="text"/>
                        </div>
                        <div className="col-4 p-2">
                            <label>Last Name</label>
                            <input key={Date.now()} defaultValue={ProfileData.lastName}   ref={lastNameRef} placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                        </div>
                        <div className="col-4 p-2">
                            <label>username</label>
                            <input key={Date.now()} defaultValue={ProfileData.username}  ref={usernameRef} placeholder="username" className="form-control animated fadeInUp" type="text"/>
                        </div>
                        <div className="col-4 p-2">
                            <label>Status</label>
                            <input key={Date.now()} defaultValue={ProfileData.status}  ref={statusRef} placeholder="status" className="form-control animated fadeInUp" type="text"/>
                        </div>
                        <div className="col-4 p-2">
                            <label>Mobile</label>
                            <input key={Date.now()} defaultValue={ProfileData.phoneNumber} ref={phoneNumberRef} placeholder="Phone Number" className="form-control animated fadeInUp" type="mobile"/>
                        </div>
                        <div className="col-4 p-2">
                            <label>Password</label>
                            <input key={Date.now()} defaultValue={ProfileData.password}  ref={passwordRef} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
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
