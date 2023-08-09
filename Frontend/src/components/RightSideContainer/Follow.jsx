import addFriends from "../../assets/images/add-user.png";
import UserToFollow from "../../assets/images/afterFollowImg.png";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getToken } from '../../helper/SessionHelper.js';
import { BaseURL } from '../../helper/config.js';

// eslint-disable-next-line react/prop-types
export default function Follow({ userdetails }) {
    const userDetails = useSelector((state) => state.user);
    let user = userDetails?.user;
    let id = user?.other?._id;
    const accessToken = getToken();
    const [Follow, setFollow] = useState(addFriends);

    const handleFollow = async () => {
        // eslint-disable-next-line react/prop-types
        await fetch(BaseURL + `/users/following/${userdetails._id}`, { method: 'PUT', headers: { 'Content-Type': "application/JSON", token: accessToken }, body: JSON.stringify({ user: `${id}` }) });
        setFollow(UserToFollow);
    };

    return (
        // eslint-disable-next-line react/prop-types
        <div style={{ marginTop: "-10px" }} key={userdetails._id}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* eslint-disable-next-line react/prop-types */}
                <Link to={`/Profile/${userdetails._id}`}>
                    <div style={{ display: 'flex', alignItems: "center" }}>
                        {/* eslint-disable-next-line react/prop-types */}
                        <img src={`${userdetails.profile}`} className="Profileimage" alt="" />
                        <div>
                            {/* eslint-disable-next-line react/prop-types */}
                            <p style={{ marginLeft: "10px", textAlign: 'start' }}>{userdetails.username}</p>
                            <p style={{ marginLeft: "10px", textAlign: 'start', marginTop: "-16px", fontSize: "11px", color: "#aaa" }}>Suggested for you</p>
                        </div>
                    </div>
                </Link>
                {/* eslint-disable-next-line react/prop-types */}
                <div style={{ backgroundColor: "#aaa", padding: '10px', marginRight: 13, borderRadius: "50%", cursor: 'pointer' }} onClick={() => handleFollow(userdetails._id)}>
                    <img src={`${Follow}`} className="addfriend" alt="" />
                </div>
            </div>
        </div>
    );
}
