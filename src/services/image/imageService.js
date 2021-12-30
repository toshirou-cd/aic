import BASE_URL from "../../utils/Url";
import axios from "axios";


export const getAvatar = (fileName) => {
    return axios
    .post(BASE_URL.getAvatar, {
        params: {
        fileName : fileName
      }})
    .then((res) => {
        return res
    }).catch((err) => {
        console.log("img err !!" + err)
    })
}

