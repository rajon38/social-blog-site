import "./leftbar.css"
import {getUserDetails} from "../../helper/SessionHelper.js";
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/Card';
const Leftbar = () => {

    return (
        // <div className='Leftbar'>
        //     <div className='NotificationsContainer' >
        //         <div className="ProfileImages">
        //             <img src={ getUserDetails()['profile'] } alt="ProfileImage"/>
        //         </div>
        //         <div className="ProfileName">
        //             <span>{getUserDetails()['firstName']} {getUserDetails()['lastName']}</span>
        //         </div>
        //         <div className="followStatus">
        //             <hr />
        //             <div className="follow">
        //             <span>{getUserDetails()['Followers']}</span>
        //             <span>Following</span>
        //             </div>
        //             <div className="vl"/>
        //             <div className="follow">
        //                 <span>{getUserDetails()['Following']}</span>
        //                 <span>Following</span>
        //             </div>
        //             <hr/>
        //         </div>
        //         <span>
        //             <Link to="/Profile" style={{ textDecoration: "none", color: "inherit"}}>
        //                 My Profile
        //             </Link>
        //         </span>
        //     </div>
        //
        //
        // </div>
        <div>
            <Card style={{ width: '22rem', marginTop:"10px"}}>
            <Card.Img variant="top" style={{height:'22rem', width:'auto'}} src={getUserDetails()["profile"]} />
            <Card.Body>
                <Card.Title className="text-center">{getUserDetails()["firstName"]} {getUserDetails()["lastName"]}</Card.Title>
                <Card.Text>
                    <div className="followStatus">
                                     <div className="follow">
                                     <span>{getUserDetails()[`Followers.length`]}</span>
                                     <span>Following</span>
                                     </div>
                                     <div className="follow">
                                         <span>{getUserDetails()[`Following.length`]}</span>
                                         <span>Following</span>
                                     </div>
                                 </div>
                </Card.Text>
                <Link className="btn btn-success d-grid" to='/Profile'>Profile</Link>
            </Card.Body>
        </Card>
        </div>
    );
};

export default Leftbar;