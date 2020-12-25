import React, { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import icon from "../../assets/icon.png";
import Sair from '../../assets/sair.svg';
import AuthProvider from '../../contexts/Authcontext';

import {
   Container,
   Content,
   BoxUserInfo
} from './styles';

const Header = () => {
   const {signed, SignOut} = useContext(AuthProvider);
   const history = useHistory();

   const handleSignout = useCallback(async( ) => {
      const signout = await SignOut();
      
      if(!signout.signed) {
         history.push('/');
      }
   }, [SignOut, history])

   return (
      <Container>
         <Content>
            <div>
               <img src={icon} alt="" width="140px"/>
                   
               <BoxUserInfo>
                  <img src="https://lh3.googleusercontent.com/ogw/ADGmqu9OZXlQpVNx-YEjPeRbfYRXfv9cZ9P3MzcqQrdD=s32-c-mo" alt="" width="100px"/>
                  <div>
                     <span>Bem vindo</span><br/>
                     Dionathan de Córdova
                  </div>
               </BoxUserInfo>
            </div>
        

            <button onClick={() => handleSignout()}>
               <img src={Sair} alt=""/>
            </button>
         </Content>
      </Container>
   )
}

export default Header
