import React, {useEffect , useState} from 'react';
import { getContest } from '../services/ContestService';

const useContestSearch = (searchName,page,pageSize,status,openPopUp) => {
    const [contests, setContests] = useState([])
    const [loading , setLoading] = useState(false)
    const [totalRow, setTotalRow] = useState()


    useEffect(() => {
        // if (categoryId === 'all') {
            setLoading(true)
            getContest(searchName, page, pageSize, status, null, null).then(
              (res) => {
                if(res.data !== null) {
                  setContests(res.data);
                  setTotalRow(res.total)
                } 
                else {
                  setContests([]);
                  setTotalRow(0)
                }
              }
            );
        //   } else {
        //     getReportedPostListbyCategory(page, pageSize, status, null, null,categoryId).then(
        //       (res) => {
        //         if(res.data !== null) {
        //           setPosts(res.data);
        //           setTotalRow(res.total)
        //         } 
        //         else {
        //           setPosts([]);
        //           setTotalRow(0)
        //         }
        //       }
        //     )
        //   }
        setLoading(false)
    }, [searchName,page,pageSize,status,openPopUp])
   

    

    return {loading ,contests,totalRow}
};

export default useContestSearch;
