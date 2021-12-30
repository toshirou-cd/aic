import BASE_URL from "../../utils/Url";
import axios from "axios";
import { axiosApiInstance } from "../auth/authService";

export const getAccountList = (numberOfAccount) => {
    return axiosApiInstance
    .get(BASE_URL.getAccountList,
        {
          params : {
        limituser: numberOfAccount
      }
    })
    .then((res) => {
        return res.data.data
    })
}
export const getAccountDetail = (id,limitPost) => {
    return axiosApiInstance
    .get(BASE_URL.getAccountDetail,
        {
          params : {
        user_id: id,
        limitpost: limitPost
      }
    })
      
    .then((res) => {
        return res.data.data
    })
    .catch((err) => {
      console.log('Error get Account Detail :' + err)
    })
}


