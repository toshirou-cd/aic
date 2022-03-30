import { Alert, Slide, Snackbar } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeNotify, unShowNotification } from '../redux/actions/notifyActions';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

const NotiSnackbar = () => {

    const notification = useSelector((state) => state.SignalrReducer)
    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch(unShowNotification())
      };
  return (
    <Snackbar
        open={notification.isOpen}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        // message="I love snacks"
        // key={state.Transition.name}
        anchorOrigin={{vertical :'bottom', horizontal:'right'}}
        autoHideDuration={6000}
      >
          <Alert severity='warning' onClose={() => handleClose()} sx={{width:"100%"}}> 
                {notification.message}
          </Alert>

      </Snackbar>
  )
}

export default NotiSnackbar