import { FormControlLabel, Switch } from '@mui/material'
import React, { useState } from 'react'

const Setting = () => {
    const [swich, setSwich] = useState(false)

  
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
                 control={<Switch />}
                  label="On" />
            </div>
        </div>
    </div>
  )
}

export default Setting