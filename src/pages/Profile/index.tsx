import React, { useCallback, useContext, useRef } from "react";

import { Container, Content, AvatarInput } from "./styles";
import { Form } from '@unform/web';
import { FormHandles } from "@unform/core";
import Input from "../../components/Input";
import Button from '../../components/Button';
import { FiArrowLeft, FiCamera, FiFileText, FiLock, FiMail, FiPhone, FiUser } from "react-icons/fi";
import AuthProvider from "../../contexts/Authcontext";
import emptyAvatar from '../../assets/empty-avatar.png';
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
   const formRef = useRef<FormHandles>(null);
   const { user } = useContext(AuthProvider);

   const handleSubmit = useCallback(() => {

   }, [])

   return (
      <Container>
         <header>
            <div>
               <Link to="dashboard">
                  <FiArrowLeft />
               </Link>
            </div>
         </header>
         <Content>
            <Form ref={formRef} initialData={{
               email: user.email,
               name: user.name,
               whatsapp: user.whatsapp,
               idade: user.idade,
               cidade: user.cidade,
               estado: user.estado,
               bairro: user.bairro,
               bio: user.bio,
               midias: user.midias,
               genero: user.genero
            }} onSubmit={handleSubmit}> 

               <AvatarInput>
                  <img src={user.avatar ? user.avatar : emptyAvatar} alt=""/>
                  <button type="button">
                     <FiCamera />
                  </button>
               </AvatarInput>

               <h1>Meu perfil</h1>

               <Input name="nome" icon={FiUser} placeholder="Nome"/> 
               <Input name="email" icon={FiMail} placeholder="E-mail"/> 

               <Input containerStyle={{'marginTop': 25}} name="old_password" icon={FiLock} placeholder="Senha atual"/> 
               <Input name="password" icon={FiLock} placeholder="Nova senha"/> 
               <Input name="password_confirmation" icon={FiLock} placeholder="Confirmar senha"/> 


               <Input name="whatsapp" icon={FiPhone} placeholder="Whatsapp"/> 
               <Input name="idade" icon={FiUser} placeholder="Idade"/> 
               <Input name="genero" icon={FiUser} placeholder="Gênero"/> 
               <Input name="bio" icon={FiFileText} placeholder="bio"/> 
               <Input name="midias" icon={FiFileText} placeholder="Midias"/> 
               <Input name="cidade" icon={FiUser} placeholder="Cidade"/> 
               <Input name="estado" icon={FiUser} placeholder="Estado"/> 
               <Input name="bairro" icon={FiUser} placeholder="Bairro"/> 

               <Button type="submit">Cadastrar</Button>
            </Form>
         </Content>
      </Container>
   );
};

export default Profile;
