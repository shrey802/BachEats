/* eslint-disable no-unused-vars */
import React from 'react';
import { Route } from 'react-router-dom';
import Registration from '../components/Registration';
import HomeComp from '../components/HomeComp';
import LoginComp from '../components/LoginComp';
const routes = [
    {
        path: '/',
        element: <Registration />
    },
    {
        path:'/home',
        element: <HomeComp />
    },
    {
        path: '/login',
        element: <LoginComp />
    }
]
export default routes;