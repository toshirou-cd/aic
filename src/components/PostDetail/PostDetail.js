import React, { useEffect, useState } from "react";
import altImg from "../../asset/image/image.png";
import "./PostDetail.css";
import { ButtonGroup, IconButton } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BASE_URL from "../../utils/Url";
import Comment from "../Comment/Comment";
import { useHistory, useParams} from 'react-router-dom'
import ReportIcon from '@mui/icons-material/Report';
import {
  deleteComment,
  deletePost,
  getLikeAndCommentInit,
  getPageComment,
} from "../../services/PostService";
import RefreshIcon from "@mui/icons-material/Refresh";
import { makeStyles } from "@material-ui/core";
import Tooltip from '@mui/material/Tooltip';
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import {notifyDeleteSucessFully} from "../../redux/actions/notifyActions";
import { useDispatch } from "react-redux";
import moment from "moment";
import LoadingButton from "@mui/lab/LoadingButton"


const useStyle = makeStyles({
  loadingButton: {
    height: "12px",
    width: "60%",
    " &.MuiButtonBase-root": {
      fontSize: "12px",
      color: "grey",
      fontWeight: "600",
      margin: "10px 5px 20px 0px",
    },
  },
});

const PostDetail = (props) => {
  const { post , setOpenPopUp , isNormal} = props;
  
  const [comments, setComments] = useState([]);
  const [totalComment, setTotalComment] = useState(0);
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
    isAccept : false
  })

  const history = useHistory()
  

  const classes = useStyle();

  // this is for loading comment
  const handleOnclick = () => {
    setLoading(true);
    getPageComment(comments.at(-1).date_create, 2, post.post_id).then(
      (data) => {
        setTimeout(function () {
          setComments((prevState) => [...prevState, ...data.data]);
          setLoading(false);
        }, 500);
      }
    );
  };

  const dispatch = useDispatch()
  //this is for delete post
  const onDelete = () => {
    deletePost(post.post_id).then((res)=>{
      if(res === 200) {
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
        dispatch(notifyDeleteSucessFully())
        if(!setOpenPopUp) {
          history.goBack()
        } else {
          setOpenPopUp(false)
        }
      }
    })
  }
  

  useEffect(() => {
    console.log('id child : ' + JSON.stringify(post))
    if(!post.post_id ) return;

      getLikeAndCommentInit(3, post.post_id).then((data) => {
        console.log('data :' + JSON.stringify(data))
      if (data.statusCode === 200) {
        if(data.data.comments !== null) {
          setTotalComment(data.data.totalComment);
          setComments(data.data.comments);
        }
          else {
            setTotalComment(0);
            setComments([]);
          }
      } else {
        setComments([]);
      }
    });
  
  }, [totalComment,post]);

  if(!post) return <div>Loading...</div>
  return (
    <div className="classWrapper">
      <img
        src={`${BASE_URL.getImgFromPost}/${post.image_url}`}
        alt={altImg}
        className="showImg"
      />
      <div className="infoWrapper">
        <div className="detailWrapper">
          <span className="showUserName">
            <img
              className="userListImg"
              src={
                post.avata_url === null
                  ? altImg
                  : `${BASE_URL.getAvatar}/${post.avata_url}`
              }
              alt={altImg}
            />
            {post.user_name}
            <br/>
          </span>
          <span style={{
            fontWeitght : '100',
            color:'rgb(192, 192, 192)',
            fontSize : '14px',
            marginLeft:'60px',
            paddingBottom :'20px'
          }}>
            {moment(post.date_create).fromNow()}
            
          </span>
          <span className="showUserDescription">
            {post.user_caption === null ? post.ai_caption : post.user_caption}
          </span>
        </div>
        <div className="toolWrapper">
          <IconButton>
            <FavoriteBorderOutlinedIcon /> {post.likecount}
          </IconButton>
        </div>
        <div className="commentWrapper">
          Comments :
          {comments.map((data) => (
            <Comment details={data}  setComments={setComments} comments={comments} setTotalComment={setTotalComment}/>
          ))}
        </div>

         {totalComment - comments.length !== 0 && (
          <LoadingButton
            loading={loading}
            // color=""
            startIcon={<RefreshIcon />}
            loadingPosition="start"
            variant="text"
            onClick={() => handleOnclick()}
            className={classes.loadingButton}
          >
            Load more comments
          </LoadingButton>
         )} 
      </div>
      <div className="toolButton">
        {
          post.status === 4 &&
          <Tooltip title="This post is deleted ! User can not see it !">
          <IconButton>
              <ReportIcon color='warning'/>
          </IconButton>
        </Tooltip>
        }
        
        {
        isNormal &&
          <Tooltip title="Delete Post">
          <IconButton onClick={() => setConfirmDialog({
            isOpen : true,
            title : 'Are you sure to delete this post ?',
            subTitle : 'You can not undo this operation',
            onConfirm : () => onDelete()
          })} disableRipple>
               <DeleteOutlineOutlinedIcon />
               </IconButton>
               </Tooltip>
               
}
        
       
      </div>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
      
    </div>
  );
};

export default PostDetail;
