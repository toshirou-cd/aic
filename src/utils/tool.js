import React from 'react'

export const convertDateTime = (dateS) => {
    const date = new Date(dateS)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hours  = date.getHours()
    const minutes = date.getMinutes()
    const second = date.getSeconds()
    let dateTime;
    return dateTime = day + '/' + month + '/' + year + ', ' + hours +':' + minutes + ':' + second
}

export const handleHistory = ( history) => {
    switch(history) {
        case history < 24 : return history.toString().split(".")[0]
        case history > 24 && history < 720 : return `${parseInt(history/24)} days ago`
        case history > 720 && history < 8640 : return `${parseInt(history/720)} months ago`
        default : return `${parseInt(history/720)} months ago`
    }
}

