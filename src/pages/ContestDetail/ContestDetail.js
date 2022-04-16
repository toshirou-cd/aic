import { DataGrid } from "@material-ui/data-grid";
import { Divider, IconButton, Stack } from "@mui/material"
import PropTypes from "prop-types";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  activeContest,
  finishContest,
  getContestDetail,
  getContestUser,
  getPageContestPost,
  setAwardforUserInContest,
  updateContest,
  updateContestPrizes,
  updateStatusPost,
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
import { Button, Chip, Tooltip,MenuItem ,  Box, FormControl} from "@material-ui/core";
import {Select } from '@mui/material'
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { getMessageCode } from "../../utils/contanst";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment'
import { RemoveCircle, RemoveCircleOutline, Rtt } from "@mui/icons-material";
import { usePrizeSearch } from "../../hooks/usePrizeSearch";
import CheckIcon from '@mui/icons-material/Check';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import GridCellExpand from "../../components/GridCellExpand";

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
  const [updatePrize, setUpdatePrize] = useState(false)
  const [addPrize, setAddPrize] = useState(false)
  const [prize, setPrize] = useState({
    top: '',
    prize_id:''
  })
  const [page,setPage] = useState(1)
  const [pageSize,setPageSize] = useState(5)
  const [status, setStatus] = useState(1);
  const [pageSizeOption, setPageSizeOption] = useState([5, 10, 15]);
  const [flag, setFlag] = useState(0);
  const [pagePosts, setPagePosts] = useState([]);
  const [totalPagePosts, setTotalPagePosts] = useState(0);
  const [top, setTop] = useState([]);
  const [isSetAward,setIsSetAward ] = useState(false);
  renderCellExpand.propTypes = {
    /**
     * The column of the row that the current cell belongs to.
     */
    colDef: PropTypes.object.isRequired,
    /**
     * The cell value, but if the column has valueGetter, use getValue.
     */
    value: PropTypes.string.isRequired,
  };

  function renderCellExpand(params) {
    return (
      <GridCellExpand
        value={params.value || ""}
        width={params.colDef.computedWidth}
      />
    );
  }
  const columns = [
  {
      field: "post_id",
      headerName: "ID",
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {pagePosts.map((post) => post.post_id).indexOf(params.row.post_id) + 1}
        </div>
      ),
    },
    {
      field: "image_url",
      headerName: "Post",
      width: 150,
      renderCell: (params) => {
        return (
            <img
              style={{
                width:'100px',
                height:'100px',
                objectFit:'contain',
                borderRadius:'.25rem'
              }}
              src={
                params.row.image_url === null
                  ? altAvatar
                  : `${BASE_URL.getImgFromPost}/${params.row.image_url}`
              }
              alt={altAvatar}
            />
        );
      },
    },
    {
      field: "user_caption",
      headerName: "Post caption ",
      sortable:false,
      width: 250,
      renderCell : renderCellExpand
    },
    {
      field: "likecount",
      headerName: "Likes",
      sortable: false,
      align:"center",
      width: 100,
      renderCell : params => (
        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
          {params.row.likecount}
        </div>
      )
    },

    {
      field: "user_name",
      headerName: "Post by",
      width: 230,
      renderCell: (params) => {
        return (
          <div style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            gap:'0.5rem'
          }}>
            <img
              style={{
                width:'40px',
                height:'40px',
                objectFit:'cover',
                borderRadius:'50%'
              }}
              src={
                params.row.avata_url === null
                  ? altAvatar
                  : `${BASE_URL.getAvatar}/${params.row.avata_url}`
              }
              alt={altAvatar}
            />
            <h4>
              {params.row.user_name }
              </h4>
          </div>
        )
      },
    },
    {
      field: "date_create",
      headerName: "Date post",
      width: 150,
      renderCell: (params) => (
      <>
        {moment(params.row.date_create).format('YYYY-MM-DD  ')}
      </>
      ),
    },
    {
      field: "action",
      headerName: "",
      sortable:false,
      // width: 'auto',
      renderCell: (params) => {
        switch(status) {
          case 1 : 
          return (
            <>
        <IconButton 
          onClick={() => setConfirmDialog({
            isOpen:true,
            title: 'Are you sure you want to accept this post ?',
            subTitle : 'After accept, this post will be present on this poll ',
            onConfirm : () => handleUpdatePostStatus(params.row.post_id,3)
          })}
          >
          <CheckIcon sx={{color:'blue'}}/>
        </IconButton>
        <IconButton
          onClick={() => setConfirmDialog({
            isOpen:true,
            title: 'Are you sure you want to accept this post ?',
            subTitle : 'After accept, this post will be present on this contest ',
            onConfirm : () => handleUpdatePostStatus(params.row.post_id,6)
          })}
        >
          <RemoveCircleOutlineIcon sx={{color:'red'}}/>
        </IconButton>
        </> 
          )
          case 3 : 
          return (
          isSetAward &&
          <Button onClick={(prev) => setTop([...top,{
            level : top.length +1,
            post_id: params.row.post_id
          }])}
            disabled={top.map(val => val.post_id).includes(params.row.post_id)}
          > Top { top.map(val => val.post_id).includes(params.row.post_id) ?top.findIndex(val => val.post_id === params.row.post_id)+1 : top.length+1}</Button>
          )
          default :
          return null
        }
      },
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
        dispatch(notifySuccessfully("Active poll successfully !"))
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
        dispatch(notifySuccessfully("Finished Poll !"))
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
    let tempPrize = [...data.prizes].map(({name,...prize}) => prize)

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
  // handle add prize 
  const handleAddPrize = () => {
    let tempPrize = [...data.prizes].map(({name,...prize}) => prize)

    console.log('prizes : '+ JSON.stringify(tempPrize))
    let newArr = [...tempPrize,prize]
    updateContestPrizes(contestId,newArr).then(res => {
      if(res.statusCode === 200) {
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
        dispatch(notifySuccessfully("Added prize"))
      } else {
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
        dispatch(notifyError())
      }
    })
    setAddPrize(false)
  }

  // handle update post status 
  const handleUpdatePostStatus = (id,status) => {
    updateStatusPost(id,status).then(res =>{
      if(res.statusCode === 200) {
        dispatch(notifySuccessfully('Accepted Post !'))
        setConfirmDialog({
          ...confirmDialog,
          isOpen:false
        })
      } else {
        dispatch(notifyError())
      }
    })
  }
  // handle set prize 
  const handleSetPrize = () => {
    setAwardforUserInContest(contestId,top).then(res =>{
      if(res.statusCode === 200) {
        dispatch(notifySuccessfully('Set prize successfully !'))
        setConfirmDialog({
          ...confirmDialog,
          isOpen:false
        })
      } else {
        dispatch(notifyError())
      }
    })
  }

  useEffect(() => {
    getPageContestPost(null,page,pageSize ,status,contestId, flag).then((res) => {
      if (res.statusCode  === 200) {
        setPagePosts(res.data);
        setTotalPagePosts(res.total)
      } else {
        setPagePosts([]);
        setTotalPagePosts(0)
      }
      console.log("res :: + " + res);
    });
  }, [status,flag,confirmDialog.isOpen]);

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
  }, [isEdit,confirmDialog.isOpen,addPrize,setUpdatePrize]);

  const {prizes} = usePrizeSearch(null,1,10,3)

  return (
    <div className="contestWrapper">
      <div
        style={{
          position: "relative",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          paddingLeft:"2rem",
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
            ((getMessageCode(data.status) === 'Present' && data.contest_active === 0) ||
            getMessageCode(data.status) === 'Request')  &&
            <>
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
            </>
          }
          
          </div>
          <div>Poll  name  </div>
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
          <div style={{position:'relative'}}>
          {data.prizes && data.prizes.map((item,index,arr) =>(
              <div className="prize" key={item}>
                    <div>
                        Top {item.top} -
                    </div>
                    <div>
                        {item.name}
                    </div>
                    {
                      (arr.length === index+1 && arr.length !== 1 && updatePrize) &&
                      <div style={{marginLeft:'auto'}}>
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
                  
                  <div style={{position:'absolute',top:0,right:0}}>
                    <>{
                      ((getMessageCode(data.status) === 'Present' && data.contest_active === 0) 
                      || getMessageCode(data.status) === 'Request') &&
                      <>
                      {
                         !updatePrize ?
                         (

                           <Tooltip label="Edit prize">
                       <IconButton
                           onClick={() => setUpdatePrize(!updatePrize)}
                           >
                         <EditIcon />
                       </IconButton>
                       </Tooltip>
                             )
                        : 
                        <>
                          <Button>Save</Button>
                          <Button onClick={() => setUpdatePrize(false)}>Cancel</Button>
                        </>
                      }
                      </>
                    }</>
                         
                        </div>
                {
                  ((getMessageCode(data.status) === 'Present' && data.contest_active === 0) ||
                  getMessageCode(data.status) === 'Request')  &&
                  <>
                  {

                    addPrize === false ?
                    <button style={{width:'100%',border:'1px dashed gray',cursor:'pointer',padding:'0.25rem'}}
                    onClick={() => setAddPrize(!addPrize)}
                    >
                             + Add more prize
                        </button>
                  :
                  (
                    <div  className="prize">
                        <div>
                        Top {data.prizes.length + 1} -
                    </div>
                    <Box
          sx={{
            maxWidth: 300,
            minWidth: 300,
            marginLeft: "10px",
            
          }}
          >
          <FormControl fullWidth>
            <Select
              value={prize.id}
              label="Status"
              onChange={(e) => {
                setPrize({
                  top: data.prizes.length + 1,
                  prize_id : e.target.value
                })
              }}
              variant="standard"
              sx={{
                ":before": { borderBottomColor: "#ff8640" },
                ":after": { borderBottomColor: "#ff8640" },
              }}  
              fullWidth
              >
                {
                  prizes.map((val) => (
                    <MenuItem value={val.id} fullWidth> {val.prize_name}</MenuItem>
                    ))}
              {/* <MenuItem value={5}> Inactivate</MenuItem>
              <MenuItem value={9}> Blocking</MenuItem> */}
            </Select>
          </FormControl>
        </Box>
        <Button onClick={() =>handleAddPrize()}>Save</Button>
        <Button onClick={() => setAddPrize(false)}>Cancel</Button>
                    </div>
                  )
                }
              </>
                }
          </div>
        </div>
          {/* <Divider /> */}
         

      </div>
      <div style={{ height: "400px" ,width: 'auto',display:'flex',flexDirection:'column',gap:'1rem'}}>
        <div style={{display:'flex',flexDirection:'row', gap:'.5rem',alignItems:'center',position:'relative'}}>

      <span
          style={{
            fontFamily: "sans-serif",
            fontWeight: "700",
            fontSize : "20px"
          }}
        >
          Showing posts by
        </span>
        <Box
          sx={{
            maxWidth: 100,
            minWidth: 100,
            marginLeft: "10px",
            display:'flex',
            justifyContent:'center'
          }}
          >
          <FormControl fullWidth>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
              variant="standard"
              sx={{
                ":before": { borderBottomColor: "#ff8640" },
                ":after": { borderBottomColor: "#ff8640" },
                justifyContent:'center'
              }}
              disabled={flag === 1}
            >
              <MenuItem value={1}> Request</MenuItem>
              <MenuItem value={3}> Present</MenuItem>
              <MenuItem value={6}> Reject</MenuItem>
              {/* <MenuItem value={5}> Inactivate</MenuItem>
              <MenuItem value={9}> Blocking</MenuItem> */}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{

            marginLeft: "10px",
            display:'flex',
            justifyContent:'center'
          }}
          >
          <FormControl fullWidth>
            <Select
              value={flag}
              label="Status"
              onChange={(e) => {setFlag(e.target.value)
                                 e.target.value === 1 && setStatus(3) 
              }}
              variant="standard"
              sx={{
                ":before": { borderBottomColor: "#ff8640" },
                ":after": { borderBottomColor: "#ff8640" },
                justifyContent:'center'
              }}
            >
              <MenuItem value={0}> Date create</MenuItem>
              <MenuItem value={1}> Like descending</MenuItem>
              {/* <MenuItem value={5}> Inactivate</MenuItem>
              <MenuItem value={9}> Blocking</MenuItem> */}
            </Select>
          </FormControl>
        </Box>
        <div style={{position:'absolute',top:0, right:'0.5rem'}}>
            { (data.isPrized === 0  && data.contest_active === 1) &&
              <>
              {
              !isSetAward ?
              <Button variant="contained" sx={{color:'yellow'}} size='small' onClick={() => setIsSetAward(true)}>Set Prize</Button>
          : 
          <>
            <Button
              onClick={() => setConfirmDialog({
                isOpen : true,
                title: 'Are you sure with these prizes ?',
                subTitle: '',
                onConfirm : () => handleSetPrize()
              })}
            >Save</Button>
            <Button onClick={() => {setIsSetAward(false)
                                    setTop([])
          }

          }>Cancel</Button>
          </>
}
          </>
          }
        </div>
        
        </div>
        <DataGrid
          rowCount={totalPagePosts}
          rows={pagePosts}
          columns={columns}
          page={page - 1}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
          // className={style.rowSelected}
          disableSelectionOnClick={true}
          pagination
          paginationMode="server"
          onPageChange={(page) => setPage(page + 1)}
          onPageSizeChange={(size) => setPageSize(size)}
          getRowId={(row) => row.post_id}
          rowHeight={100}
          disableColumnMenu
          components={{
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                <h3>There is no post  !</h3>
              </Stack>
            ),
            NoResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                There is no post !
              </Stack>
            ),
            LoadingOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Loading Posts....
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
            <div className="title"><EmojiEventsIcon/> Top post get prize : </div>
            <div className="topPost">
              {
                (data.top_ThreePosts && data.isPrized === 1 ) ? (
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
                : (
                  <div style={{ fontWeight: "600", color: "#C0C0C0",display:'flex',justifyContent:'center' }}>
                  There are no post getting prize  !
                </div>
                )
              }
            </div>
          </div>
          <Divider /> 
          <div className="norPostWrapper">

          {/* { 
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
                  } */}
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
