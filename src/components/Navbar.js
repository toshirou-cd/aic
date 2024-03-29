import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Login from "../pages/Login/Login";
import useStyle from "../hooks/useStyle";
import { Redirect, useLocation,Link } from 'react-router-dom';
import { NavbarData } from "./NavbarData";
import ListItemButton from "@mui/material/ListItemButton";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const classes = useStyle();
  const location = useLocation();
  const auth = useSelector(state => state.AuthReducer)
  return (
    <Drawer
      className={classes.drawerWidth  }
      classes={{ paper: classes.drawerPaper }}
      variant="permanent"
      anchor="left"
      sx={{
      '& .MuiDrawer-paper': {
        // background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
        background: 'linear-gradient(319deg, rgba(249,140,65,0.6197829473586309) 1%, rgba(250,145,55,0.8354692218684349) 34%, rgba(238,118,63,1) 56%)',
      }
    }}
      >
      <Typography
        className={classes.logo}
        variant="h5"
        sx={{
          fontWeight: "900",
          color: 'white'
        }}
        >
          {auth.user.role === 'Admin' ? 'ISMAIA Manager' : 'ISMAIA Admin'}
        
      </Typography>
      <Divider />
      <List>
        {props.items.map((data) => (
          <ListItemButton
          key={data.title}
          // onClick={() => {
          //   <Redirect to={`${props.routerPath}/${data.path}`}/>;
          //   // setIsSelected(!isSelected); 
          
          // }}
          component={Link}
          to={`${props.routerPath}/${data.path}`}
          selected={location.pathname === `${props.routerPath}/${data.path}` ? true : false}
          sx={{
            "&:hover": {
              background: 'linear-gradient(90deg, rgba(214,41,119,0.6674019949776786) 0%, rgba(228,62,65,0.7934524151457458) 47%, rgba(238,126,55,0.846673703661152) 100%);',
            },
            color: `${location.pathname === `${props.routerPath}/${data.path}` ? 'white' : 'black'}`
          }}
          >
            <ListItemIcon sx={{color: `${location.pathname === `${props.routerPath}/${data.path}` ? 'white' : 'black'}`}}>{data.icon}</ListItemIcon>
            {/* {data.title} */}
            <ListItemText primary={data.title} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Navbar;
