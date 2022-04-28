import React, { useEffect, useRef, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import altAvatar from "../../asset/image/image.png";
import accountService from "../../services/account";
import "./Account.css";
import BASE_URL from "../../utils/Url";
import { convertDateTime } from "../../utils/tool";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, IconButton, Input, Paper, Stack } from "@mui/material";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { makeStyles } from "@material-ui/core";
import { getMessageCode } from "../../utils/contanst";
import SearchIcon from '@mui/icons-material/Search';
import { searchAccount } from "../../services/account/account";
import { useAccountSearch }from "../../hooks/useAccountSearch";
import { Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";


const useStyle = makeStyles({
  rowSelected: {
    ".MuiDataGrid-root": {
      ".MuiDataGrid-row": {
        ".Mui-selected ": {
          backgroundColor: "black",
        },
      },
    },

    height: "100%",
  },
  
});

const Account = (props) => {
  // let rows = [];
  const history = useHistory();
  const path = history.pathName;
  const style = useStyle();
  const [searchName, setsearchName] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [status, setStatus] = useState(0)
  const [pageSizeOption, setPageSizeOption] = useState([5,10,15])
  const [searchInput, setSearchInput] = useState('')
  const typingTimeoutRef = useRef(null)
  const columns = [
    { field: "id", headerName: "ID", width: 100 , align:'center',headerAlign:'center',sortable:false,
    renderCell: (params) =>
    accounts.map((acct) => acct.id).indexOf(params.row.id) + 1,
    
  },
    { field: "user_name", headerName: "Account name", width: 180 },
    {
      field: "user_real_name",
      headerName: "User name",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.avata_url === null
                  ? altAvatar
                  : `${BASE_URL.getAvatar}/${params.row.avata_url}`
              }
              alt={altAvatar}
            />
            {params.row.user_real_name}
          </div>
        );
      },
    },
    {
      field: "date_create",
      headerName: "Day Create ",
      type: "dateTime",
      headerAlign:'center',
      align:'center',
      sortable:false,
      width: 230,
      renderCell: (params) => {
        return <>{convertDateTime(params.row.date_create)}</>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      headerAlign:'center',
      align:'center',
      width: 200,
      renderCell: (params) => {
        return <>{getMessageCode(params.row.status)}</>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      align:'center',
      headerAlign:'center',
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <Link to={`${props.match.url}/${params.row.id}`}>
              <button
                className="detailButton"
                // disabled={true}
              >
                Detail
              </button>
            </Link>
            {/* <IconButton aria-label="delete">
              <PowerSettingsNewOutlinedIcon />
            </IconButton> */}
          </div>
        );
      },
    },
  ];

  const {
    accounts,
    totalRow,
    loading
  } =  useAccountSearch(searchName,status,pageSize,page)


  // handle search 
  const handleSearchNameChange = (e) => {
    setSearchInput(e.target.value)
    
    if( typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setsearchName(e.target.value)
    },300)
  }


  //handle select status 
  const handleSelectStatus = (e) => {
    setStatus(e.target.value)
  }

  return (
    <div
      style={{
        // height: "100%",
        // width: "100%",
        // backgroundColor: "white",
        padding: "0 5 0 10",
        display: "flex",
        flexDirection: "column",
      }}
      className="contestWrapper"
    >
      <div className="header">
        <h3 style={{fontSize:"20px",fontWeight:"700",marginRight:".5rem"}}>Showing User List by </h3>
        <div style={{flexGrow : 99}}>
        <Box sx={{
          maxWidth : 100,
          marginLeft: '5px',
        }}> 
          <FormControl fullWidth>
              
              <Select
                  value={status}
                  label="Status"
                  onChange={handleSelectStatus}
                  variant="standard"
                  sx={{
                    ':before': { borderBottomColor: '#ff8640' },
                    ':after': { borderBottomColor: '#ff8640' },
                  }}
                  s
                  >
                  <MenuItem value={0}> All</MenuItem>
                  <MenuItem value={3}> Present</MenuItem>
                  <MenuItem value={4}> Delete</MenuItem>
                  <MenuItem value={5}> Inactivate</MenuItem>
                  <MenuItem value={9}> Blocking</MenuItem>
              </Select>
          </FormControl>
        </Box>
                    </div>
        <form >
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            '.& Paper-root' : {
              boxShadow: 'none'
            },
            '.& Paper' :{
              boxShadow: 'none'
            }
          }}
        >

          <Input
        sx={{
          ml: 1, 
          flex: 1 ,
          ':after' : {
            borderBottom : '3px solid #FF8640'
          },
          ':before' : {
            borderBottom : 'none'
          }
        }}
        placeholder="Search Accounts"
        value={searchInput}
        onChange={handleSearchNameChange}
        
        />
          <IconButton type="submit" sx={{ p: "10px" }} >
            <SearchIcon />
          </IconButton>
        </Paper>
        </form>
      </div>
      <div style={{
        height:'400px'
      }}>

      <DataGrid
      rowCount={totalRow}
      rows={accounts}
      columns={columns}
      pageSize={pageSize}
      page={page - 1}
      rowsPerPageOptions={pageSizeOption}
      // checkboxSelection 
      className={style.rowSelected}
      disableSelectionOnClick={true}
      pagination
      paginationMode="server"
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
              Loading account .... 
            </Stack>
          }
        }}
        />
        </div>
    </div>
  );
};

export default Account;
