import { useHistory } from "react-router-dom";
import { LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from "../../utils/types";

const user = JSON.parse(localStorage.getItem("user")|| "{}")

const tmpUser = {
    avatar: user.avatar,
    email: user.email,
    phone :user.phone,
    role : user.role,
    userName : user.userName
}

// const tmpUser = {avatar:'',phone:'', role:'', email:'' , userName:''}

const initialState  = {
    user : tmpUser,
    isLoggedIn : tmpUser !== null ? true : false,
}
 export const AuthReducer = (state = initialState ,action)  => {


    switch(action.type) {
        case LOGIN_SUCCESS : 
            return {
                ...state,
                user : action.payload.user,
                isLoggedIn : true,
            }
        case LOGIN_FAIL :
            return {
                user :null,
                isLoggedIn : false,
            }
        case LOGOUT :
            return {
                user:null,
                isLoggedIn : false
            }
        default :
            return state
        }
};