import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import BASE_URL from "../../utils/Url";


export const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401) {
   console.log('looi cmrn')
   
  return <Redirect to='/login' />
 }
 return error;
});

export const Login = (username,password) => {
        return axiosApiInstance
        .post(BASE_URL.authenticate, {Username : username,Password:password})
        .then((res) => {
            if(res.data.user.role !== 'Admin') throw new Error("User not found")
            if(res.data.data) {
                localStorage.setItem("token",res.data.data)
                localStorage.setItem("user",JSON.stringify(res.data.user))
                axios.defaults.headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${res.data.data}`
                }
                // axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data}`
            }

            return res.data
        })
    }

export const Logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }





