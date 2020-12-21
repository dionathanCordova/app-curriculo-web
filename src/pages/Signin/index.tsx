import React from 'react'
import { FiChevronLeft, FiMail, FiLock } from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
   Container,
   Content,
   Background
} from './styles';

const Sigin = () => {
   return (
      <Container>
         <Content>
            <form action="">
               Começe a usar de graça
               <h1>Faça seu cadastro</h1>

               <Input name="email" icon={FiMail} type="E-mail" placeholder="E-mail" />
               <Input name="senha" icon={FiLock} type="password" placeholder="Senha"/>
               <Input name="confirm_senha" icon={FiLock} type="e-password" placeholder="Confirme a Senha"/>
               
               <Button type="submit">Entrar</Button>

               <a href="#">Esqueçi minha senha</a>
            </form>

            <a href="/">
               <FiChevronLeft />
               Voltar
            </a>
         </Content>
         <Background></Background>
      </Container>
   )
}

export default Sigin;