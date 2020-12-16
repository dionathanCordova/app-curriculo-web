import React from "react";

import GlobalStyle from "./styles/global";
import Routes from "./routes";
import { BrowserRouter, Route } from "react-router-dom";

const App: React.FC = () => (
   <BrowserRouter>
      <Routes />
      <GlobalStyle />
   </BrowserRouter>
);

export default App;
