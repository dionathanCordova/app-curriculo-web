import React, { useCallback, useContext, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup'

import getValidationError from '../../utils/getValidationErrors';
import AuthProvider from '../../contexts/Authcontext';

import {
   Container,
   Content,
   Background
} from './styles';

interface DataProps{
   email: string;
   senha: string;
}

const Login = () => {
   const formRef = useRef<FormHandles>(null);

   const { SignIn } = useContext(AuthProvider);
   const history = useHistory();

   const handleSubmit = useCallback( async (data: DataProps) => {
      try {

         const { email, senha } = data;

         formRef.current?.setErrors({});

         const schema = Yup.object().shape({
            email: Yup.string().email('Digite um email valido').required('Email é obrigatorio'),
            senha: Yup.string().min(6, 'A senha deve contém no minimo 6 caracteres')
         });
   
         await schema.validate(data, {
            abortEarly: false,
         });

         const sign = await SignIn(email, senha);
         if(sign.status) {
            history.push('dashboard');
         }
      } catch (err) {
         const errorInner = JSON.stringify(err.inner);

         const errors = getValidationError(errorInner);
         formRef.current?.setErrors(errors);
      }
   }, [SignIn])

   return (
      <Container>
         <Content>
            <Form ref={formRef} onSubmit={handleSubmit}>
               Começe a usar de graça
               <h1>Faça seu login</h1>
               <Input name="email" placeholder="E-mail" icon={FiMail} type="E-mail"/>
               <Input name="senha" placeholder="Senha" icon={FiLock} type="password"/>
               
               <Button type="submit">
                  Entrar
               </Button>

               <a href="/">Esqueçi minha senha</a>
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