import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import authService from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { useHistory } from "react-router-dom";
import {  IconButton, ListItemIcon } from "@mui/material";
import altImg from "../../asset/image/image.png";
import BASE_URL from "../../utils/Url";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Logout } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';

const ProfileMenu = () => {
  const [ElAnchor, setElAnchor] = useState(null);
  const [avatar, setAvatar] = useState(altImg);
  const open = Boolean(ElAnchor);
  const avatarName = useSelector((state) => state.AuthReducer.user.avatar);

  const handleOnclick = (e) => {
    setElAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setElAnchor(null);
  };

  const user = useSelector((state) => state.AuthReducer.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    authService.Logout();
    history.push("/login");
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOnclick}
        // startIcon={<AccountCircleIcon/>}
        disableRipple
        endIcon={<KeyboardArrowDownIcon />}
        color="primary"
        size="large"
        sx={{
          fontSize: "15px",
          fontWeight: "400",
          color: "black",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <AccountCircle style={{ width: 30, height: 30, marginRight: 1 }} />
        {/* <Avatar src={`${BASE_URL.getAvatar}/${avatarName}`} alt={} sx={{ width: 30, height: 30, marginRight:1 }}/> */}
        {user.userName}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={ElAnchor}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          My account
        </MenuItem> */}
        <MenuItem onClick={(e) => logOut(e)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
