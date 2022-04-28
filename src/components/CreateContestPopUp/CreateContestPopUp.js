import {
  Box, Button, Chip,
  Dialog, DialogActions, DialogContent,
  DialogTitle,
  Divider, FormControl, IconButton, makeStyles,
  MenuItem,
  Select,
  // setOpenPopUp,
  TextField
} from "@material-ui/core";
import { RemoveCircleOutline } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import {
  DateTimePicker, LocalizationProvider
} from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterMoment";
import { Stack } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { notifyCreateContestSuccessfully, notifyError } from "../../redux/actions/notifyActions";
import { createContest, getPrizesList } from "../../services/ContestService";
import messageCode from "../../utils/messageCode";
import "./CreateContestPopUp.css";

const useStyle = makeStyles({
  dialogWrapper: {
    "&:first-child": {
      paddingTop: "0",
    },
    padding: "0",
    borderRadius: "10px",
    "& .MuiPaper-root": {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  },
  scrollPaper: {
    maxHeight: "100%",
  },
  textField: {
    // display :'flex',
    // alignItems : 'center',
    minWidth: "400px",
    "& label.Mui-focused": {
      color: "#FF8640",
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: "#FF8640",
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "#FF8640",
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#FF8640",
      },
    },
  },
});

const CreateContestPopUp = (props) => {
  const { openPopUp, setOpenPopUp } = props;

  const [data, setData] = useState({
    contest_name: "",
    description: "",
    date_end: new Date(),
    delaytime_tostart: 0,
  });
  const [prizes, setPrizes] = useState([]);

  const[ awards, setAwards] =useState([
    {
      prize_id : '',
      top : 1
  }
])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    type : "",
    text : ""
  })

  const classes = useStyle();


  const handleSelectPrize =  (e) => {
      const tmpArray = [...awards]
      tmpArray[tmpArray.length-1].prize_id = e.target.value
      setAwards(tmpArray)
      
  }

  const handleAddMorePrize = () => {
    const tmpArray = [...awards, {
      top : awards.length + 1 ,
      prize_id : ''
    }]
    setAwards(tmpArray)
  }

  const handleRemovePrize = (index) => {
    let array = [...awards]
    array.pop()
    setAwards(array)
  }

  const dispatch = useDispatch()

  const onCreateContest = () => {
    setLoading(true)
    if(data.contest_name === null || data.contest_name.length === 0) {
      setError({
        type:"Empty Name",
        text: "This field is required"
      })
      setLoading(false)
      return;
    }
    if(data.description === null || data.description.length === 0) {
      setError({
        type:"Empty Description",
        text: "This field is required"
      })
      setLoading(false)
      return;
    }
    if(data.date_end === null || moment().add(1,'hours').unix() >= moment(data.date_end).unix() ) {
      setError({
        type:"Empty Time",
        text: "Please check your end time. Poll 's end time must be at least 1 hour from current time !"
      })
      setLoading(false)
      return;
    }
    if(data.delaytime_tostart=== null || data.delaytime_tostart.length === 0) {
      setError({
        type:"Empty Delay",
        text: "Please check your delay time"
      })
      setLoading(false)
      return;
    }
    if(awards[0].prize_id === null || awards[0].prize_id.length === 0) {
      setError({
        type:"Empty Prize",
        text: "Your poll need to have at least 1 prize"
      })
      setLoading(false)
      return;
    }
    createContest(data.contest_name,data.description,data.date_end,data.delaytime_tostart,awards)
    .then(res => {
      if(res.statusCode === 200) {
        dispatch(notifyCreateContestSuccessfully())
      }
      else {
        dispatch(notifyError(messageCode(res.messageCode)))
      }
    }).catch(error => {
      dispatch(notifyError("Some thing went wrong"))
    })
    // setAwards({
    //   prize_id : '',
    //   top : 1
    // })
    setLoading(false)
    setOpenPopUp(false)
  }

  useEffect(() => {
    getPrizesList('',1,10,3).then(data => {
      if(data.statusCode === 200) {
        setPrizes(data.data)
      } 
    })

  }, [openPopUp]);

  return (
    <Dialog
      open={openPopUp}
      maxWidth="false"
      onClose={() => setOpenPopUp(false)}
      classes={{
        paper: classes.dialogWrapper,
        paperScrollPaper: classes.scrollPaper,
      }}
      disableEnforceFocus
    >
      <DialogTitle>
        Create Poll
        <Divider />
      </DialogTitle>
      <DialogContent
        classes={{
          root: classes.dialogWrapper,
        }}
      >
        <div className="contestInfo">
          <TextField
         
            id="standard-basic"
            label=" Poll Name "
            hintText="Poll Name"
            variant="standard"
            className={classes.textField}
            error ={error.type === "Empty Name" && true}
            value={data.contest_name}
            onChange={(e) =>
              setData({
                ...data,
                contest_name: e.target.value,
              })
            }
            helperText={error.type === "Empty Name" && error.text}
            required
          />
          <TextField
            id="standard-basic"
            label=" Poll Description"
            variant="standard"
            className={classes.textField}
            required
            error ={ error.type === "Empty Description" ? true : false}
            helperText={error.type === "Empty Description" && error.text}
            value={data.description}
            onChange={(e) =>
              setData({
                ...data,
                description: e.target.value,
              })
            }
            multiline
            minRows={3}
            inputProps={{
              style: {marginBottom:"20px"},
            }}
            // sx={{textAlign:'left',marginTop:"10px"}}
          />
          <div style={{display:'flex',flexDirection:'column'}}>

         
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DateTimePicker
              label="Time End"
              // inputFormat="MM/dd/yyyy"
              value={data.date_end}
              onChange={(newTime) =>
                setData({
                  ...data,
                  date_end: newTime,
                })
              }
              renderInput={(params) => (
                <TextField
                  disabled
                  variant="standard"
                  className={classes.textField}
                  {...params}
                  error={error.type === "Empty Time" && true}
                  helperText={error.type === "Empty Time" && error.text }
                />
              )}
              
            />
          </LocalizationProvider>
          <span style={{fontSize:".7rem",color:'red'}}>* Poll 's end time must be at least 1 hour from current time</span>

          </div>
          {console.log(
            "date abc : " + moment(data.date_end).format("YYYY-MM-DDTHH:MM:SS")
          )}
          <TextField
            id="standard-basic"
            label=" Delay time (minutes ) "
            variant="standard"
            className={classes.textField}
            required
            value={data.delaytime_tostart}
            onChange={(e) =>
              setData({
                ...data,
                delaytime_tostart: e.target.value,
              })
            }
            error={error.type === "Empty Delay" && true}
                  helperText={error.type === "Empty Delay" && error.text}
          />
          <div style={{display:'flex',flexDirection:'column',gap:0}}>
            Prizes : 
            {error.type === "Empty Prize" && <span style={{color:'red',fontSize:'.7rem'}}>
            {error.text}
          </span>}
          </div>
          {awards.map((award,key,arr) => (
              <Stack direction='row'>
              <Chip  label={`Top ${award.top}`}/>
              <Box
                sx={{
                  maxWidth: 400,
                  minWidth: 400,
                  marginLeft: "5px",
                }}
              >
                <FormControl fullWidth>
                  <Select
                    value={awards.prize_id}
                    label="Status"
                    onChange={handleSelectPrize}
                    variant="standard"
                    sx={{
                      ":before": { borderBottomColor: "#ff8640" },
                      ":after": { borderBottomColor: "#ff8640" },
                    }}
                  >
                      {prizes.map((prize) => {
                        return (

                          <MenuItem value={prize.id} key={prize.id}> {prize.prize_name}</MenuItem>
                          )
                      })}
                  </Select>
                </FormControl>
              </Box>
          {
            (arr.length === key+1 && arr.length !== 1 ) &&
            <IconButton onClick={() => handleRemovePrize(key)}>
                  <RemoveCircleOutline style={{color:'red'}}/>
              </IconButton>
          }
              
            </Stack>
  ))} 
          <button  onClick={()=>handleAddMorePrize()}  
          style={{width:'100%',border:'1px dashed gray',cursor:'pointer',padding:'0.25rem'}}> 
         
              + Add more prizes 
          </button>
          
          {console.log('prize a:' + data.Prizes)}
          {console.log('prize b:' + JSON.stringify(awards))}
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant='contained' style={{ backgroundColor: '#FF8640' }}
                     onClick={() =>onCreateContest()} disabled={loading}> Create </Button>
        <Button onClick={() => setOpenPopUp(false)} color='error' variant="contained"> Cancel </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateContestPopUp;
