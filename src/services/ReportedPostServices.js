import BASE_URL from "../utils/Url";
import axios from "axios";
import { axiosApiInstance } from "../services/auth/authService";
import { Redirect, Route, Switch } from "react-router-dom";
import MyRedirect from "../components/MyRedirect";

export const getReportedPostList = async (currentPage,productPerPage, requestStatus, date_up, date_dow) => {
    return await axiosApiInstance
      .get(BASE_URL.getReportPosts, {
        params: {
             currentPage : currentPage,
            productPerPage: productPerPage,
            requestStatus: requestStatus,
            date_up : date_up,
            date_dow: date_dow
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("Get reported post error :" + err);
      });
  };
export const getReportedPostListbyCategory = (currentPage,productPerPage, requestStatus, date_up, date_dow, category) => {
    return axiosApiInstance
      .get(BASE_URL.getReportPostsbyCate, {
        params: {
             currentPage : currentPage,
            productPerPage: productPerPage,
            requestStatus: requestStatus,
            date_up : date_up,
            date_dow: date_dow,
            category_id: category
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("Get reported post by categories error :" + err);
      });
  };
export const getReportCategory = async () => {
    return await axiosApiInstance
      .get(BASE_URL.getReportCategories
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("Get reported post error :" + err);
      });
  };


  
  // axios.interceptors.request.use(
  //   async (config) => {
  //     config.headers = {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     };
  //     return config;
  //   },
  //   (error) => {
  //     Promise.reject(error);
  //   }
  //   );
    
  //   axios.interceptors.response.use(response => {
  //   return response;
  // }, error => {
  //   if (error.response.status === 401) {
  //     console.log('looi cmrn')
  //     return (
  //       window.alert('motha ducka')
  //     )
  //   }
  //   return error;
  // });
  
  export const getReportDetail = async (report_id) => {
    return await axiosApiInstance
    .get(BASE_URL.getReportDetail, {
      params : {
        report_id : report_id
      }
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Get reported detail error :" + err);
    });
  };


  export const updateReport  = async (report_id,status) => {
    return await axiosApiInstance
    .post(BASE_URL.updateReport, {
        Id : report_id,
        status : status
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Update  reported  error :" + err);
    });
  };
