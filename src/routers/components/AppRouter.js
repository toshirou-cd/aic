import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import Login from '../../pages/Login/Login';
import PageNotFound from '../../pages/PageNotFound';
import UserProfile from '../../pages/UserProfile/UserProfile';
import RouterRender from '../RouterRender';
import AdminRouter, { sideBarItems } from './admin/AdminRouter';
import Admin2Router, { admin2SideBarItems } from './admin2/Admin2Router';


const AppRouter= () => {

  const auth = useSelector(state => state.AuthReducer)
  // const role = auth.isLoggedIn && auth.user
  console.log('isLog :' + auth.isLoggedIn)

  const routes = [
      {
        path: '/',
       exact: true,
       isPrivate: false,
       redirectTo : (!auth.isLoggedIn ) ? '/login' : (auth.user.role === "Admin" ? '/admin' : '/admin2')
      },
      {
        component:  !auth.isLoggedIn && Login,
        path: '/login',
        redirectTo : auth.isLoggedIn ? (auth.user.role === "Admin" ? '/admin' : 'admin2') : '/login',
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
        component: Admin2Router,
        path: '/admin2',
        layout: AppLayout,
        navItems: admin2SideBarItems, 
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
  

