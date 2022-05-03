import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  makeStyles, Typography
} from "@material-ui/core";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import { Input } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { notifyError, notifySuccessfully } from "../../redux/actions/notifyActions";
import { createManagerAccount, updateManagerAccount } from "../../services/admin/AccountService";
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
const ManagerPopUp = (props) => {
  const { managerPopUp , setManagerPopUp } = props;

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [cpassword, setCPassword] = useState()
  const [error, setError] = useState({
      isError : false,
      text : ""
  })
  const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
  //handle add prize 
  const handleOnClick = () => {
      setLoading(true)
      if(managerPopUp.type === 'create') {
        if(password !== cpassword || !username || !password  || !cpassword ) {
            setError({...error,isError : true}) 
            setLoading(false)
            return;
        }
        createManagerAccount(username,password).then(res => {
          if(res.statusCode === 200) {
            dispatch(notifySuccessfully("Create Account successfully"))
            setManagerPopUp({...managerPopUp, isOpen: false})
          }
          else {
            setManagerPopUp({...managerPopUp, isOpen: false})
            dispatch(notifyError(messageCode(res.messageCode)))
        }
        setManagerPopUp({...managerPopUp, isOpen: false})
      }).catch(err => {
        console.log("pop up  manager" + err)
      })
     } 
     else {
      if(password !== cpassword ||  !password  || !cpassword ) {
        setError({...error,isError : true}) 
        setLoading(false)
        return;
    }
       updateManagerAccount(managerPopUp.id,password).then( res =>{
        if(res.statusCode === 200) {
          setManagerPopUp({...managerPopUp, isOpen: false})
          dispatch(notifySuccessfully('Updated Account password !'))
          setPassword("")
    setCPassword("")
    setError({
      ...error,
      isError : false
    })
        } else {
          setManagerPopUp({...managerPopUp, isOpen: false})
          dispatch(notifyError(messageCode(res.messageCode)))
          setPassword("")
    setCPassword("")
        }
      })
    }
    
      setLoading(false)
    }
    
    
  const handleOnclose = () => {
    setManagerPopUp({
      ...managerPopUp,
      isOpen: false,
    });
    setPassword("")
    setCPassword("")
    setError({
      ...error,
      isError : false
    })
  };  

  const classes = useStyles()

  return (
    <Dialog open={managerPopUp.isOpen} onClose={handleOnclose} classes={{paper : classes.dialog}}>
      <DialogTitle>
        <Typography variant="h6" className={classes.dialogTitle}>

          {managerPopUp.type === 'create' ? <>
          <AddBoxIcon /> Create Account
          </>
           : 
           <>
           <EditIcon/> Edit Password
           </>}
        </Typography>
      </DialogTitle>
      <DialogContent>
          <div style={{display:'flex',gap:'1rem',flexDirection:'column'}}>
      {
        managerPopUp.type === 'create' &&
        <>
        <Input variant='outlined' size='small' placeholder="User name" sx={{width: "100%",border:'none',ml: 1,
                                                    flex: 1,
                                                    ":after": {
                                                      borderBottom: "3px solid #FF8640",
                                                    },
                                                    ":before": {
                                                      borderBottom: "none",
                                                    }}}
                                                    value={username}
                                                    onChange={e => setUsername(e.target.value)}
                                                    required={true} 
                                                    />
          <Divider />
        </>
      }
      
      <Input type="password" variant='standard' size='small' placeholder="Password" sx={{width: "100%",border:'none', ml: 1,
                                                    flex: 1,
                                                    ":after": {
                                                      borderBottom: "3px solid #FF8640",
                                                    },
                                                    ":before": {
                                                      borderBottom: "none",
                                                    }}}
      value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                required 
                                                />
                                                 <Divider />
      <Input type="password" variant='standard' size='small' placeholder="Confirm Password" sx={{width: "100%",border:'none', ml: 1,
                                                    flex: 1,
                                                    ":after": {
                                                      borderBottom: "3px solid #FF8640",
                                                    },
                                                    ":before": {
                                                      borderBottom: "none",
                                                    }}}
                                                value={cpassword}
                                                onChange={e => setCPassword(e.target.value)}
                                                required 
                                                error={error.isError}
                                                />
                                                {
                                                    error.isError &&
        <span style={{color:'red',font:'small-caption'}}>Confirm password must be the same as password</span>
                                                }
                                                </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" 
        onClick={() => {handleOnClick()}} 
        disabled={loading}
        >
            Save</Button>
        <Button color="secondary" onClick={handleOnclose} disabled={loading}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManagerPopUp
