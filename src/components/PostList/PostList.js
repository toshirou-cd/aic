import React from "react";
import { useEffect, useState } from "react";
import "./PostList.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BASE_URL from "../../utils/Url";
import PostDetailPopUp from "../PostDetailPopUp/PostDetailPopUp";
import PostDetail from "../PostDetail/PostDetail";
import { useLocation, useParams } from "react-router-dom";
import { getAccountDetail, getMorePost, getPostOfUserInContest } from "../../services/account/account";
import { getRandomPost } from "../../services/PostService";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InfiniteScroll from "react-infinite-scroll-component";

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


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      // id={`simple-tabpanel-${index}`}
      // aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const PostList = (props) => {
  const [postList, setPostList] = useState([])
  const [contestPosts,setContestPosts] = useState([])
  const [post, setPost] = useState({})
  const [openPopUp, setOpenPopUp] = useState(false);
  const [value, setValue] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [date_boundary, setDateBoundary] = useState('')
  // const [imgList, setImgList] = useState([])
  // useEffect(() => {
  //   setImgList(props.postList)
  // }, [imgList])
  const handleOpenPopup =(e,data) => {
    setPost(data)
    setOpenPopUp(true)
  }


  const {id} =useParams() 
  const location  = useLocation()
  const path = location.pathname.split('/')[2]


  // handle switch tab
  const handleChange= (event, newValue) => {
    setValue(newValue)
  }
  useEffect(() => {
    if(postList.length === 0) {
      getAccountDetail(id,8).then((data)=> {
        if(data.statusCode === 200) {
          if(data.data.posts === []) {
            setPostList([])
          } else {
            setPostList(data.data.posts)
          }
        } else {
          setPostList([])
        }
      })
    } else {
      getMorePost(id,8,date_boundary).then( (res) => {
        if(res.messageCode !== 'P112' &&  res.statusCode !== 400) {
          setPostList(prev => {
            return [...new Set([...prev,...res.data])]
          })
          setHasMore(true)
        } else {
          setHasMore(false)
        }
      }).catch(e => {
        console.log('error getting more post' + e)
      })
    }

    if(value === 1) {
      if(contestPosts.length === 0 ) {
        getPostOfUserInContest(8,id).then(res => {
          if(res.statusCode === 200) {
            if(res.data === []) {
              setContestPosts([])
            } else {
              setContestPosts(res.data)
            }
          } else {
            setContestPosts([])
          }
        })
      }
    }

  }, [openPopUp,date_boundary,value])


  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label={`Personal Posts`} 
          // {...a11yProps(0)}
           >
           </Tab>
          <Tab label={`Contest Posts`} 
          // {...a11yProps(1)} 
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {postList.length !== 0 ? 
        <InfiniteScroll
        dataLength={postList.length}
        next={() => {
          console.log('damm')
          if(postList.length !== 0) {
            setDateBoundary(postList.at(-1).date_create)
          }
        }}
        hasMore={hasMore}
      >

        <div className="postListWrapper">
       { postList.map((item) => (
         <div>
           <div className="postItem" onClick={(e) => handleOpenPopup(e,item)}>
             <img
               src={`${BASE_URL.getImgFromPost}/${item.image_url}`}
               srcSet={`${BASE_URL.getImgFromPost}/${item.image_url}`}
               alt={item.ai_caption}
               loading="lazy"
               style={{
                 width: "200px",
                 height: 'auto',
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
         </div>
       )) 
   }
       <PostDetailPopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp}>
                 <PostDetail post={post} setOpenPopUp={setOpenPopUp} isNormal={true}/>
               </PostDetailPopUp>
          
     </div>
   </InfiniteScroll> 
   :
   <div style={{color:'gray', fontWeight:'600',fontSize:'2rem'}}>This user hasn't got any post</div>
   
      }
        
      </TabPanel>
      <TabPanel value={value} index={1}>
      {contestPosts.length !== 0 ? 
      //   <InfiniteScroll
      //   dataLength={postList.length}
      //   next={() => {
      //     console.log('damm')
      //     if(contestPosts.length !== 0) {
      //       setDateBoundary(postList.at(-1).date_create)
      //     }
      //   }}
      //   hasMore={hasMore}
      // >

        <div className="postListWrapper">
       { contestPosts.map((item) => (
         <div>
           <div className="postItem" onClick={(e) => handleOpenPopup(e,item)}>
             <img
               src={`${BASE_URL.getImgFromPost}/${item.image_url}`}
               srcSet={`${BASE_URL.getImgFromPost}/${item.image_url}`}
               alt={item.ai_caption}
               loading="lazy"
               style={{
                 width: "200px",
                 height: 'auto',
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
         </div>
       )) 
   }
       <PostDetailPopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp}>
                 <PostDetail post={post} setOpenPopUp={setOpenPopUp} isNormal={true}/>
               </PostDetailPopUp>
          
     </div>
  //  </InfiniteScroll> 
   :
   <div style={{color:'gray', fontWeight:'600',fontSize:'2rem'}}>This user hasn't joined any event</div>
   
      }
      </TabPanel> 
    </div>
  ); 
};

export default PostList;
