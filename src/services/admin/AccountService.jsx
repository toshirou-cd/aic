import BASE_URL from "../../utils/Url";
import { axiosApiInstance } from "../auth/authService";

export const getManagerAccountList = async (q,status,pageSize,page) => {
    return await axiosApiInstance
    .get(BASE_URL.getManagerAccount, {
        params : {
            searchName: q,
            status : status,
            limituser : pageSize,
            currentPage : page
    }}
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Get manager account error :" + err);
    });
  };
export const createManagerAccount = async (name,password) => {
    return await axiosApiInstance
    .post(BASE_URL.createManagerAccount, {
            user_name: name,
            user_email : "123@gmail.com",
            user_password : password,
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Create manager account error :" + err);
    });
  };
export const updateManagerAccount = async (id,password) => {
    return await axiosApiInstance
    .post(BASE_URL.changeManagerPassword, {
            Id: id,
            user_password : password,
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Resest manager password error :" + err);
    });
  };

export const changeAIStatus = async (status) => {
    return await axiosApiInstance
    .post(BASE_URL.changeAIStatus
      , {
            status: status,
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Change AI status  error :" + err);
    });
  };

export const getAIStatus = async () => {
    return await axiosApiInstance
    .get(BASE_URL.getAIStatus,{
      params : {
        
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Get AI status  error :" + err);
    });
  };