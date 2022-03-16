import { DataGrid } from "@material-ui/data-grid";
import { Divider, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  activeContest,
  finishContest,
  getContestDetail,
  getContestUser,
  updateContest,
  updateContestPrizes,
} from "../../services/ContestService";
import "../Contest/Contest.css";
import "../Account/Account.css";
import "./ContestDetail.css";
import "../../components/PostList/PostList.css";
import { convertDateTime, handleTimeLeft } from "../../utils/tool";
import altAvatar from "../../asset/image/image.png";
import BASE_URL from "../../utils/Url";
import PostDetailPopUp from "../../components/PostDetailPopUp/PostDetailPopUp";
import PostDetail from "../../components/PostDetail/PostDetail";
import { getPostDetail } from "../../services/PostService";
import { useDispatch } from "react-redux";
import { notifyActiveContestSuccessfully, notifyError, notifyFinishContestSuccessfully, notifySuccessfully } from "../../redux/actions/notifyActions";
import { Button, Chip, Tooltip } from "@material-ui/core";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { getMessageCode } from "../../utils/contanst";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment'
import { RemoveCircle, RemoveCircleOutline, Rtt } from "@mui/icons-material";

const ContestDetail = (props) => {
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { contestId } = useParams();
  const [topPosts, setTopPosts] = useState([]);
  const [data, setData] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    isAccept: false,
  });
  const [isEdit,setIsEdit] = useState(false)
  const columns = [
    {
      field: "user_id",
      headerName: "ID",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {users.map((user) => user.user_id).indexOf(params.row.user_id) + 1}
        </div>
      ),
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
      renderCell: (params) => convertDateTime(params.row.date_create),
    },
    {
      field: "post_id",
      headerName: "Post  ",
      width: 150,
      renderCell: (params) => (
        <button
          className="detailButton"
          disabled={loading}
          // onClick={ () => handleOnClikDetailPost(params.row.post_id)}
        >
          Detail
        </button>
      ),
    },
  ];

  const dispatch = useDispatch();


  const handleOnClikDetailPost = (post_id) => {
    setLoading(true);
    getPostDetail(post_id, 3)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        dispatch(notifyError());
      });
    // setOpenPopUp(true)
    console.log("click detail");
    setLoading(false);
  };
  ///
  const handleOpenPopup = (e, data) => {
    setPost(data);
    setOpenPopUp(true);
  };

  // handle active contest 
  const activeContestManually = () => {
    activeContest(contestId).then(res => {
      if(res.statusCode === 200 ) {
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
        dispatch(notifyActiveContestSuccessfully())
      } else {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        dispatch(notifyError());
      }
    }).catch(() => {
      dispatch(notifyError());
    })
  }
  // handle finish contest 
  const finishContestManually = () => {
    finishContest(contestId).then(res => {
      if(res.statusCode === 200 ) {
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
        dispatch(notifyFinishContestSuccessfully())
      } else {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        dispatch(notifyError());
      }
    }).catch(() => {
      dispatch(notifyError());
    })
  }

  // handle update contest 
  const handleUpdateContest = () => {
    setLoading(true)
      updateContest(contestId,data.contest_name,data.description,data.date_end).then(res => {
        if(res.statusCode === 200 ) {
          dispatch(notifySuccessfully("Update contest successfully"))
          setIsEdit(false)
        } else {
          dispatch(notifyError())
        }
      })
      
      setLoading(false)
  }

  // handle remove prize 
  const handleRemovePrize = () => {
    let tempPrize = [...data.prizes].map(({top,...prize}) => prize)

    console.log('prizes : '+ JSON.stringify(tempPrize))
    let prize = tempPrize.pop()
    updateContestPrizes(contestId,tempPrize).then(res => {
      if(res.statusCode === 200) {
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
        dispatch(notifySuccessfully("Removed prizes"))
      } else {
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
        dispatch(notifyError())
      }
    })
  }

  useEffect(() => {
    getContestUser(contestId, 50).then((res) => {
      if (res.messageCode === "CT120") {
        setUsers([]);
      } else {
        setUsers(res.data);
      }
      console.log("res :: + " + res);
    });
  }, [confirmDialog.isOpen]);

  useEffect(() => {
    getContestDetail(contestId, 100).then((res) => {
      if (res.statusCode === 200) {
        setData(res.data);
        if (res.data.posts === null) {
          setPosts(null);
        } else {
          // console.log('post :' + res.data.posts)
          setPosts(res.data.posts);
        }
      }
    });
  }, [isEdit,confirmDialog.isOpen]);

  return (
    <div className="contestWrapper">
      <div
        style={{
          position: "relative",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          paddingLeft:"2rem"
        }}
      >
        {
            <Stack sx={{ maxWidth: "200px",minWidth:'100px' }}>
          <Chip
            label={data.status === 1 ? `${handleTimeLeft(data.time_left)} to active` : data.time_left}
            color="error"
          />
        </Stack>
        }
        

        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            display: "flex",
            gap: "10px",
          }}
        >
            {
              getMessageCode(data.status) === 'Request' &&
          <Tooltip title="Active this contest">
              <Button
              variant="contained"
              // disabled={data.contest_active === 1 ? false : true}
              onClick={() => setConfirmDialog({
                isOpen: true,
                title: "Are your sure you want to active this contest immediately",
                subTitle: "Your actions will allow user start posting post !",
                onConfirm : () => activeContestManually()
              })}
              >
              Active
            </Button>
          </Tooltip>
            }
            {
              getMessageCode(data.status) === 'Present' && data.contest_active === 0 &&
              <Tooltip title="Finish this contest immediately">
            <Button variant="contained"
              onClick={() => setConfirmDialog({
                isOpen: true,
                title: "Are your sure you want to finish this contest immediately",
                subTitle: "Your actions will make user no longer posting posts !",
                onConfirm : () => finishContestManually()
              })}
              >Finish</Button>
          </Tooltip>
          
            }
        </div>
            <Divider />
        <div className="detailShowing">
        <div className="tool-button">
          {
            !isEdit  ?
            <IconButton onClick={() => setIsEdit(!isEdit)}>
                <Tooltip title="Edit Contest">
                  <EditIcon/>
                </Tooltip>
              </IconButton>
              :(
                <div style={{display:"inline-block",gap:"1rem"}}>
                <Button onClick={handleUpdateContest} size="small" color="primary" disabled={loading}>
                  Save
                  </Button>
                <Button onClick={() => setIsEdit(false)} size="small" color="secondary"  disabled={loading}>
                  Cancel
                  </Button>
                 </div>
                )
              }
          </div>
          <div>Contest name  </div>
          <div>: </div>
          <input type="text" 
            className="value"
            value={data.contest_name} 
            onChange={(e) => setData({...data,contest_name: e.target.value})} 
            disabled={!isEdit}/>
          <div>Desctiption  </div>
          <div>: </div>
          <input type="text" 
            className="value"
            value={data.description} 
            onChange={(e) => setData({...data,description: e.target.value})} 
            disabled={!isEdit}/>
          <div>Date create</div>
          <div>: </div>
          <input type="date" 
            className="value"
            value={moment(data.date_create).format('yyyy-MM-DD')} 
            disabled={true}/>
          {/* <div>{convertDateTime(data.date_create)} </div> */}
          <div>Date end  </div>
          <div>: </div>
          <input type="date" 
            className="value"
            value={moment(data.date_end).format('yyyy-MM-DD')} 
            onChange={(e) => setData({...data,date_end: e.target.value})} 
            disabled={!isEdit}/>
          <div>
            Award
          </div>
          <div>:</div>
          <div>
          {data.prizes && data.prizes.map((item,index,arr) =>(
              <div className="prize" key={item}>
                    <div>
                        Top {item.top} -
                    </div>
                    <div>
                        {item.name}
                    </div>
                    {
                      (arr.length - 1 === index) &&
                      <div style={{marginLeft : "auto"}}>
                        <Tooltip label="Remove this prize">

                      <IconButton onClick={() => setConfirmDialog({
                                        isOpen : true,
                                        title : "Are you sure you want to remove this prize ?",
                                        subTitle : "",
                                        onConfirm : () => handleRemovePrize()
                      })}
                      ><RemoveCircleOutline color="error"/>
                       </IconButton>
                      </Tooltip>
                    </div>
                    }
              </div>
                ))}
          </div>
        </div>
          {/* <Divider /> */}
         

      </div>
      <div style={{ height: "400px" }}>
        <DataGrid
          rowCount={users.length}
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
          getRowId={(row) => row.user_id}
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
        <div className="post-list-wrapper">
          <div className="topPostWrapper">
            <div className="title"><EmojiEventsIcon/> Top 3 post : </div>
            <div className="topPost">
              {
                data.top_ThreePosts && (
                  data.top_ThreePosts.map((item) => (
                    <>
                      <div
                        className="postItem"
                        onClick={(e) => handleOpenPopup(e, item)}
                        >
                        <img
                          src={`${BASE_URL.getImgFromPost}/${item.image_url}`}
                          srcSet={`${BASE_URL.getImgFromPost}/${item.image_url}`}
                          alt={item.ai_caption}
                          loading="lazy"
                          width="210px"
                          style={{
                            height: "auto",
                            border: "none",
                            borderRadius: "5px",
                            objectFit: "contain",
                          }}
                          />
                        <div className="postDescription">
                          <FavoriteOutlinedIcon /> {item.likecount}
                        </div>
                      </div>
                    </>
                  ))
                  ) 

              }
            </div>
          </div>
          <Divider /> 
          <div className="norPostWrapper">

          { 
          posts !== null ? (
            posts.map((item) => (
              <>
                <div
                  className="postItem"
                  onClick={(e) => handleOpenPopup(e, item)}
                  >
                  <img
                    src={`${BASE_URL.getImgFromPost}/${item.image_url}`}
                    srcSet={`${BASE_URL.getImgFromPost}/${item.image_url}`}
                    alt={item.ai_caption}
                    loading="lazy"
                    width="210px"
                    style={{
                      height: "auto",
                      border: "none",
                      borderRadius: "5px",
                      objectFit: "contain",
                    }}
                    
                    />
                  <div className="postDescription">
                    <FavoriteOutlinedIcon /> {item.likecount}
                  </div>
                </div>
              </>
            ))
            ) 
            : 
            <div style={{ fontWeight: "600", color: "#C0C0C0",display:'flex',justifyContent:'center' }}>
              There hasn't post here !
            </div>
                  }
          {/* <PostDetailPopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp}>
                  <PostDetail post={post} setOpenPopUp={setOpenPopUp} isNormal={true}/>
                </PostDetailPopUp> */}
                </div>
        </div>
      </div>
      <PostDetailPopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp}>
          <PostDetail post={post} setOpenPopUp={setOpenPopUp} isNormal={true} />
      </PostDetailPopUp>

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
};

export default ContestDetail;
