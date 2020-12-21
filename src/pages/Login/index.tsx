import React, { useCallback } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';

import {
   Container,
   Content,
   Background
} from './styles';

const Login = () => {
   const handleSubmit = useCallback((data) => {
      console.log(data)
   }, [])

   return (
      <Container>
         <Content>
            <Form action="" onSubmit={handleSubmit}>
               Começe a usar de graça
               <h1>Faça seu login</h1>
               <Input name="email" placeholder="E-mail" icon={FiMail} type="E-mail"/>
               <Input name="senha" placeholder="Senha" icon={FiLock} type="password"/>
               
               <Button type="submit">
                  Entrar
               </Button>

               <a href="#">Esqueçi minha senha</a>
            </Form>

            <Link to="/signin">
               <FiLogIn />
               Criar conta
            </Link>
         </Content>
         <Background></Background>
      </Container>
   )
}

export default Login;