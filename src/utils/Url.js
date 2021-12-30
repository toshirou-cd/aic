const URL_API = 'http://13.250.109.141/'

const BASE_URL = {
    authenticate : URL_API + 'users/authenticate',
    getAccountList : URL_API + 'users/getuseraccountforadmin',
    getAvatar : URL_API + 'images/getuseravatar',
    getAccountDetail : URL_API + 'users/getuserdetail',
    getImgFromPost : URL_API +'images/getimgfrompost',
    getCommentAndLikeInit : URL_API + 'posts/getpostcommentandlikeInit'
}

export default BASE_URL