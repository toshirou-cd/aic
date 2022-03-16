const URL_API = 'http://13.250.109.141/'

const BASE_URL = {
    authenticate : URL_API + 'users/authenticate',
    getAccountList : URL_API + 'users/getuseraccountforadmin',
    getAvatar : URL_API + 'images/getuseravatar',
    getAccountDetail : URL_API + 'users/getuserdetailforadmin',
    getMoreUserPost : URL_API + 'users/getmoreuserpost',
    getUserContestPost : URL_API + 'posts/getusercontestpost',
    getMoreUserContestPost : URL_API + 'posts/getusercontestpost',
    getImgFromPost : URL_API +'images/getimgfrompost',
    getCommentAndLikeInit : URL_API + 'posts/getpostcommentandlikeInit',
    getPageComment : URL_API + 'posts/getpagecomment',
    deletePost : URL_API + 'posts/deletepost',
    deleteComment : URL_API + 'comments/deletecomment',
    forceLogout : URL_API + 'users/forcelogout',
    searchUser : URL_API + 'users/searchuserpage',
    getRandomPost : URL_API + 'posts/getrandompost',
    getMoreRandomPost : URL_API + 'posts/getmorerandompost',
    getPostDetail : URL_API+ 'reports/getpostdetailforreport',
    getReportPosts : URL_API + 'reports/getpagereport',
    getReportPostsbyCate : URL_API + 'reports/getpagereportcategory',
    deleteAccount : URL_API + 'users/deleteaccountbyadmin',
    updateUserProfile : URL_API + 'users/updateuserprofilebyadmin',
    getReportCategories : URL_API + 'categories/getcategory',
    getReportDetail : URL_API + 'reports/getreportdetailforrefresh',
    updateReport : URL_API + 'reports/updatereport',
    getContests : URL_API + 'contests/getpagecontestforadmin',
    getPrizesList : URL_API + 'prizes/getpageprize',
    addPrize : URL_API +'prizes/addprize',
    createContest : URL_API + 'contests/addcontest',
    updateContest : URL_API + 'contests/updatecontest',
    updatePrizeContest : URL_API + 'contests/updateprizecontest',
    getUserIncontest : URL_API + 'contests/getuserincontest',
    getContestDetail : URL_API + 'contests/getcontestdetailforadmin',
    activeContestManually : URL_API + 'contests/activecontestmanually',
    changeUserStatus : URL_API + 'users/changstatusaccountbyadmin',
    finishContestManually : URL_API +'contests/finishcontestmanually',
    getDashboardInfo : URL_API + 'posts/collectinformation'
    
}

export default BASE_URL