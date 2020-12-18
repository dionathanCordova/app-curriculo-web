import React from 'react'
import { FiLogIn } from 'react-icons/fi';

import {
   Container,
   Content,
   Background
} from './styles';

const Sigin = () => {
   return (
      <Container>
         <Content>
            Começe a usar de graça
            <h1>Faça seu cadastro</h1>
            <form action="">
               <input type="E-mail" placeholder="E-mail"/>

               <input type="password" placeholder="Senha"/>
               
               <button type="submit">Entrar</button>

               <a href="#">Esqueçi minha senha</a>
            </form>

            <a href="login">
               <FiLogIn />
               Criar conta
            </a>
         </Content>
         <Background></Background>
      </Container>
   )
}

export default Sigin;