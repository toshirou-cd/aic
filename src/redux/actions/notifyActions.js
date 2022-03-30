import { NOTIFY_DELETE_SUCCESSFULLY, CLOSE_NOTIFY,FORCE_LOG_OUT, NOTIFY_ERROR,
     NOTIFY_UPDATE_SUCCESSFULLY, 
     NOTIFY_CREATE_CONTEST_SUCCESSFULLY,
     NOTIFY_ACTIVE_CONTEST_SUCCESSFULLY,
     NOTIFY_FINISH_CONTEST_SUCCESSFULLY,
     NOTIFY_SUCCESSFULLY,
     SHOW_NOTI_FROM_SERVER,
     UNSHOW_NOTI_FROM_SERVER,
     CLOSE_BADGE} from "../../utils/types";


import React from 'react'

export const notifyDeleteSucessFully = () => {
    return {
        type : NOTIFY_DELETE_SUCCESSFULLY
    }
}
export const closeNotify = () => {
    return {
        type : CLOSE_NOTIFY
    }
}
export const forceLogoutSuccess = () => {
    return {
        type : FORCE_LOG_OUT
    }
}
export const notifyError = () => {
    return {
        type : NOTIFY_ERROR
    }
}
export const notifyUpdateSucessfully = () => {
    return {
        type : NOTIFY_UPDATE_SUCCESSFULLY
    }
}
export const notifyCreateContestSuccessfully = () => {
    return {
        type : NOTIFY_CREATE_CONTEST_SUCCESSFULLY
    }
}
export const notifyActiveContestSuccessfully = () => {
    return {
        type : NOTIFY_ACTIVE_CONTEST_SUCCESSFULLY
    }
}
export const notifyFinishContestSuccessfully = () => {
    return {
        type : NOTIFY_FINISH_CONTEST_SUCCESSFULLY
    }
}
export const notifySuccessfully = (content) => {
    return {
        type : NOTIFY_SUCCESSFULLY,
        payload : content
    }
}
export const showNotification = (content) => {
    return {
        type : SHOW_NOTI_FROM_SERVER,
        payload : content
    }
}
export const unShowNotification = () => {
    return {
        type : UNSHOW_NOTI_FROM_SERVER,
    }
}
export const closeBadge = () => {
    return {
        type : CLOSE_BADGE,
    }
}

