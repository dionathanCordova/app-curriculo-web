import React, {useCallback} from "react";
import { useHistory } from "react-router-dom";
import icon from "../../assets/icon.png";

import { Container, Content, BoxSign } from "./styles";

const Header = () => {
   const history = useHistory();

   const handleGoToPage = useCallback((page) => {
      history.push(page);
   }, [history]);

   return (
      <Container>
         <Content>
            <img src={icon} alt="" />

            <BoxSign>
               <button onClick={() => handleGoToPage('/login')}>Log in</button>
               <button onClick={() => handleGoToPage('/signin')}>Sign in</button>
            </BoxSign>
         </Content>
      </Container>
   );
};

export default Header;
