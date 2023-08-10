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
                <Card.Img variant="top" style={{height:'22rem', width:'auto'}} src={getUserDetails()["profile"]} />
                <Card.Body>
                    <Card.Title className="text-center">{getUserDetails()["firstName"]} {getUserDetails()["lastName"]}</Card.Title>
                    <Card.Text>
                        <div className="text-center">
                            {getUserDetails()['status']}
                        </div>
                        <div className="followStatus">
                            <div className="follow">
                                <span>{getUserDetails()[`Followers`]}</span>
                                <span>Following</span>
                            </div>
                            <div className="follow">
                                <span>{getUserDetails()[`Following`]}</span>
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
                            actionButton={<Button variant="success" onClick='/'>Save Changes</Button>}
                        />
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Profileleftbar;