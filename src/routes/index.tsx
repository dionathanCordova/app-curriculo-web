import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "../pages/Home";
import Signin from '../pages/Signin';

const Routes: React.FC = () => (
   <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/signin" component={Signin} />
   </BrowserRouter>
);

export default Routes;
