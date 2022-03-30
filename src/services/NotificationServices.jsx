import BASE_URL from "../utils/Url";
import { axiosApiInstance } from "./auth/authService";


export const getNotification = (limitNoti) => {
    return axiosApiInstance
      .get(BASE_URL.getNotification, {
        params: {
          limitNotification : limitNoti
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("Error getting noti :" + err);
      });
  };
  export const getMorePostOfUserInContest = (limitpost,date,id) => {
    return axiosApiInstance
      .get(BASE_URL.getMoreUserContestPost, {
        params: {
          limitPost: limitpost,
          date_boundary : date,
          userId : id,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("Error getting contest post :" + err);
      });
  };