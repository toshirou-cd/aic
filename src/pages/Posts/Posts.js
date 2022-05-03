import React, { useRef } from "react";
import { useEffect, useState,  useCallback } from "react";
import "./Posts.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BASE_URL from "../../utils/Url";
import PostDetail from "../../components/PostDetail/PostDetail";
import { Link, Redirect, useLocation, useParams } from "react-router-dom";
import { getAccountDetail } from "../../services/account/account";
import { getMoreRandomPost, getRandomPost } from "../../services/PostService";
import { IconButton, Input, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import  {LazyLoadImage}  from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import usePostsLoading from "../../hooks/usePostsLoading";
import InfiniteScroll from "react-infinite-scroll-component";

const Posts = (props) => {
  const [post, setPost] = useState({});
  const [hasMore, setHasMore] = useState(true)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(false)
  const [searchValue, setSearchValue] = useState("");
  const [dateBoundary, setDateBoundary] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);





  // const observer = useRef()

  // const lastPostElement = useCallback(node => {
  //   if(loading) return
  //   if(observer.current) {
  //     observer.current.disconnect() 
  //   }
  //   observer.current = new IntersectionObserver((entries) => {
  //       if(entries[0].isIntersecting && hasMore ) {
  //         setDateBoundary("2021-12-26T07:11:56.050951")
  //         console.log('visible' , node)
  //       }
  //     })
  //   if(node) observer.current.observe(node)
  // },[loading,hasMore])

  // const handleLoadMore =() => {
    
  //   getMoreRandomPost(10,30,dateBoundary).then(res => {
  //     if(res.messageCode !== 'P112') {
  //       setPosts(prevPost => {
  //         return[...new Set([...prevPost,...res.data])]
  //       })
  //       setHasMore(true)
  //     } else {
  //       console.log(' toi day roi')
  //         setLoading(false)
  //         setHasMore(false)
  //     }
  //     //// set Hasmore base on message Code
  //     setLoading(false)
  // }).catch(e =>{
  //     setError(true)
  // })
  // }

  useEffect(() => {
    setError(false)
    if(posts.length === 0 || !posts) {
      setLoading(true)
      getRandomPost(15,30).then(data => {
        setLoading(false)
        setPosts(data)
      })
    } else {
      getMoreRandomPost(10,30,dateBoundary).then(res => {
        if(res.messageCode !== 'P112') {
          setPosts(prevPost => {
            return[...new Set([...prevPost,...res.data])]
          })
          setHasMore(true)
        } else {
            setLoading(false)
            setHasMore(false)
        }
        //// set Hasmore base on message Code
        setLoading(false)
    }).catch(e =>{
        setError(true)
    })
    }
}, [dateBoundary])


  if(!posts || post.length === 0) return <div>Loading...</div>
  return (
    <div className="pageWrapper">
      {/* <form
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "500px",
            height: "50px",
            ".& Paper-root": {
              boxShadow: "none",
            },
            ".& Paper": {
              boxShadow: "none",
            },
          }}
        >
          <Input
            sx={{
              ml: 1,
              flex: 1,
              ":after": {
                borderBottom: "3px solid #FF8640",
              },
              ":before": {
                borderBottom: "none",
              },
            }}
            placeholder="Search Posts"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <IconButton type="submit" sx={{ p: "10px" }}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </form> */}
        {/* {loading && 'Loading...'}
        {error && 'Error...'} */}

        <InfiniteScroll
        dataLength={posts.length}
        next={()=> 
          {
            // console.log('date: ' + posts)
            setDateBoundary(posts.at(-1).date_create)
            // handleLoadMore(dateBoundary)
          }}
          hasMore={hasMore}
          sx={{
            overFlow:"hidden",
            width:"100%"
          }}>
        <div className="postListContainter">
        {posts &&
          posts.map((item,index) => {
            return(
              <Link to={`${props.match.url}/${item.post_id}`} key={item}>
                <div className="postItem">
                  <LazyLoadImage
                    src={`${BASE_URL.getImgFromPost}/${item.image_url}`}
                    srcSet={`${BASE_URL.getImgFromPost}/${item.image_url}`}
                    alt={item.ai_caption}
                    loading="lazy"
                    style={{
                      height: "auto",
                      border: "none",
                      borderRadius: "5px",
                      objectFit: "contain",
                    }}
                    width='210px'
                    // effect="blur"
                    />
                  <div className="postDescription">
                    <FavoriteOutlinedIcon /> {item.likecount}
                  </div>
                </div>
              </Link>
            )
          }
          )}
      </div>
        </InfiniteScroll>
    </div>
  );
};

export default Posts;
