import BASE_URL from "../../utils/Url";
import axios from "axios";
import { axiosApiInstance } from "../auth/authService";
import { KeyboardReturnSharp } from "@mui/icons-material";

export const getAccountList = (searchName, status, limituser, page) => {
  return axiosApiInstance
    .get(BASE_URL.getAccountList, {
      params: {
        searchName: searchName,
        status: status,
        limituser: limituser,
        currentPage: page,  
      },
    })
    .then((res) => {
      if( res.data.statusCode === 200) {
        return res.data;
      }
      return res.data
    }).catch(err => {
      if(axios.isCancel(err)) return
      console.log('error when getting account list :' + err)
    });
};

export const searchAccount = (date, limitUser, searchValue) => {
  return axiosApiInstance
    .get(BASE_URL.searchUser, {
      params: {
        date_boundary: date,
        limituser: limitUser,
        name: searchValue,
      },
    })
    .then((res) => {
      // if(res.data.statusCode === 200) {
      return res.data.data;
      // } else {
      //   return null
      // }
    })
    .catch((err) => {
      console.log("error when getting search" + err);
    });
};

export const getAccountDetail = (id, limitPost) => {
  return axiosApiInstance
    .get(BASE_URL.getAccountDetail, {
      params: {
        user_id: id,
        limitpost: limitPost,
      },
    })

    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log("Error get Account Detail :" + err);
    });
};

export const forceLogout = (id) => {
  return axiosApiInstance
    .get(BASE_URL.forceLogout, {
      params: {
        userId: id,
      },
    })

    .then((res) => {
      return res.data.statusCode;
    })
    .catch((err) => {
      console.log("Error forcing log out :" + err);
    });
};
export const deleteAccount = (id) => {
  return axiosApiInstance
    .post(BASE_URL.deleteAccount, {
      user_id: id,
    })

    .then((res) => {
      return res.data.statusCode;
    })
    .catch((err) => {
      console.log("Error delete account :" + err);
    });
};

export const updateUserInfo = (id, email, phone) => {
  return axiosApiInstance
    .post(BASE_URL.updateUserProfile, {
      user_id: id,
      user_email: email,
      phone: phone,
    })

    .then((res) => {
      return res.data.statusCode;
    })
    .catch((err) => {
      console.log("Error delete account :" + err);
    });
};
