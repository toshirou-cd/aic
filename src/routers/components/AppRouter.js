import React from 'react';
import RouterRender from '../RouterRender';
import Login from '../../pages/Login/Login';
import AdminRouter, { sideBarItems } from './admin/AdminRouter'
import AppLayout from '../../components/AppLayout';
import PageNotFound from '../../pages/PageNotFound';
import UserProfile from '../../pages/UserProfile/UserProfile';

const routes = [
    {
      component: Login,
      path: '/',
     exact: true,
     isPrivate: false,
    },
    {
      component: Login,
      path: '/login',
      isPrivate: false
    },
    {
      component: AdminRouter,
      path: '/admin',
      layout: AppLayout,
      navItems: sideBarItems, 
      isPrivate: true
    },
    {
      component: PageNotFound,
      path: '/notfound',
    },
    {
      component: UserProfile,
      path: '/:id',
    }
  ];
  
  const AppRouter= () => {
    return <RouterRender isRoot helperRoutes={routes} />;
  };
  
  export default AppRouter;


