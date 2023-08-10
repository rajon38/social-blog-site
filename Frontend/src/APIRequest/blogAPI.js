import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state/settings-slice.js";
import {BaseURL} from "../helper/config.js";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper.js";
import {getToken} from "../helper/SessionHelper.js";
const AxiosHeader = {headers:{"token":getToken()}}

export function GetUser(userId) {
    store.dispatch(ShowLoader());

    let URL = BaseURL + "/users/all/user/" + userId;

    return axios
        .get(URL, AxiosHeader)
        .then((res) => {
            store.dispatch(HideLoader());
            if (res.status === 200) {
                return res.data; // Return the user details received from the response
            } else {
                ErrorToast("Something Went Wrong");
                return null;
            }
        })
        .catch((er) => {
            ErrorToast("Something Went Wrong");
            store.dispatch(HideLoader());
            return null;
        });
}
export function CreateNewBlog(title,author,description,date,image){


    store.dispatch(ShowLoader())

    let URL=BaseURL+"/blogs/create-blog";
    let PostBody={"title":title,"author":author,"description":description,"image":image,"date":date}

    return axios.post(URL,PostBody,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            SuccessToast("Blog post created successfully")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }

    }).catch((er)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    })
}


export function GetAllBlogs() {
    store.dispatch(ShowLoader());

    let URL = BaseURL + "/blogs/getall-blogs";

    return axios
        .get(URL, AxiosHeader)
        .then((res) => {
            store.dispatch(HideLoader());
            if (res.status === 200) {
                return res.data; // Return the array of blogs received from the response
            } else {
                ErrorToast("Something Went Wrong");
                return false;
            }
        })
        .catch((er) => {
            ErrorToast("Something Went Wrong");
            store.dispatch(HideLoader());
            return false;
        });
}


export function GetFollowers(blogId) {
    store.dispatch(ShowLoader());

    let URL = BaseURL + "/blogs/followers/" + blogId;

    return axios
        .get(URL, AxiosHeader)
        .then((res) => {
            store.dispatch(HideLoader());
            if (res.status === 200) {
                return res.data; // Return the array of followers received from the response
            } else {
                ErrorToast("Something Went Wrong");
                return false;
            }
        })
        .catch((er) => {
            ErrorToast("Something Went Wrong");
            store.dispatch(HideLoader());
            return false;
        });
}