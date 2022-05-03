import { Button, FormControlLabel, Switch } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import { notifyError, notifySuccessfully } from '../../redux/actions/notifyActions'
import {changeAIStatus, getAIStatus} from '../../services/admin/AccountService'
import messageCode from '../../utils/messageCode'

const Setting = () => {
    const [swich, setSwich] = useState(() => {
        getAIStatus().then(res => {
            if(res.statusCode === 200) {
                if(res.data === 1) {
                    return true 
                } else {
                    return false
                }
            }
        }).catch(err => {
            console.log('getting ai stats err : ' + err)
        })})

    const [disabled, setDisabled] = useState(true)
    const [change, setChange] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen : false,
        title : "",
        subTitle : ""
    })

    useEffect(() => {
        getAIStatus().then(res => {
            if(res.statusCode === 200) {
                setSwich(res.data === 1 ? true : false)
                console.log("aasdfa + " + res.data)
            }
        }).catch(err => {
            console.log('getting ai stats err : ' + err)
        })
       
    },[change])

    const dispatch = useDispatch()
    // handle chang AI status
    const handleChangeAIstats = (stats) => {
        setChange(true)
        changeAIStatus(stats).then(res => {
            if(res.statusCode === 200) {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen : false
                })
                dispatch(notifySuccessfully("Applied Change !"))
            } else {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen : false
                })
                dispatch(notifyError(messageCode(res.messageCode)))
            }
        }).catch(() => {
            dispatch(notifyError("Some thing went wrong !"))
        })
    }
  
    return (
    <div className='contestWrapper' style={{height:'80vh'}}>
        <div style={{
            minHeight:'20vh',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            padding : '1rem',
            alignItems:'center',
            font:'caption'
        }}>
             <div>
                 Auto generate caption from Image :    
                 <FormControlLabel 
                 control={<Switch
                        checked={swich}
                    />}
                  label= {swich ? "On" : "Off"}
                  onChange={() => {setSwich(!swich)
                                        setDisabled(false)}}
                  />
            </div>
            <div style={{display:'flex',flexDirection:'row',gap:'1rem',
                        alignItems:'right',alignSelf:'right',
                        marginTop:'1rem'
                        }}>
                <Button variant='contained' style={{backgroundColor: "#FA953A",}}
                    disabled={disabled}
                    size="small"
                    onClick={() => setConfirmDialog({
                        isOpen : true,
                        title : "Are your sure with these change  ?",
                        subTitle : "",
                        onConfirm : () => handleChangeAIstats(swich ? 0 : 1)
                    })}
                >Save</Button>
                {/* <Button variant='outlined' size="small">Cancel</Button> */}
            </div>
        </div>
        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  )
}

export default Setting