import React from "react";

import GlobalStyle from "./styles/global";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/Authcontext';

const App: React.FC = () => (
   <BrowserRouter>
      <AuthProvider>
         <Routes />
      </AuthProvider>
      <GlobalStyle />
   </BrowserRouter>
);

export default App;
