import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogContent, DialogTitle,makeStyles,setOpenPopUp } from '@material-ui/core'

const useStyle = makeStyles({
    dialogWrapper :{
        "&:first-child" : {
            paddingTop: '0'
        },
        padding: '0',
        borderRadius:'10px',
        "& .MuiPaper-root": {
            backgroundColor: 'rgba(0,0,0,0.5)'
          }
    },
    scrollPaper :{
        maxHeight :'100%',
    }
})


const PostDetailPopUp = (props) => {
    const {children,openPopUp,setOpenPopUp}= props
    const classes = useStyle()
    return (
        <Dialog open={openPopUp} maxWidth='false' onClose={() => setOpenPopUp(false)}
                    classes={{
                        paper: classes.dialogWrapper,
                        paperScrollPaper:  classes.scrollPaper
                    }}  
                    disableEnforceFocus
                    >
            {/* <DialogTitle>
                Post Detail
            </DialogTitle> */}
            <DialogContent 
                 classes={{
                    root  : classes.dialogWrapper
            }}
            >
                {children}
            </DialogContent>
        </Dialog>
    )
}


export default PostDetailPopUp
