import React, {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import authService from "../../services/auth";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { useHistory } from "react-router-dom";
import { Avatar } from "@mui/material";
import altImg from '../../asset/image/image.png'
import BASE_URL from "../../utils/Url";


const ProfileMenu = () => {
    const [ElAnchor, setElAnchor] = useState(null)
    const [avatar, setAvatar] = useState(altImg)
    const open = Boolean(ElAnchor)
    const avatarName = useSelector((state) => state.AuthReducer.user.avatar)


    const handleOnclick = (e) => {
        setElAnchor(e.currentTarget)
    }

    const handleClose = () => {
        setElAnchor(null)
    }

    const user = useSelector((state) => state.AuthReducer.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const logOut= (e) => {
      e.preventDefault()
      dispatch(logout())
      authService.Logout()
      history.push('/login')
    }

    useEffect(() => {
    }, [])

    return (
        <div>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOnclick}
        // startIcon={<AccountCircleIcon/>}
        endIcon={<KeyboardArrowDownIcon />}
        color='primary'
        size='large'
        sx={{
            fontSize : '15px',
            fontWeight : '600',
            color : '#050505'
        }

        }
      >
        <Avatar src={`${BASE_URL.getAvatar}/${avatarName}`} alt={altImg} sx={{ width: 30, height: 30, marginRight:1 }}/>
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
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={(e) => logOut(e)}>Logout</MenuItem>
      </Menu>
    </div>
    )
}

export default ProfileMenu
