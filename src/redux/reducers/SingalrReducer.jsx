import { CLOSE_BADGE, SHOW_NOTI_FROM_SERVER, UNSHOW_NOTI_FROM_SERVER } from "../../utils/types";

const initialState = {
    isOpen: false,
    badgeInvisible : true,
    message: "tesst",
    type: "",
  };

  export const SignalrReducer = (state = initialState, action) => { 
      switch(action.type) {
          case SHOW_NOTI_FROM_SERVER :
            return {
                isOpen: true,
                badgeInvisible: false,
                message: action.payload,
                type: "warning",
              }
          case UNSHOW_NOTI_FROM_SERVER :
            return {
                ...state,
                isOpen: false,
              }
          case CLOSE_BADGE :
            return {
                ...state,
                badgeInvisible: true,
              }
            default:
                return state;
      }
  }