import React from 'react'
import altImg from '../../asset/image/image.png'
import BASE_URL from '../../utils/Url'
import './UserField.css'

const UserField = (props) => {
    const {image,userName,userId} = props
    return (
        <div className='userWrapper' onClick={()=> {}}>
              <img src={`${BASE_URL.getAvatar}/${image}`} style={{height:'25px', width:'25px', objectFit: 'cover', borderRadius:'50%'}}/>
              {userName}
          </div>
    )
}


export default UserField
