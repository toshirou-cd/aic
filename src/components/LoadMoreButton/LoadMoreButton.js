import React, { useState } from "react";


const LoadMoreButton = (props) => {
  

  return (
    <LoadingButton
      loading={loading}
      color=""
      startIcon={<RefreshIcon />}
      loadingPosition="start"
      variant="text"
      onClick={() => handleOnclick()}
      className={classes.loadingButton}
      // onclick={()=> {props.loadComment()}}
    >
      Load more comments
    </LoadingButton>
  );
};

export default LoadMoreButton;
