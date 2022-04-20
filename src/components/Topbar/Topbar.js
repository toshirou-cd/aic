import {
  Avatar,
  Badge,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  typographyClasses,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useStyle } from "../../hooks/useStyle";
import AppBar from "@mui/material/AppBar";
import ProfileMenu from "../ProfileMenu.js/ProfileMenu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { getNotification } from "../../services/NotificationServices";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import moment from "moment";
import {HubConnectionBuilder} from '@microsoft/signalr'
import { useDispatch, useSelector } from "react-redux";
import { closeBadge, showNotification } from "../../redux/actions/notifyActions";

const Topbar = () => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [connection, setConnection] = useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    dispatch(closeBadge())
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const notification = useSelector(state => state.SignalrReducer)
  const auth = useSelector(state => state.AuthReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('http://13.250.109.141/signalr/hubs', {
        accessTokenFactory: () => {
            // Get and return the access token.
            // This function can return a JavaScript Promise if asynchronous
            // logic is required to retrieve the access token.
            return localStorage.getItem('token')
        }
    })
      .withAutomaticReconnect()
      .build();
    
      setConnection(newConnection)
  },[])

  useEffect(() => {
    if (connection) {
        connection.start()
            .then(result => {
                console.log('Connected!');

                connection.on('specificnotification', message => {
                  dispatch(showNotification(message.data))
                  console.log('mesage :' + message)
                });
            })
            .catch(e => console.log('Connection failed: ', e));
    }
}, [connection]);



  useEffect(() => {
    getNotification(7)
      .then((res) => {
        if (res.statusCode === 200) {
          setNotifications(res.data);
        } else {
          setNotifications(null);
        }
      })
      .catch((err) => {
        console.log("err :" + err);
      });
  }, []);

  return (
    <AppBar
      sx={{
        width: `calc(100% - ${240}px)`,
        height: "3.5rem",
      }}
      color="inherit"
      elevation="1"
    >
      {/* <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}> */}
      <Toolbar
        className={classes.toolbar}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography className={classes.blankSpace}></Typography>
        {
            (auth.user.role === "Admin") &&
            <>
            
        <Badge color="error" variant="dot" invisible={notification.badgeInvisible}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ mr: 0 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <NotificationsIcon sx={{ color: "black" }} />
          </IconButton>
        </Badge>
        
        
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              width:350,
              height : 'auto',
              overFlow: 'visible',
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {notifications ? (
            notifications.map(noti => (
              <>
              <MenuItem>
              <NotifyItem
                notify_content={noti.notify_content}
                date_create={noti.date_create}
                />
            </MenuItem>
                <Divider />
                </>
                ))
          ) : (
            <MenuItem>There is no notification yet</MenuItem>
          )}
        </Menu>
        </>
      }
        <ProfileMenu />
      </Toolbar>
      {/* </Box> */}
    </AppBar>
  );
};

const NotifyItem = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <ListItemIcon>
        <EmojiEventsIcon fontSize="medium" />
      </ListItemIcon>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "1rem", fontWeight: "550",whiteSpace:'pre-wrap' }}>
          {props.notify_content}
        </span>
        <div style={{ fontSize: "1rem" }}>
          {moment(props.date_create).fromNow()}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
