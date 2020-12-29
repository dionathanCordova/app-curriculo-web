import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import AuthProvider from '../../contexts/Authcontext';

import { Container } from './styles';

const Dashboard: React.FC = () => {
   const {signed, user } = useContext(AuthProvider);
   const histoty = useHistory();

   useEffect(() => {
      if(!signed) {
         histoty.push('/');
      }
   }, [histoty, signed])

   return (
      <Container>
         <Header userName={user?.name ? user?.name : "Usuário"}/>
      </Container>
   )
}

export default Dashboard;