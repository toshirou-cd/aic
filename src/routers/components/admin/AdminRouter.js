// import PageNotFound from '@app/pages/PageNotFound';
// import LoginPage from '@app/pages/login/LoginPage';
// import HomePage from '@app/pages/HomePage';
// import HelperRoute from '@app/routers/HelperRoute';
// import RouterRender from '@app/routers/RouterRender';
// import React from 'react';
// import { match } from 'react-router-dom';
// import {
//   AccountPage,
//   DashboardPage,
//   RequestPage,
//   StoragePage,
// } from '@app/pages/admin';
// import UserManagementPage from '@app/pages/user-management/UsermanagementPage';

import Account from "../../../pages/Account/Account";
import { Darshboard } from "../../../pages/Dashboard/DarshBoard";
import React from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import RouterRender from "../../RouterRender";
import ProfileMenu from "../../../components/ProfileMenu.js/ProfileMenu";
import UserProfile from "../../../pages/UserProfile/UserProfile";
import Posts from "../../../pages/Posts/Posts";
import PostDetailPage from "../../../pages/PostDetailPage/PostDetailPage";
import ReportedPost from "../../../pages/ReportedPost/ReportedPost";
import ReportDetail from "../../../pages/ReportDetail/ReportDetail";
import Contest from "../../../pages/Contest/Contest";
import ContestDetail from "../../../pages/ContestDetail/ContestDetail";

export const sideBarItems = [  
    {
        title: 'Darsh Board',
        path: 'dashboard',
        icon: <DashboardOutlinedIcon/>,
      },
      {
        title: 'Account',
        path: 'account',
        icon: <ManageAccountsOutlinedIcon/>,
      },
      {
        title: 'Post',
        path: 'posts',
        icon: <ImageOutlinedIcon/>,
      },
      {
        title: 'Reported Post',
        path: 'reportedposts',
        icon: <NotificationImportantOutlinedIcon/>,
      },
      {
        title: 'Manage Poll',
        path: 'poll',
        icon: <CardGiftcardOutlinedIcon/>,
      }
  ];

const routes= [
  {
    path: '/',
    exact: true,
    component: Darshboard,
    redirectTo: '/dashboard',
    isPrivate: true
  },
  {
    component: Darshboard,
    path: '/dashboard',
    isPrivate: true
  },
  {
    component: UserProfile,
    path: '/account/:id',
    isPrivate: true
  },
  {
    component: Account,
    path: '/account',
    isPrivate: true
  },
  {
    component: PostDetailPage,
    path: '/posts/:postId',
    isPrivate: true,
    exact: true
  },
  {
    component: Posts,
    path: '/posts',
    isPrivate: true
  },
  {
    component: ReportDetail,
    path: '/reportedposts/:reportId',
    isPrivate: true
  },
  {
    component: ReportedPost,
    path: '/reportedposts',
    isPrivate: true
  },
  {
    component: ContestDetail,
    path: '/poll/:contestId',
    isPrivate: true
  },
  {
    component: Contest,
    path: '/poll',
    isPrivate: true
  },

];

const AdminRouter = (props) => {
  return (
    <RouterRender
      routerPath={props.match.path}
      helperRoutes={routes}
    />
  );
};

export default AdminRouter;
