import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

import { Container, Content, AvatarInput } from "./styles";
import { Form } from '@unform/web';
import { FormHandles } from "@unform/core";
import Input from "../../components/Input";
import Button from '../../components/Button';
import { FiArrowLeft, FiCamera, FiFileText, FiLock, FiMail, FiPhone, FiUser, FiGlobe } from "react-icons/fi";
import AuthProvider from "../../contexts/Authcontext";
import emptyAvatar from '../../assets/empty-avatar.png';
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

interface UserProp {
   id: string | undefined;
}

const Profile: React.FC = () => {
   const [ userId, setUserId ] = useState<UserProp>();
   const formRef = useRef<FormHandles>(null);
   const { user, UpdateUser } = useContext(AuthProvider);
   const history = useHistory();

   useEffect(() => {
      if(user) {
         setUserId(user);
      }
   }, [user]);

   const handleSubmit = useCallback( async (data) => {
      const response = await api.post(`update-user/${userId?.id}`, data)
      if(response.data.status) {
         UpdateUser(response.data.user);
         history.push('/dashboard');
      }
   }, [userId, history, UpdateUser])

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
               id: user.id,
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
            
               <Input name="name" icon={FiUser} placeholder="Nome"/> 
               <Input name="email" icon={FiMail} placeholder="E-mail"/> 

               <Input containerStyle={{'marginTop': 25}} type="password" name="old_password" icon={FiLock} placeholder="Senha atual"/> 
               <Input name="password" icon={FiLock} type="password" placeholder="Nova senha"/> 
               <Input name="password_confirmation" type="password" icon={FiLock} placeholder="Confirmar senha"/> 

               <Input name="whatsapp" icon={FiPhone} placeholder="Whatsapp"/> 
               <Input name="idade" icon={FiUser} placeholder="Idade"/> 
               <Input name="genero" icon={FiUser} placeholder="Gênero"/> 
               <Input name="bio" icon={FiFileText} placeholder="bio"/> 
               <Input name="midias" icon={FiFileText} placeholder="Midias"/> 
               <Input name="cidade" icon={FiGlobe} placeholder="Cidade"/> 
               <Input name="estado" icon={FiGlobe} placeholder="Estado"/> 
               <Input name="bairro" icon={FiGlobe} placeholder="Bairro"/> 

               <Button type="submit">Cadastrar</Button>
            </Form>
         </Content>
      </Container>
   );
};

export default Profile;
