import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import axios from "axios";
import store from "../../redux/store/store.js";
import { ShowLoader, HideLoader } from "../../redux/state/settings-slice.js";
import { BaseURL } from "../../helper/config.js";
import { ErrorToast } from "../../helper/FormHelper.js";
import Follow from "./Follow.jsx";

const Rightbar = () => {
    const userDetails = useSelector((state) => state.profile);
    let user = userDetails?.profile;
    const id = user?.other?._id;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getuser = async () => {
            try {
                store.dispatch(ShowLoader());
                const res = await axios.get(BaseURL + `/users/all/user/${id}`);
                setUsers(res.data);
                store.dispatch(HideLoader());
            } catch (error) {
                ErrorToast("Something Went Wrong");
                store.dispatch(HideLoader());
            }
        };
        getuser();
    }, []);

    return (
        <div>
            <Card style={{ width: '22rem', marginTop: "10px" }}>
                <Card.Body>
                    <div className='rightcontainer2'>
                        <h3 style={{ textAlign: "start", marginLeft: "10px" }}>Suggested for you</h3>
                        {users.map((item) => (
                            <Follow userdetails={item} key={item._id} />
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Rightbar;
