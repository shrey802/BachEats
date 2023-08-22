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
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY); // Load stripePromise

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
    element: (
      <Elements stripe={stripePromise}>
        <Products />
      </Elements>
    )
  },
  {
    path: '/sweets/:id',
    element: <IndividualSweet />
  }
];

export default routes;
