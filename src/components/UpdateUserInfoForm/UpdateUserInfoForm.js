import React , { useState }from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@material-ui/core'
import { LoadingButton } from '@mui/lab'
import { updateUserInfo } from '../../services/account/account'
import { notifyError, notifyUpdateSucessfully } from '../../redux/actions/notifyActions'
import { useDispatch } from 'react-redux'

const UpdateUserInfoForm = props => {
    const {userID, openPopUp , setOpenPopUp,propsemail,propsphone} = props
    const [updateInfo, setUpdateInfo] = useState({
        email : propsemail,
        phone : propsphone
    })
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()


    /// update userInfo 
    const handleUpdateUserInfo = () => {
        setLoading(true)
        updateUserInfo(userID,updateInfo.email, updateInfo.phone).then(data =>{
            if(data === 200) {
                dispatch(notifyUpdateSucessfully())
            } else {
                dispatch(notifyError())
            }
            setLoading(false)
            setOpenPopUp(false)
        })
    }

    return (
        <Dialog open={openPopUp} maxWidth='true' onClose={() => setOpenPopUp(false)}
        
                    // classes={{
                    //     paper: classes.dialogWrapper,
                    //     paperScrollPaper:  classes.scrollPaper
                    // }}  
                    >
            <DialogTitle>
                <span style={{fontSize : '20px' , fontWeight:'600'}}>Update User 's information </span>
                <Divider/>
            </DialogTitle>
            <DialogContent 
            //      classes={{
            //         root  : classes.dialogWrapper
            // }}
            >
                    <div style={{
                        display:'grid',
                        gridTemplateColumns: '50px 200px',
                        alignItems : "center",
                        width : '100%'
                    }}>
                        <h5>Email : </h5> 
                        <TextField variant='outlined' size='small' value={updateInfo.email}
                                                onChange={e => setUpdateInfo({
                                                    ...updateInfo,
                                                    email : e.target.value
                                                })}
                                                />
                        <h5> Phone :</h5>
                        <TextField variant='outlined' size='small' value={updateInfo.phone} 
                                            onChange={e => setUpdateInfo({
                                                ...updateInfo,
                                                phone : e.target.value
                                            })}/>
                    </div>
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={loading} onClick={() => handleUpdateUserInfo()}> Save </LoadingButton>
                <LoadingButton onClick={()=> setOpenPopUp(false)}> Cancel </LoadingButton>
            </DialogActions>
            
        </Dialog>
    )
}



export default UpdateUserInfoForm
