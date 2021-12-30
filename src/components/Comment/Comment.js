import { Paper, Grid, Avatar, IconButton } from "@mui/material";
import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import UserField from "../UserField/UserField";
import { handleHistory } from "../../utils/tool";
import "./Comment.css";
import { TextField } from "@material-ui/core";


const Comment = (props) => {
  const {details} = props
  return (
    <div className="commentWrapper">
      <UserField image={details.avata_url} userName={details.user_name} userId={details.user_id} />
      <p className="contentWrapper">
        {details.content}
      </p>

      <div className="comentDetail">
      {/* <IconButton style={{fontSize:'12px'}}>
              <FavoriteBorderOutlinedIcon sx={{
                height:'16px',
                weight:'16px'
              }}/> 
            </IconButton> */}
            {handleHistory(details.time)}
        </div>
        
    </div>
  );
};

export default Comment;
