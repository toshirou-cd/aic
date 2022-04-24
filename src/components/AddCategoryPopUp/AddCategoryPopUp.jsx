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
import EditIcon from '@mui/icons-material/Edit';
import { addPrize, updatePrize } from "../../services/ContestService";
import { useDispatch } from "react-redux";
import { notifyError, notifySuccessfully } from "../../redux/actions/notifyActions";
import { addCategories, updateCategories } from "../../services/ReportedPostServices";
import messageCode from "../../utils/messageCode";


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
const AddCategoryPopUp = (props) => {
  const { addCategoryPopUp , setAddCategoryPopUp } = props;

  const [category, setCategory] = useState()
  const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
  //handle add prize 
  const addMoreCategory = () => {
      setLoading(true)
      addCategoryPopUp.type === 'create' ? (

        addCategories(category).then(res => {
          if(res.statusCode === 200) {
            dispatch(notifySuccessfully("Add category successfully"))
            setAddCategoryPopUp({...addCategoryPopUp, isOpen: false})
            setCategory("")
          }
          else {
            dispatch(notifyError(messageCode(res.messageCode)))
        }
        setAddCategoryPopUp({...addCategoryPopUp, isOpen: false})
        
      }).catch(err => {
        console.log("pop up add category err" + err)
      })
       ) : (
      updateCategories(addCategoryPopUp.id,category,0).then(res =>{
        if(res.statusCode === 200) {
          setAddCategoryPopUp({...addCategoryPopUp, isOpen: false})
          dispatch(notifySuccessfully('Updated Category successfully'))
          setCategory("")
        } else {
          setAddCategoryPopUp({...addCategoryPopUp, isOpen: false})
          dispatch(notifyError(messageCode(res.messageCode)))
        }
      })
       )
      setLoading(false)
    }
    
    
  const handleOnclose = () => {
    setAddCategoryPopUp({
      ...addCategoryPopUp,
      isOpen: false,
    });
  };

  const classes = useStyles()

  return (
    <Dialog open={addCategoryPopUp.isOpen} onClose={handleOnclose} classes={{paper : classes.dialog}}>
      <DialogTitle>
        <Typography variant="h6" className={classes.dialogTitle}>

          {addCategoryPopUp.type === 'create' ? <>
          <AddBoxIcon /> Add Category
          </>
           : 
           <>
           <EditIcon/> Edit Category
           </>}
        </Typography>
      </DialogTitle>
      <DialogContent>
      <TextField variant='outlined' size='small' placeholder="Category name" sx={{width: "100%",border:'none'}}
      value={category}
                                                onChange={e => setCategory(e.target.value)}
                                                
                                                />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => {addMoreCategory()}} disabled={loading}>Save</Button>
        <Button color="secondary" onClick={handleOnclose} disabled={loading}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryPopUp;
