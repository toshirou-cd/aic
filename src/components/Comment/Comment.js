import { Paper, Grid, Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import UserField from "../UserField/UserField";
import { handleHistory } from "../../utils/tool";
import "./Comment.css";
import { TextField } from "@material-ui/core";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deleteComment } from "../../services/PostService";
import { useDispatch } from "react-redux";
import { notifyDeleteSucessFully } from "../../redux/actions/notifyActions";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import moment from 'moment'


const Comment = (props) => {
  const { details, comments, setComments,setTotalComment } = props;

  const [ElAnchor, setElAnchor] = useState(null);
  const open = Boolean(ElAnchor);
  //state for confirm dialog
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    isAccept: false,
  });

  const dispatch = useDispatch();

  const handleOnclick = (e) => {
    setElAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setElAnchor(null);
  };

  const handleDeleteComment = () => {
    deleteComment(details.id).then((res) => {
      if (res === 200) {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        dispatch(notifyDeleteSucessFully());
        setComments(comments.filter(comments => comments.id !== details.id))
        setTotalComment(comments.length -1)
      }
    });
  };
  return (
    <div className="commentWrapper">
      <UserField
        image={details.avata_url}
        userName={details.user_name}
        userId={details.user_id}
      />
      <div className="deleteButton">
        <IconButton onClick={handleOnclick}>
          <MoreVertIcon />
        </IconButton>
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
          sx={{
            paddingTop: "0",
          }}
        >
          <MenuItem
            onClick={() => setConfirmDialog({
              isOpen : true,
              title : 'Are you sure to delete this comment ?',
              subTitle : 'You can not undo this operation',
              onConfirm : () => handleDeleteComment()
           })}
            sx={{
              margin: "0",
              fontSize: "12px",
              fontWeight: "450",
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
      <p className="contentWrapper">{details.content}</p>

      <div className="comentDetail">
        {/* <IconButton style={{fontSize:'12px'}}>
              <FavoriteBorderOutlinedIcon sx={{
                height:'16px',
                weight:'16px'
              }}/> 
            </IconButton> */}
        {moment(details.date_create).fromNow()}
      </div>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
};

export default Comment;
