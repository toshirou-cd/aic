import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  loadingButton: {
    height: "12px",
    width: "60%",
    ' &.MuiButtonBase-root': {
        fontSize:'12px',
        color:'grey',
        fontWeight:'600',
        margin:'10px 5px 0px 10px'
    }
  },
});

const LoadMoreButton = (props) => {
  const [loading, setLoading] = useState(false);

  const classes = useStyle();

  const handleOnclick = () => {
    setLoading(true);
  };

  return (
    <LoadingButton
      loading={loading}
      color=""
      startIcon={<RefreshIcon />}
      loadingPosition="start"
      variant="text"
      onClick={() => handleOnclick()}
      className={classes.loadingButton}
    >
      Load more comments
    </LoadingButton>
  );
};

export default LoadMoreButton;
