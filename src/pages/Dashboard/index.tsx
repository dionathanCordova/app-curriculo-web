import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import AuthProvider from '../../contexts/Authcontext';
import { FiPlus, FiCode, FiPhoneCall, FiTrash } from 'react-icons/fi';
import { FaDoorOpen, FaCalculator } from 'react-icons/fa';

import Code from '../../assets/ICON_JOBS/code.svg';

import { Container, Content, ContentHeader, ContentBody } from './styles';
import api from '../../services/api';

interface ProfissoesProps {
   id: string;
   name: string;
   icon_path: string;
}


interface CurriculoProps {
   id: string;
   user_id: string;
   profissao_id: string;
   profissao: ProfissoesProps
}

const Dashboard: React.FC = () => {
   const {signed, user } = useContext(AuthProvider);
   const [ profissoes, setProfissoes ] = useState<ProfissoesProps[]>([]);
   const [ curriculos, setCurriculos ] = useState<CurriculoProps[]>([]);
   const histoty = useHistory();

   useEffect(() => {
      if(!signed) {
         histoty.push('/');
      }
     
      async function getCurriculos() {
         await api.get(`curriculo/user/${user.id}`).then(response => {
            setCurriculos(response.data);
         })
      } 

      getCurriculos();

   }, [histoty, signed])

   const handleAddCurriculo = useCallback(() => {
      histoty.push('/create-cv');
   }, [histoty]);

   const handleRemoveCurriculo = useCallback(async(id: string) => {
      console.log(id);
      const responseRemove = await api.delete(`/curriculo/remove/${id}`);
      console.log(responseRemove);
   }, [histoty]);

   return (
      <Container>
         <Header userName={user?.name ? user?.name : "Usuário"} pathImage={user?.avatar}/>

         <Content>
            <ContentHeader>
               <div>
                  <h1><strong> Currículos </strong></h1>
                  <h5>Organize seu currículos, todos serão separados por categoria</h5>
               </div>

               <button onClick={handleAddCurriculo}>
                  <FiPlus size={32} color="#FFF"/>
               </button>
            </ContentHeader>

            <ContentBody>
               {curriculos.map(curr => {
                  return (
                     <div className="card" key={curr.profissao.id}>
                        <div className="card-header">
                           <button onClick={() => handleRemoveCurriculo(curr.id)} ><FiTrash /> </button>
                        </div>
                        <div className="card-body">
                           <h4>{curr.profissao.name}</h4> 
                           <img src={`${process.env.REACT_APP_FILES}${curr.profissao.icon_path}`} alt=""/>
                        </div>
                     </div>
                  )
               })}
               
            </ContentBody>
         </Content>
      </Container>
   )
}

export default Dashboard;