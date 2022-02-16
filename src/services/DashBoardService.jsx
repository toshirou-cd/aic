import BASE_URL from "../utils/Url";
import axios from "axios";
import { axiosApiInstance } from "../services/auth/authService";


export const getCollectionInfo = () => {
return axiosApiInstance
  .get(BASE_URL.getDashboardInfo, {
    params: {
      date_up: null,
      date_dow: null,
    },
  })
  .then((res) => {
    // if(res.data.statusCode === 200) {
      return res.data;
    // }
    // return console.log('message code : ' +res.data.messageCode )
  })
  .catch((err) => {
    console.log("Get dashboard info error :" + err  );
  });
};

