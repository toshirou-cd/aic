import React from "react";
import { CLOSE_NOTIFY, FORCE_LOG_OUT, NOTIFY_ACTIVE_CONTEST_SUCCESSFULLY, NOTIFY_CREATE_CONTEST_SUCCESSFULLY, NOTIFY_DELETE_SUCCESSFULLY, NOTIFY_ERROR, NOTIFY_FINISH_CONTEST_SUCCESSFULLY, NOTIFY_SUCCESSFULLY, NOTIFY_UPDATE_SUCCESSFULLY } from "../../utils/types";

const initialState = {
  isOpen: false,
  message: "",
  type: "",
};

export const NotifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFY_DELETE_SUCCESSFULLY:
      return {
        isOpen: true,
        message: "Deleted successfully !",
        type: "success",
      }
    case CLOSE_NOTIFY:
      return {
          ...state,
          isOpen: false,
        }
    case FORCE_LOG_OUT : 
      return {
      isOpen : true,
      message : 'Force Logout Success',
      type :'success'
    }

    case NOTIFY_ERROR : 
      console.log('toi day roi ne')
      return {
        isOpen : true,
        message : 'Action failure',
        type :'error'
    }
    case NOTIFY_UPDATE_SUCCESSFULLY :
        return {
          isOpen : true,
          message : ' Update successfully',
          type : 'success'
        }
    case NOTIFY_CREATE_CONTEST_SUCCESSFULLY :
        return {
          isOpen : true,
          message : 'Create contest successfully',
          type : 'success'
        }
    case NOTIFY_ACTIVE_CONTEST_SUCCESSFULLY :
        return {
          isOpen : true,
          message : 'Active contest successfully',
          type : 'success'
        }
    case NOTIFY_FINISH_CONTEST_SUCCESSFULLY :
        return {
          isOpen : true,
          message : 'Finish contest successfully',
          type : 'success'
        }
    case NOTIFY_SUCCESSFULLY : 
        return {
          isOpen : true,
          message : action.payload
        }    
    default:
      return state;
  }
};
