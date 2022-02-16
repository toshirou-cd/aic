import {
  Box,
  Button,
  FormControl,
  Input,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import { DataGrid } from "@material-ui/data-grid";
import { Stack } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import GridCellExpand from "../../components/GridCellExpand";
import useContestSearch from "../../hooks/useContestSearch";
import { getMessageCode } from "../../utils/contanst";
import { convertDateTime, handleContestActive } from "../../utils/tool";
import "./Contest.css";
import AddIcon from '@mui/icons-material/Add';
import CreateContestPopUp from "../../components/CreateContestPopUp/CreateContestPopUp";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@material-ui/core";


const Contest = (props) => {
  const history = useHistory();
  const [searchName, setsearchName] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [status, setStatus] = useState(0);
  const [pageSizeOption, setPageSizeOption] = useState([5, 10, 15]);
  const [searchInput, setSearchInput] = useState("");
  const typingTimeoutRef = useRef(null);
  const [openPopUp, setOpenPopUp] = useState(false)

  const { loading, contests, totalRow } = useContestSearch(
    searchName,
    page,
    pageSize,
    status,
    openPopUp
  );

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
  const contestColumns = [
    {
      field: "id",
      headerName: "ID",
      sortable: false,
      width: 70,
      sortable: false,
      renderCell: (params) =>
        contests.map((contest) => contest.id).indexOf(params.row.id) + 1,
    },
    {
      field: "contest_name",
      headerName: "Contest Name",
      width: 180,
      renderCell: renderCellExpand,
    },
    {
      field: "description",
      headerName: "Description",
      width: 320,
      renderCell: renderCellExpand,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      //   width: auto,
      renderCell: (params) => {
        if(params.row.status === 1) return 'Delayed'
        return getMessageCode(params.row.status);
      },
    },
    {
      field: "contest_active",
      headerName: "Active",
      sortable: false,
      //   width: auto,
      renderCell: (params) => {
        if(params.row.status === 3) {
          return handleContestActive(params.row.contest_active)
        } else {
          return (<div style={{display:'flex',justifyContent:'center','leftMargin':'5px'}}> - </div>)
        }
      },
    },
    {
      field: "date_create",
      headerName: "Start",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return convertDateTime(params.row.date_create);
      },
    },
    {
      field: "date_end",
      headerName: "End",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return convertDateTime(params.row.date_end);
      },
    },
    {
      field: "detail",
      headerName: "Detail",
      width: 120,
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
          </div>
        );
      },
    },
  ];
//   const prizeColumns =[
//       {
//           field : 'id',
//           headerName : 'ID',
//           width :'50'
//       },
//       {
//           field : 'prize_name',
//           headerName : 'Name',
//           width :'100'
//       },
//       {
//           field : 'status',
//           headerName : 'Status',
//           width :'50'
//       },
//       {
         
//           headerName : 'Action',
//           width :'50',
//           renderCell : params => (
//               <Button variant='contained'> Update</Button>
//           )
//       },
//   ]
  // handle select status
  const handleSelectStatus = (e) => {
    setStatus(e.target.value);
  };

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

  return (
    <div className="contestWrapper">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: "sans-serif",
            fontWeight: "700",
          }}
        >
          Showing contests by
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
              value={status}
              label="Status"
              onChange={handleSelectStatus}
              variant="standard"
              sx={{
                ":before": { borderBottomColor: "#ff8640" },
                ":after": { borderBottomColor: "#ff8640" },
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
        <div style={{flexGrow: 1}}>
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
        
        <Button color="primary" variant='outlined'
         sx={{
            marginLeft:'1rem'
        }}
        onClick={() => setOpenPopUp(true)}
        >
              <AddIcon /> Create
        </Button>
      </div>
      <div style={{ height: "650px" }}>
        <DataGrid
          rowCount={totalRow}
          rows={contests}
          columns={contestColumns}
          pageSize={pageSize}
          page={page - 1}
          rowsPerPageOptions={pageSizeOption}
          checkboxSelection
          // className={style.rowSelected}
          disableSelectionOnClick={true}
          pagination
          paginationMode="server"
          onPageChange={(page) => setPage(page + 1)}
          onPageSizeChange={(size) => setPageSize(size)}
          loading={loading}
          components={{
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                <h3>No result finding reported post</h3>
              </Stack>
            ),
            NoResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Local filter returns no result
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
      <div className="prizeWrapper">
          {/* <DataGrid 

          /> */}
      </div>
      <CreateContestPopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} />
    </div>
  );
};

export default Contest;
