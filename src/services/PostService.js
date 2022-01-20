  import BASE_URL from "../utils/Url";
  import axios from "axios";
  import { axiosApiInstance } from "../services/auth/authService";


export const getPostDetail = (post_id, limitComment) => {
  return axiosApiInstance
    .get(BASE_URL.getPostDetail, {
      params: {
        post_id: post_id,
        limitComment: limitComment,
      },
    })
    .then((res) => {
      // if(res.data.statusCode === 200) {
        return res.data;
      // }
      // return console.log('message code : ' +res.data.messageCode )
    })
    .catch((err) => {
      console.log("Get post detail error :" + err  );
    });
};



export const getLikeAndCommentInit = async (commentPerPage, postId) => {
  return await axiosApiInstance
    .get(BASE_URL.getCommentAndLikeInit, {
      params: {
        commentPerPage: commentPerPage,
        postId: postId,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Get comment error :" + err);
    });
};

export const getPageComment = (date_boundary, commentPerPage, postId) => {
  return axiosApiInstance
    .get(BASE_URL.getPageComment, {
      params: {
        date_boundary: date_boundary,
        commentPerPage: commentPerPage,
        postId: postId,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Get page comment error :" + err);
    });
};

export const deletePost = (postID) => {
  return axiosApiInstance
    .post(BASE_URL.deletePost, {
        Id: postID,
        status: 4,
    })
    .then((res) => {
      return res.data.statusCode;
    })
    .catch((err) => {
      console.log("Get page comment error :" + err);
    });
};

export const deleteComment = (commentId) => {
  return axiosApiInstance
    .post(BASE_URL.deleteComment, {
      Id: commentId
    })
    .then((res) => {
      return res.data.statusCode;
    })
    .catch((err) => {
      console.log("Get page comment error :" + err);
    });
};


export const getRandomPost = (limitPost, limitDay) => {
  return axiosApiInstance
    .get(BASE_URL.getRandomPost, {
      params: {
        limitPost: limitPost,
        limitDay: limitDay,
      },
    })
    .then((res) => {
      if(res.data.statusCode === 200)  {

        return res.data.data;
      } 
      return console.log('Get random post error ' + res.data.messageCode)
    })
    .catch((err) => {
      console.log("Get random post error :" + err);
    });
};

export const getMoreRandomPost = (limitPost, limitDay, dateBoundary) => {
  return axiosApiInstance
    .get(BASE_URL.getMoreRandomPost, {
      params: {
        limitPost: limitPost,
        limitDay: limitDay,
        date_boundary : dateBoundary
      },
    })
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
      console.log("Get more random post error :" + err);
    });
};