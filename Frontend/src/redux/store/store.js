import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../state/settings-slice";
import profileReducer from "../state/profile-slice";


export default configureStore({
    reducer:{
        settings:settingsReducer,
        profile:profileReducer
    }
})