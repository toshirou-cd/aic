import React from 'react'

const authHeader = () =>{
    const token = localStorage.getItem('token')
    return {
        token
    } 
}     


export default authHeader