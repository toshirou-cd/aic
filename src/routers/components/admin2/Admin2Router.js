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

import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';
import Account from "../../../pages/Account/Account";
import Setting from '../../../pages/Admin2/Setting';
import { Darshboard } from "../../../pages/Dashboard/DarshBoard";
import RouterRender from "../../RouterRender";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ManagerAccount from '../../../pages/Admin2/ManagerAccount/ManagerAccount';

export const admin2SideBarItems = [  
    //  {
    //     title: 'Account',
    //     path: 'account',
    //     icon: <ManageAccountsOutlinedIcon/>,
    //   },
    //   {
    //     title: 'Manage Prize',
    //     path: 'prizes',
    //     icon: <EmojiEventsOutlinedIcon/>,
    //   },
      {
        title: 'Manager Account',
        path: 'account',
        icon: <ManageAccountsOutlinedIcon/>,
      },
      {
        title: 'Setting',
        path: 'setting',
        icon: <SettingsIcon/>,
      }
  ];

const routes= [
  {
    path: '/',
    exact: true,
    component: Setting,
    redirectTo: '/setting',
    isPrivate: true
  },
  {
    component: ManagerAccount,
    path: '/account',
    isPrivate: true
  },
{
    component : Setting,
    path: '/setting',
    isPrivate: true
}
];

const Admin2Router = (props) => {
  return (
    <RouterRender
      routerPath={props.match.path}
      helperRoutes={routes}
    />
  );
};

export default Admin2Router;
