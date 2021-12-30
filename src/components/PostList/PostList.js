import React from "react";
import { useEffect, useState } from "react";
import "./PostList.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BASE_URL from "../../utils/Url";
import PostDetailPopUp from "../PostDetailPopUp/PostDetailPopUp";
import PostDetail from "../PostDetail/PostDetail";

const obj ={
  ai_caption: "",
avata_url: null,
contest_id: null,
date_create: "",
date_update: "",
image_id: "",
image_url: "",
isLike: 0,
likecount: 0,
post_id: "",
user_caption: null,
user_id: "",
user_name: "",
}

const PostList = (props) => {
  const [post, setPost] = useState(obj)
  const [openPopUp, setOpenPopUp] = useState(false);
  // const [imgList, setImgList] = useState([])
  // useEffect(() => {
  //   setImgList(props.postList)
  // }, [imgList])
  const handleOpenPopup =(e,data) => {
    setPost(data)
    setOpenPopUp(true)
  }
  return (
    <>
      <div className="postListWrapper">
        {  props.postList.map((item) => (
          <>
            <div className="postItem" onClick={(e) => handleOpenPopup(e,item)}>
              <img
                src={`${BASE_URL.getImgFromPost}/${item.image_url}`}
                srcSet={`${BASE_URL.getImgFromPost}/${item.image_url}`}
                alt={item.ai_caption}
                loading="lazy"
                style={{
                  width: "200px",
                  height: "200px",
                  border: "none",
                  borderRadius: "5px",
                  objectFit:'contain'
                }
              
              }
              />
              <div className="postDescription">
                <FavoriteOutlinedIcon /> {item.likecount}
              </div>
            </div>
          </>
        ))}
                <PostDetailPopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp}>
                  <PostDetail post={post}/>
                </PostDetailPopUp>
      </div>
    </>
  ); 
};

export default PostList;
