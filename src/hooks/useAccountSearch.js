import React, { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { getAccountList } from '../services/account/account'
import axios from 'axios'

export const  useAccountSearch = (searchName ,status , pageSize, page) => {
    
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRow, setTotalRow] = useState()


    useEffect(() => {
        setLoading(true)
        // let cancel
        // cancel = axios.CancelToken.source()
        getAccountList(searchName,status,pageSize,page).then((data) => {
            if (data.data !== null) {
                setAccounts(data.data)
                setTotalRow(data.total)
            } else {
                setAccounts([])
                setTotalRow(0)
            }
        })
        setLoading(false)
    }, [searchName, status, pageSize, page])
    return {accounts, loading, totalRow}
}




