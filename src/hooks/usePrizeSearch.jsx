import React, { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { getPrizesList } from '../services/ContestService'

export const  usePrizeSearch = (searchName ,page , pageSize, status,addprize,dialog) => {
    
    const [prizes, setPrizes] = useState([])
    const [prizeLoading, setPrizeLoading] = useState(false)
    const [prizeTotalRow, setPrizeTotalRow] = useState()


    useEffect(() => {
        setPrizeLoading(true)
        // let cancel
        // cancel = axios.CancelToken.source()
        getPrizesList(searchName,page,pageSize,3).then((data) => {
            if (data.data !== null) {
                setPrizes(data.data)
                setPrizeTotalRow(data.total)
            } else {
                setPrizes([])
                setPrizeTotalRow(0)
            }
        })
        setPrizeLoading(false)
    }, [searchName, status, pageSize, page,addprize,dialog])
    return {prizes, prizeLoading, prizeTotalRow}
}