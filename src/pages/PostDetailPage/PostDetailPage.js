import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostDetail } from "../../services/PostService";
import PostDetail from "../../components/PostDetail/PostDetail";

const obj = {
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
};

  const PostDetailPage = () => {

    const { postId } = useParams();
    const [post, setPost] = useState({});
    

    useEffect(() => {
      getPostDetail(postId, 3).then((res) => {
        setPost(res.data);
      });
    }, []);
      return (
        <div style={{
          display:"flex",
          alignItems:'center',
          marginLeft:'200px'
        }}>
        <PostDetail post={post} isNormal={true}/>
      </div>
    );
  };

export default PostDetailPage;
