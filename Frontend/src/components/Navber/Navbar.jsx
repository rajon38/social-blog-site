import "./navbar.css"
import searchIcon from "../../assets/images/search.png"
import {getUserDetails, removeSessions} from "../../helper/SessionHelper.js";
import Notifications from "../../assets/images/bell.png";
import Message from "../../assets/images/message.png";
import {Link} from "react-router-dom";

const Navbar = () => {
    const onLogout=()=>{
        removeSessions();
    }
    return (
        <div className='mainNavbar'>
            <div className='LogoContainer'>
                <p>Social</p>
            </div>
            <div>
                <div className='searchInputContainer'>
                    <img src={`${searchIcon}`} className="searchIcon" alt="" />
                    <input type="text" className='searchInput' placeholder='search your friends' name="" id="" />
                </div>
            </div>
            <div className='IconsContainer'>
                <img src={`${Notifications}`} className="Icons" alt="" />
                <img src={`${Message}`} className="Icons" alt="" />
                <Link to={`/Profile`}>
                    <div style={{display:'flex' , alignItems:'center'}}>
                        <img className="icon-nav-img icon-nav" src={getUserDetails()['photo']} alt=""/>
                        <p style={{marginLeft:'5px'}}>{getUserDetails()['username']}</p>
                    </div>
                </Link>
                <div style={{marginRight:"30px" , marginLeft:"20px" , cursor:"pointer"}} onClick={onLogout}>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;