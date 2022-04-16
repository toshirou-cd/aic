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
  export const updatePrize = async (id,stats,name ) => {
    return await axiosApiInstance
    .post(BASE_URL.updatePrize, 
      {
      Id: id,
      status:stats ,
      prize_name :name
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("update prize  error :" + err);
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
  export const updateStatusPost = async (id ,status) => {
    return await axiosApiInstance
    .post(BASE_URL.updateContestPost, {
      Id: id,
      status: status
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Update status post error :" + err);
    });
  };
  export const setAwardforUserInContest = async (id ,posts  ) => {
    return await axiosApiInstance
    .post(BASE_URL.setPrize, {
      contest_id: id,
      Posts: posts
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("set prize  post error :" + err);
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
  export const updateContest = async (id, name ,des,date_end ) => {
    return await axiosApiInstance
    .post(BASE_URL.updateContest, 
      {
        Id: id,
          contest_name: name,
          description: des,
        date_end: date_end
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Update contest error :" + err);
    });
  };
  export const updateContestPrizes = async (id, prizes) => {
    return await axiosApiInstance
    .post(BASE_URL.updatePrizeContest, 
      {
        contest_id: id,
        Prizes: prizes
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Update contest prizes error :" + err);
    });
  };

  export const getPageContestPost = async (q, page,pageSize,status,contest_id,is_like_count_descending) => {
    return await axiosApiInstance
    .get(BASE_URL.getPageContestPost, {
      params:
      {
        searchString: q,
        currentPage: page,
        postPerPage: pageSize,
        status : status,
        contestId : contest_id,
        flag : is_like_count_descending
      }
    }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("get page contest posts error :" + err);
    });
  };

  export const deleteContest = async(id) => {
    return await axiosApiInstance.post(BASE_URL.deleteContest,{
      contest_id : id
    }).then(res => {
      return res.data
    }).catch(err => {
      console.log('getting err in deleting contest : ' + err)
    })
  }


