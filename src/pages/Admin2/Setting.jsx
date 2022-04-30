import { Button, FormControlLabel, Switch } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {changeAIStatus, getAIStatus} from '../../services/admin/AccountService'

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

    useEffect(() => {
        getAIStatus().then(res => {
            if(res.statusCode === 200) {
                setSwich(res.data === 1 ? true : false)
                console.log("aasdfa + " + res.data)
            }
        }).catch(err => {
            console.log('getting ai stats err : ' + err)
        })
       
    },[])


    //handle chang AI status
    // const handleChangeAIstats = (stats) => {
    //     changeAIStatus(stas).then(res => {

    //     })
    // }
  
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
                >Save</Button>
                <Button variant='outlined' size="small">Cancel</Button>
            </div>
        </div>
    </div>
  )
}

export default Setting