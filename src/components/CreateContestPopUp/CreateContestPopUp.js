import React, { useEffect, useState } from "react";
import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  makeStyles,
  MenuItem,
  Select,
  setOpenPopUp,
  TextField,
  Box,
  FormControl,
  Button,
  IconButton,
  DialogActions
} from "@material-ui/core";
import "./CreateContestPopUp.css";
import {
  DateTimePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterMoment";
import moment from "moment";
import { Stack } from "@mui/material";
import {  createContest, getPrizesList} from "../../services/ContestService";
import { getPostDetail } from "../../services/PostService";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { notifyCreateContestSuccessfully, notifyError } from "../../redux/actions/notifyActions";

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
    delaytime_tostart: "",
  });
  const [prizes, setPrizes] = useState([]);

  const[ awards, setAwards] =useState([
    {
      prize_id : '',
      top : 1
  }
])
  const [loading, setLoading] = useState(false)

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

  const handleRemovePrize = (id) => {
    const tmpArray = awards.filter(x => x.id !== id  )
      setAwards(tmpArray)
  }

  const dispatch = useDispatch()

  const onCreateContest = () => {
    setLoading(true)
    createContest(data.contest_name,data.description,data.date_end,data.delaytime_tostart,awards)
    .then(res => {
      if(res.statusCode === 200) {
        dispatch(notifyCreateContestSuccessfully())
      }
      else {
        dispatch(notifyError())
      }
    }).catch(error => {
      dispatch(notifyError())
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
        Create Contest
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
            label=" Contest Name "
            variant="standard"
            className={classes.textField}
            required
            value={data.contest_name}
            onChange={(e) =>
              setData({
                ...data,
                contest_name: e.target.value,
              })
            }
          />
          <TextField
            id="standard-basic"
            label=" Contest Description "
            variant="standard"
            className={classes.textField}
            required
            value={data.description}
            onChange={(e) =>
              setData({
                ...data,
                description: e.target.value,
              })
            }
          />
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
                />
              )}
            />
          </LocalizationProvider>
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
          />
          Prizes :
          {awards.map((award,key) => (
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

              <IconButton onClick={handleRemovePrize}>
                  <CloseIcon />
              </IconButton>
            </Stack>
  ))} 
          <Button variant="outlined" color='primary' onClick={handleAddMorePrize}>
              <AddIcon /> add more prizes 
          </Button>
          
          {console.log('prize a:' + data.Prizes)}
          {console.log('prize b:' + JSON.stringify(awards))}
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant='contained' style={{ backgroundColor: '#FF8640' }}
                     onClick={onCreateContest} disabled={loading}> Create </Button>
        <Button onClick={() => setOpenPopUp(false)} color='error' variant="contained"> Cancel </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateContestPopUp;
