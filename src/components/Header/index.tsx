import React from "react";
import icon from '../../assets/icon.png';

import { 
   Container, 
   Content,
   BoxSign
 } from "./styles";

const Header = () => {
   return (
      <Container>
         <Content>
            <img src={icon} alt=""/>
            
            <BoxSign>
               <button>Sign in</button> 
               <button>Log in</button>
            </BoxSign>
         </Content>
      </Container>
   );
};

export default Header;
