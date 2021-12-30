import React,{useState,useEffect} from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./UserProfile.css";
import img from "../../asset/image/image.png";
import { Button, ButtonGroup, Icon, IconButton, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import BlockIcon from '@mui/icons-material/Block';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PostList from "../../components/PostList/PostList";
import { getAccountDetail } from "../../services/account/account";
import { useParams } from "react-router-dom";
import altAvatar from '../../asset/image/image.png'
import BASE_URL from "../../utils/Url";
import { getMessageCode } from "../../utils/contanst";
import PostDetail from '../../components/PostDetail/PostDetail'
const UserProfile = () => {
  const [user, setUser] = useState([])
  const [postList, setPostList] = useState([])
  const {id} = useParams()
  useEffect(() => {
    getAccountDetail(id,10).then((data)=> {
      setUser(data)
      setPostList(data.posts)
      console.log('data:' + user )
    })
  }, [])
  return (
    <>
    <div className="class-wrapper">
      <div className="profile-wrapper">
        <div className="showUserTop">
          <img src={
              user.avata_url === null
                  ? altAvatar
                  : `${BASE_URL.getAvatar}/${user.avata_url}`
              } className="showUserImg" />
          <span className="showUserName">{user.user_real_name}</span>
          <span className="showUserAccount">{user.user_name}</span>
          <span className="showUserDescription">
            {user.description}
          </span>
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
        <ButtonGroup sx={{
            position:'absolute',
            right: '10px',
            top: '5px'
          }}>
          <IconButton >
              <EditIcon/>
          </IconButton>

          <IconButton>
            <BlockIcon color='error'/>
          </IconButton>

          <IconButton>
            <DeleteIcon/>
          </IconButton>
            </ButtonGroup>
            <div className='showStatus'>
              {getMessageCode(user.status)}
            </div>
      </div>
      <div className="post-list-wrapper">
        <PostList postList={postList}/>
      </div>
    </div>
        
      </>
  );
};

export default UserProfile;



