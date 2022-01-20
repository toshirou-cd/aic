import { Box, FormControl, InputLabel, MenuItem} from "@mui/material";
import Select from '@mui/material/Select'
import { DataGrid } from "@material-ui/data-grid";
import { Pagination, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getReportCategory, getReportedPostList } from "../../services/ReportedPostServices";
import { DataArray } from "@mui/icons-material";
import { useReportPostGet } from "../../hooks/usePostsLoading";
import { getMessageCode } from "../../utils/contanst";
import { convertDateTime } from "../../utils/tool";

const ReportedPost = (props) => {
  const [data, setData] = useState({ 
    loading: true,
    rowsPerPageOptions: [1, 2]
    // status : 0 ,1 ,2 ,6
  });
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(1)
  const [status, setStatus] = useState(0)
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('all')



  // handle change status 
  const handleSelectStatus = (e) => {
    setStatus(e.target.value)
  }

  const columns = [
    {
      field: "report_id",
      headerName: "ID",
      width: 100,
      renderCell : params => (
        posts.map(post => post.report_id).indexOf(params.row.report_id) + 1
      )
    },
    {
      field: "user_name",
      headerName: "Reported by",
      width: 150,
    },
    {
      field: "post_id",
      headerName: "Post ID",
      width: 150,
    },
    {
      field: "count_report",
      headerName: "Report times",
      sortable : false,
      width: 150,
    },
    {
      field: "date_create",
      headerName: "Date Report ",
      width: 170,
      renderCell : params => (
        convertDateTime(params.row.date_create)
      )
    },
    {
      field: "date_accept",
      headerName: "Date Proccess",
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

  return (
    <div style={{
      height : '80%',
      display : 'flex',
      flexDirection : 'column',
      background : 'white'
    }}>
      <div className="header">
        <span style={{ fontSize:'20px', fontWeight:'500'}}>
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
                  {categories.map((data) => (
                    <MenuItem value={data.id}> {data.category_name} </MenuItem>
                  )) }
              </Select>
          </FormControl>
        </Box>
      </div>
      
      <DataGrid
        rowCount={totalRow}
        rows={posts}
        columns={columns}
        getRowId={(row) => row.report_id}
        pageSize={pageSize}
        rowsPerPageOptions={data.rowsPerPageOptions}
        checkboxSelection
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
  );
};

export default ReportedPost;
