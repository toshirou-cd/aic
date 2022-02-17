import React from "react";

export const convertDateTime = (dateS) => {
  const zerofill= (i) => {
    return (i < 10 ? '0' : '') + i;
  }

  const date = new Date(dateS);
  const year = date.getFullYear();
  const month = zerofill(date.getMonth()+1);
    const day = zerofill(date.getDate());
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();
  let dateTime;
  return (dateTime =
    day +
    "/" +
    month +
    "/" +
    year )
    // +
    // ", " +
    // hours +
    // ":" +
    // minutes +
    // ":" +
    // second);
};

export const handleHistory = (history) => {
  const time = parseInt(history);

  if (time < 24) return `${history.toString().split(".")[0]} hours ago`;
  if (time > 24 && time < 720) return `${parseInt(time / 24)} days ago`;
  if (time > 720 && time < 8640) return `${parseInt(time / 720)} months ago`;
};

export const handleContestActive = (active_status) => {
  if (active_status === 0 ) return 'Active'
  if (active_status === 1 ) return 'Inactive'
}

export const handleTimeLeft = (minutes) => {
  if(minutes <= 60  ) return Math.floor(minutes) + " minutes left "
  if(minutes > 60 && minutes <1440 ) return Math.floor(minutes/60) + " hours left "
  if(minutes >= 1440 && minutes <43200 ) return Math.floor(minutes/1440) + " days left "
}