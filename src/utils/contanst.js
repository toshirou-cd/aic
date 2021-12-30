export const getMessageCode = (STATUS_CODE ) => {
    if( STATUS_CODE === 1 ) return "Request"
    if( STATUS_CODE === 2 ) return "Accept"
    if( STATUS_CODE === 3 ) return "Present"
    if( STATUS_CODE === 4 ) return "Deleted"
    if( STATUS_CODE === 5 ) return "Inactivated"
    if( STATUS_CODE === 6 ) return "Reject"
    if( STATUS_CODE === 7 ) return "DuplicateButDeleted "
    if( STATUS_CODE === 8 ) return "Duplicate " 

}