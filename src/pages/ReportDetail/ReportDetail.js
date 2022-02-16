import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostDetail } from "../../services/PostService";
import { getReportDetail, test, updateReport } from "../../services/ReportedPostServices";
import "./ReportDetail.css";
import PostDetail from "../../components/PostDetail/PostDetail";
import { Button, ButtonGroup, IconButton ,Tooltip} from "@material-ui/core";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import {convertDateTime} from '../../utils/tool'
import { getMessageCode } from "../../utils/contanst";
import { display, flexbox } from "@mui/system";
import { Stack, Chip } from "@mui/material";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { notifyDeleteSucessFully, notifyError, notifyUpdateSucessfully } from "../../redux/actions/notifyActions";
import { useDispatch } from "react-redux";

const ReportDetail = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [postId, setPostId] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
    isAccept : false
  })
  
  useEffect(() => {
    if (postId !== "") {
      getPostDetail(postId, 3).then((data) => {
        setPost(data.data);
      });
    }
  }, [postId]);
  
  useEffect(() => {
    getReportDetail(reportId).then((data) => {
      if (!data.data) {
        setError(true);
        setReport({ err: "Can not found this report" });
      } else {
        setReport(data.data);
        setPostId(data.data.post_id);
      }
    });
  }, [postId,confirmDialog.isAccept]);



  const handleColorChip =(status) => {
    switch(status) {
        case 6 : return 'error'
        case 1 : return 'warning'
        case 2 : return 'success'
    }
  }

  const dispatch = useDispatch()
  /// handle request status 
  const handleUpdateStatus = (status) => {
    updateReport(report.report_id,status).then((res)=>{
        if(res.statusCode === 200) {
          setConfirmDialog({
            ...confirmDialog,
            isOpen : false
          })
          dispatch(notifyUpdateSucessfully())
        } else {
          setConfirmDialog({
            ...confirmDialog,
            isOpen : false
          })
            dispatch(notifyError())
        }
      })
  }


  if (error)
    return (
      <div className="reportWrapper">
        <div>
          <h3>{report.err}</h3>
        </div>
      </div>
    );
    
  if(post === null || report === null) {
    return <div>Loading...</div>
  } else {
  return (
    <div className="reportWrapper">
      <div className="reportDetail">
        <div>Report ID :</div>
        <div>{report.report_id}</div>
        <div>Report by :</div>
        <div>{report.user_name}</div>
        <div>Report content :</div>
        <div>{report.description}</div>
        <div>Report times :</div>
        <div>{report.count_report}</div>
        <div>Type :</div>
        <div>{report.category_name}</div>
        <div>Date report :</div>
        <div> {convertDateTime(report.date_create)}</div>
        <div>Date process :</div>
        <div>{report.date_accept === null ? "null" : convertDateTime(report.date_accept)}</div>
        <div>Status : </div>
        <div>
            <Stack maxWidth='100px'>
                <Chip 
                variant='outlined'
                    label={getMessageCode(report.status)}
                    color={handleColorChip(report.status)}>
                </Chip>
            </Stack>
        </div>

        <div className="tool-button">
          <Tooltip title="Accept this report and delete this post ">
            <IconButton color="primary"  disabled={report.status !== 1 ? true : false}
                onClick={() => {
                setConfirmDialog({
                    isOpen : true,
                    title : 'Are you sure to accept this report  ?',
                    subTitle : 'You operation will delete this post ',
                    onConfirm : () => handleUpdateStatus(2)
                  })}}>
              <CheckIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reject this report ">
            <IconButton color="secondary"  disabled={post.status === 4 || report.status !== 1 ? true : false}
            onClick={() => {
              setConfirmDialog({
                  isOpen : true,
                    title : 'Are you sure to reject this report  ?',
                    subTitle : 'You operation can not be  reveresed ',
                    onConfirm : () => handleUpdateStatus(6)
            })}}>
              <DoNotDisturbOnIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:'0'
      }
      }>
        <PostDetail post={post} isNormal={false}/>
      </div>

      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/> 
    </div>
  );
    }
};

export default ReportDetail;
