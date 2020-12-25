import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import AuthProvider from '../../contexts/Authcontext';

import { Container } from './styles';

const Dashboard: React.FC = () => {
   const {signed} = useContext(AuthProvider);
   const histoty = useHistory();

   useEffect(() => {
      if(!signed) {
         histoty.push('/');
      }
   }, [])

   return (
      <Container>
         <Header />
         teste
      </Container>
   )
}

export default Dashboard;