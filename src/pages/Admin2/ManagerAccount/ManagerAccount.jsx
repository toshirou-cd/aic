import { Button, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getManagerAccountList } from '../../../services/admin/AccountService'
import moment from 'moment'
import { DataGrid } from "@material-ui/data-grid";
import { Stack } from '@mui/material'
import { Tooltip } from 'recharts'
import { RemoveCircle } from '@mui/icons-material'
import ManagerPopUp from '../../../components/ManagerPopUp/ManagerPopUp'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


const ManagerAccount = () => {
  const [data,setData] = useState([])
  const [page,setPage] = useState(1)
  const [pageSize,setPageSize] = useState(5)
  const [q,setQ] = useState()
  const [totalrow,setTotalrow] = useState(0)

  useEffect(() => {
    getManagerAccountList(q,3,pageSize,page).then(res => {
      if(res.statusCode === 200) {
        setData(res.data)
        setTotalrow(res.total)
      } else {
        setData(null)
        setTotalrow(0)
      }
    }).catch(err => {
      console.log('something wrong getting manager account list :' + err)
    })
  },[])
  const columns =[
    {
      field: "id",
      headerName: "Order",
      sortable : false,
      width: 100,
      align:'center',
      headerAlign:'center',
      renderCell: (params) =>
      data.map((dat) => dat.id).indexOf(params.row.id) + 1,
    },
    {
      field: "user_name",
      headerName: "User Name",
      width: 400,
    },
    {
      field:"date_create",
      headerName : "Date Update",
      align:'center',
      headerAlign:'center',
      width: 350,
      renderCell: params => (
        moment(params.row.date_update).format("DD-MM-yyyy")
      )
    },
    {
      field: "action",
      headerName: "Action",
      width: 230,
      headerAlign: 'center',
      align: 'center',
      sortable:false,
      renderCell: (params) => {
        return (
                 <IconButton
                    // disabled={true}
                    onClick={()=> setManagerPopUp({
                        isOpen : true,
                        type:'update',
                        id: params.row.id
                      })}
                      size="small"
                      >
                   <EditOutlinedIcon/> 
                </IconButton>
        );
      },
    },
  ]
  const [managerPopUp,setManagerPopUp] = useState({
    isOpen:false,
    type:'create'
  })

  

  if( data === null) return (
    <div>
      Loading...
    </div>
  )

  return (
    <div className='contestWrapper'  style={{height:'80vh'}}>
        <div style={{
          height:"380px",
          display:'flex',
          flexDirection:'column',
          gap:'.5rem'
        }}>
          <div style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
          }}>
            <span style={{font:'caption',fontWeight:'600'}}>
              Showing Manager Account :
              </span>
            <Button variant='contained'     style={{
                backgroundColor: "#FA953A",
                color:'white'
    }}
            onClick={() => setManagerPopUp({
              isOpen:true,
              type: 'create'
            })}
            >Create</Button>
          </div>

          <DataGrid
          rowCount={totalrow}
          rows={data}
          columns={columns}
          pageSize={pageSize}
          page={page - 1}
          rowsPerPageOptions={[5,10,15]}
          // checkboxSelection
          // className={style.rowSelected}
          disableSelectionOnClick={true}
          pagination
          paginationMode="server"
          onPageChange={(pages) => setPage(pages + 1 )}
          // onPageSizeChange={(size) => setPageSize(size)}
            onPageSizeChange={(size) => setPageSize(size)}
          // loading={loading}
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
          }}
          />
        </div>
       <ManagerPopUp managerPopUp={managerPopUp} setManagerPopUp={setManagerPopUp} />
    </div>
  )
}

export default ManagerAccount