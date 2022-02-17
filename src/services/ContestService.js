import React from 'react';
import BASE_URL from '../utils/Url';
import { axiosApiInstance } from './auth/authService';

export const getContest = async (searchName, page, pageSize, status , date_up, date_down) => {
    return await axiosApiInstance
    .get(BASE_URL.getContests, {
      params : {
        searchName : searchName,
        currentPage : page,
        limitContest : pageSize,
        requestStatus :     status,
        date_up : date_up,
        date_dow : date_down
      }
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Get conetst list error :" + err);
    });
  };

  export const getPrizesList = async (searchName,currentPage, productPerPage, status ) => {
    return await axiosApiInstance
    .get(BASE_URL.getPrizesList, {
      params : {
        searchname : searchName,
        currentPage : currentPage,
        productPerPage : productPerPage,
        status :status,
      }
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Get prizes list error :" + err);
    });
  };

  export const addPrize = async (name ) => {
    return await axiosApiInstance
    .post(BASE_URL.addPrize, {
      prize_name: name
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("add prize  error :" + err);
    });
  };



  export const createContest = async (contest_name, description, date_end,delaytime_tostart,Prizes ) => {
    return await axiosApiInstance
    .post(BASE_URL.createContest, {
        contest_name : contest_name,
        description : description,
        date_end :date_end,
        delaytime_tostart : delaytime_tostart,
        Prizes : Prizes
      
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Create contest error :" + err);
    });
  };


  export const getContestUser = async (contest_id, limituser ) => {
    return await axiosApiInstance
    .get(BASE_URL.getUserIncontest, {
      params : {
        contest_id : contest_id,
        limituser : limituser,
      }
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Get user list in contest error :" + err);
    });
  };
  export const getContestDetail = async (contest_id, limitPost ) => {
    return await axiosApiInstance
    .get(BASE_URL.getContestDetail, {
      params : {
        contest_id : contest_id,
        limitPost : limitPost,
      }
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Get contest detail error :" + err);
    });
  };

  export const activeContest = async (id ) => {
    return await axiosApiInstance
    .post(BASE_URL.activeContestManually, {
      contest_id: id,
      delay_time: 0
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Active contest error :" + err);
    });
  };
  export const finishContest = async (id ) => {
    return await axiosApiInstance
    .get(BASE_URL.finishContestManually, {params :{
      contest_id: id,
    }}
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Finish contest error :" + err);
    });
  };


