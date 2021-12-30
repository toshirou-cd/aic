import BASE_URL from "../utils/Url";
import axios from "axios";
import { axiosApiInstance } from "../services/auth/authService";

export const getLikeAndCommentInit = (commentPerPage, postId) => {
    return axiosApiInstance
    .get(BASE_URL.getCommentAndLikeInit,
        {
          params : {
            commentPerPage: commentPerPage,
            postId: postId
      }
    })
    .then((res) => {
        return res.data.data
    }).catch((err) => {
        console.log('Get comment error :' + err)
    })
}

