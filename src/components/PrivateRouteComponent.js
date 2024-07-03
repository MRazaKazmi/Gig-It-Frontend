// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, redirectTo, usertypeRequired, ...rest }) => {
  const token = localStorage.getItem('token');

  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const usertype = decodedToken.usertype;

    if (usertype === usertypeRequired) {
      return <Route {...rest} element={<Component />} />;
    } else {
      return <Navigate to={redirectTo} />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
