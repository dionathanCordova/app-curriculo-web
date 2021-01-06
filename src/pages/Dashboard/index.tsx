import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import AuthProvider from '../../contexts/Authcontext';
import { FiPlus, FiCode, FiPhoneCall } from 'react-icons/fi';
import { FaDoorOpen, FaCalculator } from 'react-icons/fa';

import { Container, Content, ContentHeader, ContentBody } from './styles';

const Dashboard: React.FC = () => {
   const {signed, user } = useContext(AuthProvider);
   const [userAvatar, setUserAvatar] = useState()
   const histoty = useHistory();

   useEffect(() => {
      if(!signed) {
         histoty.push('/');
      }

   }, [histoty, signed])

   return (
      <Container>
         <Header userName={user?.name ? user?.name : "Usuário"} pathImage={user?.avatar}/>

         <Content>
            <ContentHeader>
               <div>
                  <h1><strong> Currículos </strong></h1>
                  <h5>Organize seu currículos, todos serão separados por categoria</h5>
               </div>

               <button>
                  <FiPlus size={32} color="#FFF"/>
               </button>
            </ContentHeader>

            <ContentBody>
               <div className="card">
                  <h4>Programador</h4> 

                  <FiCode />
               </div>

               <div className="card">
                  <h4>Recepcionista</h4> 

                  <FiPhoneCall />
               </div>

               <div className="card">
                  <h4>Porteiro</h4> 

                  <FaDoorOpen />
               </div>

               <div className="card">
                  <h4>Contador</h4> 

                  <FaCalculator />
               </div>
            </ContentBody>
         </Content>
      </Container>
   )
}

export default Dashboard;