import React, { useCallback, useContext, useRef } from "react";
import { FiChevronLeft, FiMail, FiLock } from "react-icons/fi";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import getValidationError from "../../utils/getValidationErrors";
import AuthProvider from "../../contexts/Authcontext";
import swal from "sweetalert";

import { Container, Content, Background } from "./styles";

import api from "../../services/api";
import { useHistory } from "react-router-dom";
interface DataProps {
   email: string;
   senha: string;
   confirm_senha: string;
}

const Sigin = () => {
   const formRef = useRef<FormHandles>(null);
   const { SignIn } = useContext(AuthProvider);
   const history = useHistory();

   const handleSubmit = useCallback(
      async (data: DataProps) => {
         try {
            const { email, senha, confirm_senha } = data;

            const schema = Yup.object().shape({
               email: Yup.string()
                  .email("Digite um email valido")
                  .required("Email é obrigatorio"),
               senha: Yup.string().min(
                  6,
                  "A senha deve ter no mínimo 6 caracteres"
               ),
               confirm_senha: Yup.string().min(
                  6,
                  "A senha deve ter no mínimo 6 caracteres"
               ),
            });

            await schema.validate(data, {
               abortEarly: false,
            });

            if (senha === confirm_senha) {
               const user = await api.post("users-create", {
                  email,
                  password: senha,
               });

               if (user.data.status === 200) {
                  const sign = await SignIn(user.data.user.user.email, senha);
                  console.log(sign);
                  history.push("dashboard");
               }
            } else {
               swal({
                  title: "Ops!",
                  text: "As senhas não estão iguais!",
                  icon: "warning",
               });
            }
         } catch (error) {
            const errorInner = JSON.stringify(error.inner);

            const errors = getValidationError(errorInner);
            formRef.current?.setErrors(errors);
         }
      },
      [SignIn, history]
   );

   return (
      <Container>
         <Content>
            <Form ref={formRef} onSubmit={handleSubmit}>
               Começe a usar de graça
               <h1>Faça seu cadastro</h1>
               <Input
                  name="email"
                  icon={FiMail}
                  type="E-mail"
                  placeholder="E-mail"
               />
               <Input
                  name="senha"
                  icon={FiLock}
                  type="password"
                  placeholder="Senha"
               />
               <Input
                  name="confirm_senha"
                  icon={FiLock}
                  type="e-password"
                  placeholder="Confirme a Senha"
               />
               <Button type="submit">Entrar</Button>
               <a href="#">Esqueçi minha senha</a>
            </Form>

            <a href="/">
               <FiChevronLeft />
               Voltar
            </a>
         </Content>
         <Background></Background>
      </Container>
   );
};

export default Sigin;
