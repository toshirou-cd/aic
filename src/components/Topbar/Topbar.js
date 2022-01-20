import {  Button, Toolbar, Typography, typographyClasses } from "@mui/material";
import React from "react";
import { useStyle } from "../../hooks/useStyle"
import AppBar from "@mui/material/AppBar"
import ProfileMenu from "../ProfileMenu.js/ProfileMenu";

const Topbar = () => {
  const classes = useStyle();
 

  return (
    <AppBar
      sx={{
        width:`calc(100% - ${240}px)`,
        height : '3.5rem',
      }}
    //   className={classes.appbar}
      
      color="inherit"
      elevation="1"
    >
      <Toolbar className={classes.toolbar} sx={{
        display:'flex',
        alignItems: 'center',
      }}>
        <Typography className={classes.blankSpace}></Typography>
        {/* <Typography 
        className={classes.avatar}>
            Shirou
        </Typography> */}
        <ProfileMenu/>
        
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
