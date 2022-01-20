import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  setOpenPopUp,
  Typography
} from "@material-ui/core";
import WarningIcon from "@mui/icons-material/Warning";


const useStyles = makeStyles(theme => ({
    dialog : {
        padding : theme.spacing(2),
        position : 'absolute',
        top: theme.spacing(6)
    },
    dialogTitle : {
        display : 'flex',
        alignItems : 'center',
        gap: '5px'
    }
})
)
const ConfirmDialog = (props) => {
  const { confirmDialog, setConfirmDialog } = props;

  const handleOnclose = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  const classes = useStyles()

  return (
    <Dialog open={confirmDialog.isOpen} onClose={handleOnclose} classes={{paper : classes.dialog}}>
      <DialogTitle>
        <Typography variant="h6" className={classes.dialogTitle}>
          <WarningIcon />
          {confirmDialog.title}
        </Typography>
      </DialogTitle>
      <DialogContent>{confirmDialog.subTitle}</DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => {confirmDialog.onConfirm() 
                                                setConfirmDialog({
                                                    ...confirmDialog,
                                                    isAccept : true,
                                                })
                                              }}>Yes</Button>
        <Button color="secondary" onClick={handleOnclose}>No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
