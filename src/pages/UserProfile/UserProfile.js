import { Tooltip } from "@material-ui/core";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  ButtonGroup, IconButton
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import altAvatar from "../../asset/image/image.png";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import PostList from "../../components/PostList/PostList";
import UpdateUserInfoForm from "../../components/UpdateUserInfoForm/UpdateUserInfoForm";
import {
  forceLogoutSuccess,
  notifyDeleteSucessFully,
  notifyError,
  notifyUpdateSucessfully
} from "../../redux/actions/notifyActions";
import {
  deleteAccount,
  forceLogout,
  getAccountDetail,
  updateAccount
} from "../../services/account/account";
import { getMessageCode } from "../../utils/contanst";
import messageCode from "../../utils/messageCode";
import BASE_URL from "../../utils/Url";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const [postList, setPostList] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    isAccept: false,
  });
  const [openPopUp, setOpenPopUp] = useState(false);

  const forceUserLogout = () => {
    forceLogout(user.id).then((res) => {
      if (res.statusCode === 200) {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })
        dispatch(forceLogoutSuccess());
      } else {
        dispatch(notifyError(messageCode(res.messageCode)));
      }
    });
  };

  // delete account
  const handleDeleteAccount = () => {
    deleteAccount(id).then((res) => {
      if (res.statusCode === 200) {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        dispatch(notifyDeleteSucessFully());
      } else {
        console.log("toi day roi na ok chua");
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        dispatch(notifyError(messageCode(res.messageCode)));
      }
    });
  };

  // update account
  const handleUpdateAccount = () => {
    updateAccount(id, 3).then((res) => {
      if (res.statusCode === 200) {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        dispatch(notifyUpdateSucessfully());
      } else {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        dispatch(notifyError(messageCode(res.messageCode)));
      }
    });
  };

  useEffect(() => {
    getAccountDetail(id, 20).then((data) => {
      if(data.statusCode === 200 ) {
        setUser(data.data);
      }
      // setPostList(data.posts)
    });
  }, [confirmDialog.isAccept, openPopUp]);
  return (
    <>
      <div className="class-wrapper">
        <div className="profile-wrapper">
          <div className="showUserTop">
            <img
              src={
                user.avata_url === null
                  ? altAvatar
                  : `${BASE_URL.getAvatar}/${user.avata_url}`
              }
              className="showUserImg"
            />
            <span className="showUserName">{user.user_real_name}</span>
            <span className="showUserAccount">{user.user_name}</span>
            <span className="showUserDescription">{user.description}</span>
          </div>
          <div className="showPostAndFollow">
            <span> {user.number_ofpost} Posts </span>
            <span> {user.number_follower} Followers</span>
            <span> Following {user.number_followee}</span>
          </div>
          <div className="showUserInfo">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <EmailIcon
                sx={{
                  fontSize: "20px",
                }}
              />
              <span>{user.user_email}</span>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <PhoneIcon
                sx={{
                  fontSize: "20px",
                }}
              />
              <span>{user.phone}</span>
            </div>
          </div>
          <ButtonGroup
            sx={{
              position: "absolute",
              right: "10px",
              top: "5px",
            }}
          >
            {/* <Tooltip title="Edit email">
              <IconButton onClick={() => setOpenPopUp(true)}>
                <EditIcon />
              </IconButton>
            </Tooltip> */}

            <Tooltip title="Force log out">
              <IconButton onClick={() => setConfirmDialog({
                isOpen:true,
                title :'Are you sure you want to force this account to log out ?',
                subTitle : 'Your action will log this user out from the system immediately ',
                onConfirm : () => forceUserLogout()
              })
                }>
                <LogoutIcon />
              </IconButton>
            </Tooltip>

            {user.status === 9 ? (
              <Tooltip title="Unblock this account">
                <IconButton
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: "Are you sure you want to  unblock this account ?",
                      subTitle: "Your operation can not reversed ",
                      onConfirm: () => handleUpdateAccount(),
                    });
                  }}
                >
                  <LockIcon color="error" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Block this account">
                <IconButton
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: "Are you sure you want to block this account ?",
                      subTitle: "Your operation can not reverse ",
                      onConfirm: () => handleDeleteAccount(),
                    });
                  }}
                >
                  <LockIcon color="error" />
                </IconButton>
              </Tooltip>
            )}
          </ButtonGroup>
          <div className="showStatus">{getMessageCode(user.status)}</div>
        </div>
        <div className="post-list-wrapper">
          <PostList />
        </div>
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <UpdateUserInfoForm
        userID={id}
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
        propsemail={user.user_email}
        propsphone={user.phone}
      />
    </>
  );
};

export default UserProfile;
