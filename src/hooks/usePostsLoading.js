import React , { useEffect, useState }from 'react'
import PropTypes from 'prop-types'
import { getMoreRandomPost, getRandomPost } from '../services/PostService'
import { TramRounded } from '@mui/icons-material'
import { getReportedPostList, getReportedPostListbyCategory } from '../services/ReportedPostServices'


export function useReportPostGet(page,pageSize,status,categoryId) {
    const [posts, setPosts] = useState([])
    const [loading , setLoading] = useState(false)
    const [totalRow, setTotalRow] = useState()


    useEffect(() => {
        if (categoryId === 'all') {
            getReportedPostList(page, pageSize, status, null, null).then(
              (res) => {
                if(res.data !== null) {
                  setPosts(res.data);
                  setTotalRow(res.total)
                } 
                else {
                  setPosts([]);
                  setTotalRow(0)
                }
              }
            );
          } else {
            getReportedPostListbyCategory(page, pageSize, status, null, null,categoryId).then(
              (res) => {
                if(res.data !== null) {
                  setPosts(res.data);
                  setTotalRow(res.total)
                } 
                else {
                  setPosts([]);
                  setTotalRow(0)
                }
              }
            )
          }
    }, [page, pageSize,status,categoryId])
   

    

    return {loading ,posts,totalRow}
}



