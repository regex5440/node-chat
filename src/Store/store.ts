import { configureStore } from "@reduxjs/toolkit";
import { GET_CONNECTED_USERS } from "./actionType";

const INITIAL_STATE = {
    userdata: {
        isLoggedin: false,
        username: '',
        name: ''
    },
    messages: []
};

const universalReducer = (INITIAL_STATE,action)=>{
    switch (action.type){
        case GET_CONNECTED_USERS:
            return;
        default:
            return;
    }
};

const store = configureStore({reducer: universalReducer});

export default store;