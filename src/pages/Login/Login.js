import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core";
import  authService  from "../../services/auth/";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { LoginFail, LoginSuccess } from "../../redux/actions/authActions";
import backgroundImg from '../../asset/image/login_background.png'
const useStyle = makeStyles({
    bgWrapper : {
      height :'100vh',
      width:'100%',
      backgroundImage: backgroundImg,
      zIndex : '99'
    }
})


const Login = () => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory();
  const dispatch = useDispatch()

  const style = useStyle()
  const paperStyle = {
    opacity: '90%',
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#E54240" };
  const btnstyle = { 
    margin: "8px 0" , 
    color:"##FF1700"};
  const styles = {
    heroContainer: {
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      width: '100%',
      height: 'auto',
      margin: -20,
      padding: 20,
      minHeight: '100%',
      minWidth: '1024px',
      position: 'fixed',
      top: 0,
  left: 0,
  display:'flex',
  alignItems : 'center',
  justifyContent : 'center'
    }
   };



  const handleLoggin = (e) => {
    e.preventDefault()
    setLoading(true)
    authService.Login(username,password).then(
      (data) => {
        if(data.statusCode === 200) {
          dispatch(LoginSuccess(data.user))
          setLoading(false)
          if(data.user.role === "Admin") {
            history.push('/admin')
          } else {
            history.push('/admin2')
          }
          
        } 
      }
      ).catch((err) => {
      setLoading(false)
      setError('Please check your username and password.')
      dispatch(LoginFail())
    })
  }

  return (
    <div style={styles.heroContainer}>
     <Grid >
        <Paper elevation={12} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AdminPanelSettingsIcon />
            </Avatar>
            <h2>Admin Login</h2>
            
          </Grid>
          <form >
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
          <br/>
          <TextField
            id="outlined-name"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
            />
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            style={btnstyle}
            fullWidth
            disabled={loading}
            onClick={(e) => handleLoggin(e)}
            >
            Sign in
          </Button>
          </form>
          { error && <span style={{color:'red', fontSize:'12px'}}> {error}</span>}
          {/* <Typography>  
            <Link href="#">Forgot password ?</Link>
          </Typography> */}
        </Paper>
      </Grid> 
    </div>
  );
};

export default Login;
