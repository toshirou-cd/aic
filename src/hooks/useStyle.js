import React from "react";
import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

export const useStyle = makeStyles((theme) => {
  return {
    page: {
      width: '100%',
      height: '100vh',
      background: "#f9f9f9",
      padding : theme.spacing(3),
      marginTop:'50px'

    },
    drawerWidth: {
        width: drawerWidth
    },
    drawerPaper: {
        width : drawerWidth,
    },
    root: {
      display: 'flex'
    },
    listItem: {
      backgroundColor: "#f5f5f5",
    },
    logo: {
      display: "flex",
      justifyContent: "center",
      justifyItems: "center",
      padding: "10px",
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    toolbar :{
        display:'flex',
        alignItems: 'center'
    },
    // avatar: {
    //     textAlign:'right'
    // }
    blankSpace:{
        flexGrow:1
    }
  };
});
export default useStyle;
