import React from 'react'
import { useEffect, useState } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {getCollectionInfo } from '../../services/DashBoardService'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DashBoard.css'

export const Darshboard = () => {

  const[data,setData] = useState(null)



  const handleRate = (rate) => {
    if(String(rate).charAt(0) === '-' ) return <div>{rate} '%' <ArrowDownwardIcon style={{color:'red'}}/></div>
    return <div style={{display:'inline-flex',alignItems:'center'}}>${rate}%  <ArrowUpwardIcon style={{color:'green'}}/> </div>
  }

  useEffect(() => {
    getCollectionInfo().then(res => {
      if(res.statusCode === 200) {
        console.log(res.data)
        setData(res.data)
      }
    })
  },[])
  

  if(data !== null) 
  {

    return (
      <div className='dashboard'>
      <div className='widget'>
        <div className='widgetItem'>
            <span className='widgetTitle'>
                Post Amount
            </span>
            <div className='widgetContainer'>
                <span className='widget'>
                  {data.postOfCurrentMonth.currentMonthCount}
                  </span>
                <span className='widgetRate'>
                  {handleRate(data.postOfCurrentMonth.percent)}
                </span>
            </div>
            <span className='widgetsub'>
              Compared to last month
            </span>
        </div>
        <div className='widgetItem'>
            <span className='widgetTitle'>
                Reported Post
            </span>
            <div className='widgetContainer'>
            <span className='widget'>
              {data.reportOfCurrentMonth.currentMonthCount}
              </span>
                <span className='widgetRate'>
                {handleRate(data.reportOfCurrentMonth.percent)}
                </span>
            </div>
            <span className='widgetsub'>
              Compared to last month
            </span>
        </div>
        <div className='widgetItem'>
            <span className='widgetTitle'>
                AI caption used by user
            </span>
            <div className='widgetContainer'>
            <span className='widget'>
              {data.aiOfCurrentMonth.currentMonthCount}
              </span>
                <span className='widgetRate'>
                {handleRate(data.aiOfCurrentMonth.percent)}
                </span>
            </div>
            <span className='widgetsub'>
              Compared to last month
            </span>
        </div>
        
      </div>

      <div className='chart'>
          <h3 className='caption'>AI caption using analyse</h3>
          <div className='chartItem'>
            <ResponsiveContainer width='100%' aspect={4/1}>
              <LineChart data={data.months}>
                  <XAxis dataKey="month"/>
                  <Line type="monotone" dataKey="countPost"/>
                  <Tooltip />
              </LineChart>
            </ResponsiveContainer>
            
          </div>
      </div>
    </div>
  ) 
} else {

  return (
    <div>
      Loading...
    </div>
  )
}
}



// import * as React from 'react';
// import { styled, createTheme, ThemeProvider } fr om '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiDrawer from '@mui/material/Drawer';
// import Box from '@mui/material/Box';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const drawerWidth = 240;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     '& .MuiDrawer-paper': {
//       position: 'relative',
//       whiteSpace: 'nowrap',
//       width: drawerWidth,
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       boxSizing: 'border-box',
//       ...(!open && {
//         overflowX: 'hidden',
//         transition: theme.transitions.create('width', {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.leavingScreen,
//         }),
//         width: theme.spacing(7),
//         [theme.breakpoints.up('sm')]: {
//           width: theme.spacing(9),
//         },
//       }),
//     },
//   }),
// );

// const mdTheme = createTheme();

// function DashboardContent() {
//   const [open, setOpen] = React.useState(true);
//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   return (
//     <ThemeProvider theme={mdTheme}>
//       <Box sx={{ display: 'flex' }}>
//         <CssBaseline />
//         <AppBar position="absolute" open={open}>
//           <Toolbar
//             sx={{
//               pr: '24px', // keep right padding when drawer closed
//             }}
//           >
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="open drawer"
//               onClick={toggleDrawer}
//               sx={{
//                 marginRight: '36px',
//                 ...(open && { display: 'none' }),
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography
//               component="h1"
//               variant="h6"
//               color="inherit"
//               noWrap
//               sx={{ flexGrow: 1 }}
//             >
//               Dashboard
//             </Typography>
//             <IconButton color="inherit">
//               <Badge badgeContent={4} color="secondary">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//         <Drawer variant="permanent" open={open}>
//           <Toolbar
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'flex-end',
//               px: [1],
//             }}
//           >
//             <IconButton onClick={toggleDrawer}>
//               <ChevronLeftIcon />
//             </IconButton>
//           </Toolbar>
//           <Divider />
//           <List>{mainListItems}</List>
//           <Divider />
//           <List>{secondaryListItems}</List>
//         </Drawer>
//         <Box
//           component="main"
//           sx={{
//             backgroundColor: (theme) =>
//               theme.palette.mode === 'light'
//                 ? theme.palette.grey[100]
//                 : theme.palette.grey[900],
//             flexGrow: 1,
//             height: '100vh',
//             overflow: 'auto',
//           }}
//         >
//           <Toolbar />
//           <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <Grid container spacing={3}>
//               {/* Chart */}
//               <Grid item xs={12} md={8} lg={9}>
//                 <Paper
//                   sx={{
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     height: 240,
//                   }}
//                 >
//                   <Chart />
//                 </Paper>
//               </Grid>
//               {/* Recent Deposits */}
//               <Grid item xs={12} md={4} lg={3}>
//                 <Paper
//                   sx={{
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     height: 240,
//                   }}
//                 >
//                   <Deposits />
//                 </Paper>
//               </Grid>
//               {/* Recent Orders */}
//               <Grid item xs={12}>
//                 <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
//                   <Orders />
//                 </Paper>
//               </Grid>
//             </Grid>
//             <Copyright sx={{ pt: 4 }} />
//           </Container>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default function Dashboard() {
//   return <DashboardContent />;
// }