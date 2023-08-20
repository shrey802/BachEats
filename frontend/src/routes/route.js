/* eslint-disable no-unused-vars */
import React from 'react';
import { Route } from 'react-router-dom';
import Registration from '../components/Registration';
import HomeComp from '../components/HomeComp';
import LoginComp from '../components/LoginComp';
import AboutComp from '../components/AboutComp';
import ContactComp from '../components/ContactComp';
import IndividualSweet from '../components/IndividualComp';
import Products from '../components/ProductsComp';
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
    },
    {
        path: '/about',
        element: <AboutComp />
    },
    {
        path: '/contact',
        element: <ContactComp />
    },
    {
        path: '/products',
        element: <Products/>
    },
    {
        path: '/sweets/:id',
        element: <IndividualSweet/>
    }
]
export default routes;