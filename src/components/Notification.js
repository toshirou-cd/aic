import React from 'react'
import PropTypes from 'prop-types'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useSelector, useDispatch } from 'react-redux'
import { closeNotify } from '../redux/actions/notifyActions'

const Notification = props => {
    
    const notify = useSelector((state) => state.NotifyReducer)
    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch(closeNotify())
      };

    return (
        <Snackbar
            open={notify.isOpen}
            onClose={() => handleClose()}
            autoHideDuration={1500}
            anchorOrigin={{vertical :'bottom', horizontal:'left'}}
            >
            <Alert 
            onClose={ () =>handleClose()}
            severity={notify.type}> 
                {notify.message}
            </Alert>
        </Snackbar>
    )
}


export default Notification
