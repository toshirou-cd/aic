import React, { useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  setOpenPopUp,
  Typography
} from "@material-ui/core";
import WarningIcon from "@mui/icons-material/Warning";
import { TextField } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { addPrize } from "../../services/ContestService";
import { useDispatch } from "react-redux";
import { notifyError, notifySuccessfully } from "../../redux/actions/notifyActions";


const useStyles = makeStyles(theme => ({
    dialog : {
        padding : theme.spacing(2),
        position : 'absolute',
        top: theme.spacing(6),
        width: "500px"
    },
    dialogTitle : {
        display : 'flex',
        alignItems : 'center',
        gap: '5px'
    }
})
)
const AddPrizePopUp = (props) => {
  const { addPrizePopUp, setAddPrizePopUp } = props;

  const [prize, setPrize] = useState()
  const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
  //handle add prize 
  const addMorePrize = () => {
      setLoading(true)
    addPrize(prize).then(res => {
        if(res.statusCode === 200) {
            dispatch(notifySuccessfully("Add prize successfully"))
            setAddPrizePopUp({...addPrizePopUp, isOpen: false})
        }
        else {
            dispatch(notifyError())
        }
        setAddPrizePopUp({...addPrizePopUp, isOpen: false})
    }).catch(err => {
        console.log("pop up add price err" + err)
    })
    setLoading(false)
  }
 

  const handleOnclose = () => {
    setAddPrizePopUp({
      ...addPrizePopUp,
      isOpen: false,
    });
  };

  const classes = useStyles()

  return (
    <Dialog open={addPrizePopUp.isOpen} onClose={handleOnclose} classes={{paper : classes.dialog}}>
      <DialogTitle>
        <Typography variant="h6" className={classes.dialogTitle}>
          <AddBoxIcon />
          Add prize
        </Typography>
      </DialogTitle>
      <DialogContent>
      <TextField variant='outlined' size='small' placeholder="Prize name" sx={{width: "100%",border:'none'}}
      value={prize}
                                                onChange={e => setPrize(e.target.value)}
                                                
                                                />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => {addMorePrize()}} disabled={loading}>Save</Button>
        <Button color="secondary" onClick={handleOnclose} disabled={loading}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPrizePopUp;
