import "./leftbar.css"
import {getUserDetails} from "../../helper/SessionHelper.js";
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/Card';
const Leftbar = () => {

    return (
        <div>
            <Card style={{ width: '22rem', marginTop:"10px"}}>
                <Card.Img variant="top" style={{height:'47px', width:'47px' , marginLeft:'155px' ,marginTop:"20px"} } src={getUserDetails()["profile"]} />
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
                    <Link className="btn btn-success d-grid" to='/Profile'>Profile</Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Leftbar;