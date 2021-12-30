import React, { useEffect, useState } from "react";
import altImg from "../../asset/image/image.png";
import "./PostDetail.css";
import { ButtonGroup, IconButton } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BASE_URL from "../../utils/Url";
import Comment from "../Comment/Comment";
import { getLikeAndCommentInit } from "../../services/PostService";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
const PostDetail = (props) => {
  const { post } = props;
  const [comments, setComments] = useState([])
  const [like, setLike] = useState(props.likecount)

  useEffect(() => {
    getLikeAndCommentInit(3,post.post_id).then((data) => {
      // console.log('comments :' + data.comments)
      data.comments !== null ?
      setComments(data.comments) :  setComments([])
    })
    }, [])
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
              <Comment details={data}/>
            ))}
          </div>
      <LoadMoreButton/>
      </div>
      <div className="toolButton">
        <ButtonGroup>
          <IconButton>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default PostDetail;
