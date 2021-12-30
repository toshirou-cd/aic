import { 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "../../utils/types";
import authService from "../../services/auth";

// interface IActions {
//     LOGIN_SUCCESS : string,
//     LOGIN_FAIL : string,
// }

export const LoginSuccess = (user)  => {
    return{
        type : LOGIN_SUCCESS,
        payload: {
            user : user
    }
}
}
export const LoginFail = () => {
    return {
        type : LOGIN_FAIL
    } 
}

// export const login = (username:string,password:string) => (dispatch:any ) => {
//     return authService.login(username,password)
//         .then((data) => {
//             dispatch({
//                 type: LOGIN_SUCCESS,
//                 payload:{user:data}
//             });

//             return Promise.resolve();
//         },
//             (error) => {
//                 const message = (
//                     error.res && error.res.data &&
//                     error.res.data.message) || 
//                     error.message ||
//                     error.toString();
//             return Promise.reject();
//             }
//         )
        
// }
export const logout = () => {
    return {
      type: LOGOUT
    }
}