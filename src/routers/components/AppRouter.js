import React from 'react';
import RouterRender from '../RouterRender';
import Login from '../../pages/Login/Login';
import AdminRouter, { sideBarItems } from './admin/AdminRouter'
import AppLayout from '../../components/AppLayout';
import PageNotFound from '../../pages/PageNotFound';
import UserProfile from '../../pages/UserProfile/UserProfile';
import Posts from '../../pages/Posts/Posts';
import { useSelector } from 'react-redux';


const AppRouter= () => {

  const isLoggedIn = useSelector(state => state.AuthReducer.isLoggedIn)
  console.log('isLog :' + isLoggedIn)

  const routes = [
      {
        path: '/',
       exact: true,
       isPrivate: false,
       redirectTo : isLoggedIn ? '/admin' : '/login'
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
        isPrivate: true
      },
    ];
    return <RouterRender isRoot helperRoutes={routes} />;
  };
  
  export default AppRouter;
  

