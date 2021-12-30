import React from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';

export const NavbarData = [
  {
    title: 'Darsh Board',
    path: '/admin',
    icon: <DashboardOutlinedIcon/>,
  },
  {
    title: 'Account',
    path: '/admin/account',
    icon: <ManageAccountsOutlinedIcon/>,
  },
  {
    title: 'Post',
    path: '/posts',
    icon: <ImageOutlinedIcon/>,
  },
  {
    title: 'Reported Post',
    path: '/reportedposts',
    icon: <NotificationImportantOutlinedIcon/>,
  },
  {
    title: 'Manage Contest',
    path: '/contest',
    icon: <CardGiftcardOutlinedIcon/>,
  }
];