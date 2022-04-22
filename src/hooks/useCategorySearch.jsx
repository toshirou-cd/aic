import React, { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { getPrizesList } from '../services/ContestService'
import { getCateorieslist } from '../services/ReportedPostServices'

export const  useCategorySearch = (searchName ,page , pageSize, status,addCate,dialog) => {
    
    const [categoryList, setCategories] = useState([])
    const [cateLoading , setCateLoading] = useState(false)
    const [cateTotalRow, setCateTotalRow] = useState()


    useEffect(() => {
        setCateLoading(true)
        // let cancel
        // cancel = axios.CancelToken.source()
        getCateorieslist(searchName,page,pageSize,status).then((data) => {
            if (data.data !== null) {
                setCategories(data.data)
                setCateTotalRow(data.total)
            } else {
                setCategories([])
                setCateTotalRow(0)
            }
        })
        setCateLoading(false)
    }, [searchName, status, pageSize, page,addCate,dialog])
    return {categoryList, cateLoading, cateTotalRow}
}