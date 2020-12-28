import React, { useCallback, useContext, useEffect } from 'react'
import { FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import icon from "../../assets/icon.png";
import Sair from '../../assets/sair.svg';
import AuthProvider from '../../contexts/Authcontext';

import {
   Container,
   Content,
   Profile,
   HeaderContent
} from './styles';

interface HeaderProps {
   userName: string;
   pathImage?: string;
}

const Header: React.FC<HeaderProps> = ({userName, pathImage}) => {
   const {signed, SignOut, user} = useContext(AuthProvider);
   const history = useHistory();

   useEffect(() => {
      console.log(user);
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
               <img src={icon} alt="" width="140px"/>
                   
               <Profile>
                  <img src={pathImage ? "https://lh3.googleusercontent.com/ogw/ADGmqu9OZXlQpVNx-YEjPeRbfYRXfv9cZ9P3MzcqQrdD=s32-c-mo": "https://eitrawmaterials.eu/wp-content/uploads/2016/09/empty-avatar.jpg"} alt="" width="100px"/>
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
