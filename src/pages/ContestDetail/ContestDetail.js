import { DataGrid } from "@material-ui/data-grid";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContestDetail, getContestUser } from "../../services/ContestService";
import "../Contest/Contest.css";
import '../Account/Account.css'
import './ContestDetail.css'
import '../../components/PostList/PostList.css'
import { convertDateTime } from "../../utils/tool";
import altAvatar from '../../asset/image/image.png'
import BASE_URL from "../../utils/Url";
import PostDetailPopUp from "../../components/PostDetailPopUp/PostDetailPopUp";
import PostDetail from "../../components/PostDetail/PostDetail";
import { getPostDetail } from "../../services/PostService";
import { useDispatch } from "react-redux";
import { notifyError } from "../../redux/actions/notifyActions";
import { Button, Chip, Tooltip } from "@material-ui/core";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

const ContestDetail = (props) => {
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const { contestId } = useParams();
  const [topPosts,setTopPosts] = useState([])
  const [data, setData] = useState({})

  const columns = [
    {
      field: "user_id",
      headerName: "ID",
      width: 100,
      renderCell : params => (
          users.map(user => user.user_id).indexOf(params.row.user_id) + 1
      )
    },
    {
        field: "user_realname",
        headerName: "User name",
        width: 300,
        renderCell: (params) => {
          return (
            <div className="userListUser">
              <img
                className="userListImg"
                src={
                  params.row.user_avatar === null
                    ? altAvatar
                    : `${BASE_URL.getAvatar}/${params.row.user_avatar}`
                }
                alt={altAvatar}
              />
              {params.row.user_realname}
            </div>
          );
        },
      },
      {
        field: "user_name",
        headerName: "Account ",
        width: 250,
        
      }, 
      
      {
        field: "date_create",
        headerName: "Day join ",
        width: 200,
        renderCell : params => (
            convertDateTime(params.row.date_create)
        )
      },
      {
        field: "post_id",
        headerName: "Post  ",
        width: 150,
        renderCell : params => (
              <button
                className="detailButton"
                disabled={loading}
                // onClick={ () => handleOnClikDetailPost(params.row.post_id)}
              >
                Detail
              </button>
        )
      }
  ];

  
  const dispatch = useDispatch()
  const handleOnClikDetailPost =(post_id) => {
      setLoading(true)
      getPostDetail(post_id,3).then(res => {
          setPost(res.data)
        }).catch((err) => {
            dispatch(notifyError())
        })
        // setOpenPopUp(true)
        console.log('click detail')
        setLoading(false)
    }
    const handleOpenPopup =(e,data) => {
      setPost(data)
      setOpenPopUp(true)
    }
    
    useEffect(() => {
      getContestUser(contestId, 50).then((res) => {
        if (res.messageCode === "CT120") {
          setUsers([]);
        } else {
            setUsers(res.data)
        }
        console.log("res :: + " + res);
      });
    }, []);

    useEffect(() => {
      getContestDetail(contestId,100).then(res =>{
        if(res.statusCode === 200) {
          setData(res.data)
          setPosts(res.data.posts)
        }
      })
    },[])

    return (
    <div className="contestWrapper">



      <div style={{position:'relative',display:'flex', gap: '10px',flexDirection:'column' }}>

        <Stack sx={{maxWidth: '100px'}}>
          <Chip label={data.contest_active === 0 ? 'Inactive' : 'Active'} color='error'/>
        </Stack>

        <div style={{position:'absolute', top:'5px', right:'5px',display:'flex', gap: '10px' }}>
        <Tooltip title='Active this contest'>
        <Button variant='contained' disabled={data.contest_active === 0 ? false : true}>Active</Button>
        </Tooltip>
        <Tooltip title='Finish this contest immediately'>
        <Button variant='contained'>Finish</Button>
        </Tooltip>
        </div>

        <div className="detailShowing">
          <div>Contest name : </div>
          <div>{data.contest_name} </div>
          <div>Desctiption : </div>
          <div>{data.description} </div>
          <div>Date create  : </div>
          <div>{convertDateTime(data.date_create)} </div>
          <div>Date end  : </div>
          <div>{convertDateTime(data.date_end)} </div>
          </div>  
        
      </div>
      <div style={{ height: "400px" }}>
        <DataGrid
              rowCount={users.length}
              rows={users}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5,10,15]}
              checkboxSelection
              getRowId={row => row.user_id}
              components={{
                NoRowsOverlay: () => (
                  <Stack height="100%" alignItems="center" justifyContent="center">
                    <h3>There is no user joining yet !</h3>
                  </Stack>
                ),
                NoResultsOverlay: () => (
                  <Stack height="100%" alignItems="center" justifyContent="center">
                    There is no user joining yet !
                  </Stack>
                ),
                LoadingOverlay: () => (
                  <Stack height="100%" alignItems="center" justifyContent="center">
                    Loading account ....
                  </Stack>
                ),
                // Toolbar : () => (
                //     <Button variant="outlined" color='primary'>
                //         Create
                //     </Button>
                // )
              }}
              />
      </div>
      <div>
      <div className="postListWrapper">
        {  posts.map((item) => (
          <>
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
          </>
        ))}
        <PostDetailPopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp}>
                  <PostDetail post={post} setOpenPopUp={setOpenPopUp}/>
                </PostDetailPopUp>

                
      </div>
        </div>
      <PostDetailPopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp}>
                  <PostDetail post={post} setOpenPopUp={setOpenPopUp}/>
        </PostDetailPopUp>
    </div>
  );
};

export default ContestDetail;
