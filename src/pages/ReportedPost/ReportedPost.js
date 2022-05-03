import { DataGrid } from "@material-ui/data-grid";
import { RemoveCircle } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, FormControl, IconButton, MenuItem, Stack, Tooltip } from "@mui/material";
import Select from '@mui/material/Select';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AddCategoryPopUp from "../../components/AddCategoryPopUp/AddCategoryPopUp";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { useCategorySearch } from "../../hooks/useCategorySearch";
import { useReportPostGet } from "../../hooks/usePostsLoading";
import { notifyError, notifySuccessfully } from "../../redux/actions/notifyActions";
import { getReportCategory, updateCategories } from "../../services/ReportedPostServices";
import { getMessageCode } from "../../utils/contanst";
import messageCode from "../../utils/messageCode";
import { convertDateTime } from "../../utils/tool";


const ReportedPost = (props) => {
  const [data, setData] = useState({ 
    loading: true,
    rowsPerPageOptions: [5, 10]
    // status : 0 ,1 ,2 ,6
  });
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [status, setStatus] = useState(0)
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('all')
  const [cate,setCate] = useState({
    searchName: "",
    page: 1,
    pageSize: 5,
    status: 0,
  })
  const [confirmDialog,setConfirmDialog] = useState({
    isOpen : false,
    title : '',
    subTitle :''
  })
  const [addCategoryPopUp,setAddCategoryPopUp] = useState({
    isOpen: false,
    type: '',
  })
  // handle change status 
  const handleSelectStatus = (e) => {
    setStatus(e.target.value)
  }

  //get categories 
  const {categoryList,cateLoading,cateTotalRow} = useCategorySearch(null,cate.page,cate.pageSize,cate.status,addCategoryPopUp,true)

  const columns = [
    {
      field: "report_id",
      headerName: "ID",
      width: 70,
      sortable : false,
      headerAlign:'center',
      align:'center',
      renderCell : params => (
        posts.map(post => post.report_id).indexOf(params.row.report_id) + 1
      )
    },
    {
      field: "user_name",
      sortable:false,
      headerName: "Reported User",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      sortable:false,
      headerAlign:'center',
      width: 150,
    },
    {
      field: "count_report",
      headerName: "Report times",
      headerAlign:'center',
      sortable : false,
      align:'center',
      width: 150,
    },
    {
      field: "date_create",
      headerName: "Date Report ",
      sortable:false,
      headerAlign:'center',
      align:'center',
      width: 170,
      renderCell : params => (
        convertDateTime(params.row.date_create)
      )
    },
    {
      field: "date_accept",
      headerName: "Date Proccess",
      headerAlign:'center',
      align:'center',
      sortable: false,
      width: 170,
      renderCell : (params) => {
        if(!params.row.date_accept) return 'null'
        return  convertDateTime(params.row.date_accept)
      }
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell : (params) => (
        getMessageCode(params.row.status)
      )
    },
    {
      field: "detail",
      headerName: "Detail",
      width: 100,
      sortable: false,
        renderCell: (params) => {
          return (
            <div>
              <Link to={`${props.match.url}/${params.row.report_id}`}>
                <button
                  className="detailButton"
                  // disabled={true}
                >
                  Detail
                </button>
              </Link>
            </div>
          );
        },
    },
  ];

  const cateColumns = [
    {
      field: "id",
      headerName: "Order",
      align:"center",
      sortable:false,
      headerAlign:'center',
      width: 100,
      renderCell: (params) =>
      categoryList.map((categories) => categories.id).indexOf(params.row.id) + 1,
    },
    {
      field: "category_name",
      headerName: "Name",
      width: 350,
    },
    {
      field:"date_create",
      headerName : "Date Create",
      sortable:false,
      width: 150,
      renderCell: params => (
        moment(params.row.date_create).format("DD-MM-yyyy")
      )
    },
    {
      field:"date_update",
      headerName : "Date Update",
      sortable:false,
      width: 150,
      renderCell: params => (
        moment(params.row.date_update).format("DD-MM-yyyy")
      )
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return getMessageCode(params.row.status);
      },
    },
    {
      field: "action",
      headerName: " ",
      width: 150,
      headerAlign: 'right',
      align: 'right',
      renderCell: (params) => {
        return (
          <div>
           
          {

              params.row.status !== 4 &&
              <>
            <Tooltip title="Remove" 
            onClick={() => 
            setConfirmDialog({
              isOpen : true,
              title :'Are you sure to remove this category ?',
              subTitle :'Your operation can not be reversed ',
              onConfirm : () => handleRemoveCate(params.row.id)
            })}
            >
            <IconButton>
              <RemoveCircle/>
            </IconButton>
            </Tooltip>
              <Tooltip title="Edit ">
                <IconButton
                // disabled={true}
                onClick={()=> setAddCategoryPopUp({
                  isOpen : true,
                  type:'update',
                  id: params.row.id
                })}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
                </>
                }
          </div>
        );
      },
    },
  ]
  const handleSelectCategory = (e) => {
    setCategoryId(e.target.value)
    setPage(1)
  }

  const {
    posts,
    loading,
    totalRow
  } = useReportPostGet(page,pageSize,status,categoryId)


  useEffect(() => {
    getReportCategory().then(data => {
      setCategories(data.data)
    })
  }, [])

  const dispatch = useDispatch()
  //handle remove cate 
  const handleRemoveCate = (id) => {
    updateCategories(id,null,4).then(res=> {
      if(res.statusCode === 200) {
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
        dispatch(notifySuccessfully("Removed Category !"))
      } else {
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
        dispatch(notifyError(messageCode(res.messageCode)))
      }
    })
  }

  return (
    <div className="contestWrapper">

    <div style={{
      height : '100%',
      display : 'flex',
      flexDirection : 'column',
      background : 'white'
    }}>
      <div className="header">
        <span style={{ fontSize:'20px', fontWeight:'700',fontSize:"20px"}}>
          Showing reported post by   
          </span>
        <Box sx={{minWidth : 100,
            marginLeft: '10px'
          }}> 
          <FormControl fullWidth>
              {/* <InputLabel id='status-id' sx={{
                '&.MuiFormLabel-root': {
                  color : 'black'
                }
              }}></InputLabel> */}
              <Select
                  value={status}
                  labelId='status-id'
                  onChange={handleSelectStatus}
                  variant="standard"
                  sx={{
                    ':before': { borderBottomColor: '#ff8640' },
                    ':after': { borderBottomColor: '#ff8640' },
                  }}
                  s
                  >
                  <MenuItem value={0}> All Status</MenuItem>
                  <MenuItem value={1}> Request</MenuItem>
                  <MenuItem value={2}> Accepted</MenuItem>
                  <MenuItem value={6}> Rejected</MenuItem>
              </Select>
          </FormControl>
        </Box>

        <Box sx={{minWidth : 150,
            marginLeft: '10px'
          }}> 
          <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label" sx={{
                '&.MuiFormLabel-root': {
                  color : 'black'
                }
              }}>Select Category</InputLabel> */}
              <Select
                  labelId="demo-simple-select-label"
                  value={categoryId}
                  label="Status"
                  onChange={handleSelectCategory}
                  variant="standard"
                  sx={{
                    ':before': { borderBottomColor: '#ff8640' },
                    ':after': { borderBottomColor: '#ff8640' },
                  }}
                  
                  >
                     <MenuItem value={'all'}> All Categories</MenuItem>
                  {categories && categories.map((data) => (
                    <MenuItem value={data.id}> {data.category_name} </MenuItem>
                  )) }
              </Select>
          </FormControl>
        </Box>
      </div>
      <div style={{
        height : '380px'
      }}>

      <DataGrid
        rowCount={totalRow}
        rows={posts}
        columns={columns}
        getRowId={(row) => row.report_id}
        pageSize={pageSize}
        rowsPerPageOptions={data.rowsPerPageOptions}
        // checkboxSelection
        pagination  
        paginationMode="server"
        page={page-1}
        onPageChange={(page) => setPage(page + 1)}
        onPageSizeChange={(size) => setPageSize(size)}
        loading={loading}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              <h3>
              No result finding reported post
              </h3>
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Local filter returns no result 
            </Stack>
          ),
          LoadingOverlay : () => {
            <Stack height="100%" alignItems="center" justifyContent="center">
            <h3>
            Loading ...
            </h3>
          </Stack>
          }
        }}
        />
        </div>
        
    </div>
    <div className="prizeContainter">
        <div className="prizeContainterHeader">
          <div style={{display:'flex',flexDirection:'row',gap:'1rem',alignItems:'center'}}>
            <span style={{fontWeight:'650',fontSize:'1.5rem'}}>
            Category list : 
              </span>
            <Box
          sx={{
            maxWidth: 100,
            minWidth: 100,
            marginLeft: "10px",
          }}
        >
          <FormControl fullWidth>
            <Select
              value={cate.status}
              label="Status"
              onChange={(e) => setCate(prev => ({...cate, status : e.target.value}))}
              variant="standard"
              sx={{
                ":before": { borderBottomColor: "#ff8640" },
                ":after": { borderBottomColor: "#ff8640" },
              }}
              s
            >
              <MenuItem value={0}> All</MenuItem>
              <MenuItem value={3}> Present</MenuItem>
              <MenuItem value={4}> Deleted</MenuItem>
             
            </Select>
          </FormControl>
        </Box>
          </div>
        <Button
          variant="outlined"
          onClick={() => setAddCategoryPopUp({ isOpen: true,type:'create'})}
        >
          <AddIcon /> Add more category
        </Button>
        </div>
        

        <DataGrid
          rowCount={cateTotalRow}
          rows={categoryList}
          columns={cateColumns}
          pageSize={cate.pageSize}
          page={cate.page - 1}
          rowsPerPageOptions={[5,10,15]}
          // checkboxSelection
          // className={style.rowSelected}
          disableSelectionOnClick={true}
          pagination
          paginationMode="server"
          onPageChange={(pages) => setCate(prev => ({ ...prev, page: pages + 1 }))}
          // onPageSizeChange={(size) => setPageSize(size)}
            onPageSizeChange={(size) => setCate(prev => ({...prev, pageSize: size }))}
          loading={cateLoading}
          components={{
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                <h3>There are no coressponding category</h3>
              </Stack>
            ),
            NoResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Local filter returns no result
              </Stack>
            ),
            LoadingOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Loading categories....
              </Stack>
            ),
            // Toolbar : () => (

            // )
          }}
        />
      </div>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <AddCategoryPopUp addCategoryPopUp={addCategoryPopUp} setAddCategoryPopUp={setAddCategoryPopUp} />
    </div>

  );
};

export default ReportedPost;
