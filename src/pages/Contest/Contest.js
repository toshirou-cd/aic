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
import { usePrizeSearch } from "../../hooks/usePrizeSearch";
import { getMessageCode } from "../../utils/contanst";
import { convertDateTime, handleContestActive } from "../../utils/tool";
import "./Contest.css";
import AddIcon from "@mui/icons-material/Add";
import CreateContestPopUp from "../../components/CreateContestPopUp/CreateContestPopUp";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import AddPrizePopUp from "../../components/AddPrizePopUp/AddPrizePopUp";
import { addPrize, updatePrize ,deleteContest} from "../../services/ContestService";
import moment from 'moment'
import { RemoveCircle } from "@mui/icons-material";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { useDispatch } from "react-redux";
import { notifyError, notifySuccessfully } from "../../redux/actions/notifyActions";

const Contest = (props) => {
  const history = useHistory();
  const [searchName, setsearchName] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [status, setStatus] = useState(0);
  const [pageSizeOption, setPageSizeOption] = useState([5, 10, 15]);
  const [searchInput, setSearchInput] = useState("");
  const typingTimeoutRef = useRef(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [prize, setPrize] = useState({
    searchName: "",
    page: 1,
    pageSize: 5,
    status: 0,
  });

  const [addPrizePopUp, setAddPrizePopUp] = useState({ 
    isOpen: false ,
    type: ''
  });
  const[confirmDialog,setConfirmDialog] = useState({
    isOpen: false,
    title : '',
    subTitle : '',
  })

  const { prizes, prizeLoading, prizeTotalRow } = usePrizeSearch(
    prize.searchName,
    prize.page,
    prize.pageSize,
    prize.status,
    addPrizePopUp,
    confirmDialog.isOpen
  );

  const { loading, contests, totalRow } = useContestSearch(
    searchName,
    page,
    pageSize,
    status,
    openPopUp
  );


  useEffect(() => {}, [addPrizePopUp]);

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
        if (params.row.status === 1) return "Delayed";
        return getMessageCode(params.row.status);
      },
    },
    {
      field: "contest_active",
      headerName: "Active",
      sortable: false,
      //   width: auto,
      renderCell: (params) => {
        if (params.row.status === 3) {
          return handleContestActive(params.row.contest_active);
        } else {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                leftMargin: "5px",
              }}
            >
              {" "}
              -{" "}
            </div>
          );
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
      headerAlign: 'center',
      align:'left',
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
            <>
            {
              params.row.status !== 4 &&
            <Tooltip label="Delete this poll">
            <IconButton className="table-cell-trucate"
              onClick={() => setConfirmDialog({
                isOpen:true,
                title : "Are you sure to delete this poll ?",
                subTitle : "Your operation can not be reversed ",
                onConfirm : () => handleDeletePoll(params.row.id)
              })}
              >
              <RemoveCircle/>
            </IconButton>
            </Tooltip>
            }
            </>
          </div>
        );
      },
    },
  ];
  const prizeColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      renderCell: (params) =>
      prizes.map((prize) => prize.id).indexOf(params.row.id) + 1,
    },
    {
      field: "prize_name",
      headerName: "Name",
      width: 400,
    },
    {
      field:"date_update",
      headerName : "Date Update",
      width: 200,
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
      headerName: "Action",
      width: 230,
      headerAlign: 'center',
      align: 'right',
      renderCell: (params) => {
        return (
          <div>
           
          {

              params.row.status !== 4 &&
              <>
            <Tooltip title="Remove" onClick={() => setConfirmDialog({
              isOpen : true,
              title :'Are you sure to remove this prize ?',
              subTitle :'Your operation can not be reversed ',
              onConfirm : () => handleRemovePrize(params.row.id)
            })}>
            <IconButton>
              <RemoveCircle/>
            </IconButton>
            </Tooltip>
              <Tooltip title="Edit prize">
                <IconButton
                // disabled={true}
                onClick={()=> setAddPrizePopUp({
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
  ];
  // handle select status
  const handleSelectStatus = (e) => {
    setStatus(e.target.value);
  };

  // handle search
  const handleSearchNameChange = (e) => {
    setSearchInput(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setsearchName(e.target.value);
    }, 300);
  };

  const dispatch = useDispatch()
  //handle remove prize 
  const handleRemovePrize =(id) => {
    updatePrize(id,4,null).then(res => {
      if(res.statusCode === 200) {
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
        dispatch(notifySuccessfully("Removed Prize !"))
      } else {
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
        dispatch(notifyError())
      }
    })
  }

  // handle delete contest 
  const handleDeletePoll = (id) => {
    deleteContest(id).then(res => {
      if(res.statusCode === 200) {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })
        dispatch(notifySuccessfully("Deleted Poll"))
      } else {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })
        dispatch(notifyError())
      }
    })
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
            fontSize: "20px",
          }}
        >
          Showing Poll by
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
              <MenuItem value={1}> Request</MenuItem>
              <MenuItem value={3}> Present</MenuItem>
              <MenuItem value={4}> Delete</MenuItem>
              {/* <MenuItem value={5}> Inactivate</MenuItem>
              <MenuItem value={9}> Blocking</MenuItem> */}
            </Select>
          </FormControl>
        </Box>
        <div style={{ flexGrow: 1 }}></div>

        <form>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
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
              placeholder="Search Polls by name"
              value={searchInput}
              onChange={handleSearchNameChange}
            />
            <IconButton type="submit" sx={{ p: "10px" }}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </form>

        <Button
          color="primary"
          variant="outlined"
          sx={{
            marginLeft: "1rem",
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
                <h3>No result finding poll</h3>
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
      <div className="prizeContainter">
        <div className="prizeContainterHeader">
          <div style={{display:'flex',flexDirection:'row',gap:'1rem'}}>
            Prizes list : 
            {/* <Box
          sx={{
            maxWidth: 100,
            minWidth: 100,
            marginLeft: "10px",
          }}
        >
          <FormControl fullWidth>
            <Select
              value={prize.status}
              label="Status"
              onChange={(e) => setPrize(prev => ({...prev, status : e.target.value}))}
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
             
            </Select>
          </FormControl>
        </Box> */}
          </div>
        <Button
          variant="outlined"
          onClick={() => setAddPrizePopUp({ isOpen: true,type:'create' })}
        >
          <AddIcon /> Add more prize
        </Button>
        </div>
        

        <DataGrid
          rowCount={prizeTotalRow}
          rows={prizes}
          columns={prizeColumns}
          pageSize={prize.pageSize}
          page={prize.page - 1}
          rowsPerPageOptions={pageSizeOption}
          checkboxSelection
          // className={style.rowSelected}
          disableSelectionOnClick={true}
          pagination
          paginationMode="server"
          onPageChange={(pages) => setPrize(prev => ({ ...prize, page: pages + 1 }))}
          // onPageSizeChange={(size) => setPageSize(size)}
            onPageSizeChange={(size) => setPrize(prev => ({...prev, pageSize: size }))}
          loading={loading}
          components={{
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                <h3>There are no coressponding prizes</h3>
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

            // )
          }}
        />
      </div>
      <CreateContestPopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} />
      <AddPrizePopUp
        addPrizePopUp={addPrizePopUp}
        setAddPrizePopUp={setAddPrizePopUp}
      />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
};

export default Contest;
