import "./profileleftbar.css"
import {getUserDetails} from "../../helper/SessionHelper.js";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import {useState} from "react";
import Modal from "./modal.jsx";
import Button from "react-bootstrap/Button";

const Profileleftbar = () => {
    const [showModal, setShowModal] = useState(false);

    const profileClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };


    return (
        <div>
            <Card style={{ width: '22rem', marginTop:"10px"}}>
                <Card.Img variant="top" style={{height:'47px', width:'44px' , marginLeft:'155px' ,marginTop:"20px"} } src={getUserDetails()["profile"]} />
                <Card.Body>
                    <Card.Title className="text-center">{getUserDetails()["firstName"]} {getUserDetails()["lastName"]}</Card.Title>
                    <Card.Text>
                        <div className="text-center">
                            {getUserDetails()['status']}
                        </div>
                        <hr/>
                        <div className="followStatus">
                            <div className="follow">
                                <span>{getUserDetails()[`Followers`].length}</span>
                                <span>Followers</span>
                            </div>
                            <div className="follow">
                                <span>{getUserDetails()[`Following`].length}</span>
                                <span>Following</span>
                            </div>
                        </div>
                    </Card.Text>
                    <Link className="btn btn-success d-grid" onClick={profileClick}>
                        Edit Profile
                    </Link>
                    {/* Render the modal based on the showModal state */}
                    {showModal && (
                        <Modal
                            show={showModal}
                            onClose={handleModalClose}
                        />
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Profileleftbar;