import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import altAvatar from "../../asset/image/image.png";
import accountService from "../../services/account";
import "./Account.css";
import BASE_URL from "../../utils/Url";
import { convertDateTime } from "../../utils/tool";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { makeStyles, Typography } from "@material-ui/core";
import { getMessageCode } from "../../utils/contanst";

const useStyle = makeStyles({
  rowSelected: {
    ".MuiDataGrid-root": {
      ".MuiDataGrid-row": {
        ".Mui-selected ": {
          backgroundColor: "black",
        },
      },
    },
    title: {
      fontSize: 40,
      fontWeight: "bold",
      color: "blue",
      border: "none",
      boderRadius: "10px",
      margin: "10 0 10 0 ",
      backgroundColor: " red",
      padding: 10,
    },
  },
});

const Account = (props) => {
  // let rows = [];
  const [account, setAccount] = useState([]);
  const history = useHistory();
  const path = history.pathName;
  const style = useStyle();
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
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
                params.row.avatar_url === null
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
      width: 230,
      renderCell : (params) => {
        return (
          <>
            {convertDateTime(params.row.date_create)}
          </>
        )
      }
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {getMessageCode(params.row.status)}
          </>
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 180,
      renderCell: (params) => {
        return (
          <div>
            <Link to={`${props.match.url}/${params.row.id}`}>
            <button className="detailButton" >Detail</button>
            </Link>
            <IconButton aria-label="delete" >
              <PowerSettingsNewOutlinedIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];




  useEffect(() => {
    accountService.getAccountList(5).then((value) => {
      console.log('acct :' + value)
      return setAccount(value);
    });
    
  }, []);

  return (
    <div
      style={{
        height: 400,
        width: '100%',
        backgroundColor: "white",
        padding: "0 10 0 10",
      }}
    >
      <h3 className={style.title}>User List</h3>
      <DataGrid
        rows={account}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        className={style.rowSelected}
      />
    </div>
  );
};

export default Account;
