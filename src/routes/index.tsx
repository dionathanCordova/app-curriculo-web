import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from '../pages/Login';
import Signin from '../pages/Signin';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
   <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signin" component={Signin} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
   </BrowserRouter>
);

export default Routes;
