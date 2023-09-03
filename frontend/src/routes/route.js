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
import CartComp from '../components/CartComp';
import PaymentComp from '../components/PaymentComp';
import Paymentsuccess from '../components/Paymentsuccess';
import Paymentfail from '../components/Paymentfail';
// has all the routes for frontend
const routes = [
  {
    path: '/',
    element: <Registration />
  },
  {
    path: '/home',
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
    element: <Products />
  },
  {
    path: '/sweets/:id',
    element: <IndividualSweet />
  },
  {
    path: '/cart',
    element: <CartComp/>
  },
  {
    path: '/cart/:userid',
    element: <CartComp />
  },
  {
    path: '/payment/:orderAmount',
    element: <PaymentComp/>
  },
  {
    path: '/success',
    element: <Paymentsuccess/>
  },
  {
    path: '/fail',
    element: <Paymentfail/>
  }
];

export default routes;
