import React, { useCallback, useContext, useEffect } from 'react'
import { FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import icon from "../../assets/icon.png";
import AuthProvider from '../../contexts/Authcontext';
import emptyAvatar from '../../assets/empty-avatar.png';
import {  FiPaperclip } from 'react-icons/fi';

import {
   Container,
   Content,
   Profile,
   HeaderContent,
   InfoAdicional
} from './styles';

interface HeaderProps {
   userName: string;
   pathImage?: string;
}

const Header: React.FC<HeaderProps> = ({userName, pathImage}) => {
   const {signed, SignOut, user} = useContext(AuthProvider);
   const history = useHistory();

   useEffect(() => {
   }, [user])

   const handleSignout = useCallback(async( ) => {
      const signout = await SignOut();
      
      if(!signout.signed) {
         history.push('/');
      }
   }, [SignOut, history])

   return (
      <Container>
         <Content>
            <HeaderContent>
               {/* <img src={icon} alt="" width="140px"/> */}
               {/* <h4>Currículo App </h4>
               <FiPaperclip /> */}
                   
               <Profile>
                  <img src={pathImage ? `${process.env.REACT_APP_FILES}/${pathImage}` : emptyAvatar} alt="" width="100px"/>
                  <div>
                     <span>Bem vindo</span><br/>
                     <Link to="profile">{userName}</Link> 
                  </div>
               </Profile>
        
               <button type="button" onClick={() => handleSignout()}>
                  <FiPower />
               </button>
            </HeaderContent>
         </Content>
      </Container>
   )
}

export default Header
