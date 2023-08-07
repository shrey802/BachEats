import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/Home';
import Hello from '../components/Hello';
const routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/hello',
        element: <Hello />
    }
]
export default routes;