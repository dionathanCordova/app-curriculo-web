import React, { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from "react";

import { Container, Content, AvatarInput } from "./styles";
import { Form } from '@unform/web';
import { FormHandles } from "@unform/core";
import { FiArrowLeft, FiCamera, FiFileText, FiLock, FiMail, FiPhone, FiUser, FiGlobe } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import * as Yup from 'yup';

import Input from "../../components/Input";
import Button from '../../components/Button';
import AuthProvider from "../../contexts/Authcontext";
import emptyAvatar from '../../assets/empty-avatar.png';
import api from "../../services/api";
import getValidationError from '../../utils/getValidationErrors';
import swal from "sweetalert";

interface UserProp {
   id: string | undefined;
}

const Profile: React.FC = () => {
   const formRef = useRef<FormHandles>(null);
   const [ userId, setUserId ] = useState<UserProp>();

   const { user, UpdateUser, signed } = useContext(AuthProvider);
   const history = useHistory();

   useEffect(() => {
      if(!signed) {
         history.push('/');
      }

      if(user) {
         setUserId(user);
      }
   }, [user, history, signed]);

   const handleChangeAvatar = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.files) {
         const formData = new FormData();
         formData.append('avatar', e.target.files[0]);
         const userUpdate = await api.patch(`users/avatar/${user.id}`, formData);

         console.log(userUpdate);
         UpdateUser(userUpdate.data);
      }
   }, [UpdateUser, user.id])

   const handleSubmit = useCallback( async (data) => {
      try {
         formRef.current?.setErrors({});

         const schema = Yup.object().shape({
            email: Yup.string().email('Informe um email válido').required('Informe um email válido'),
            name: Yup.string().required('Nome obrigatório'),
            old_password: Yup.string(),
            password: Yup.string().when('old_password', {
               is: (val: string | any[]) => !!val.length,
               then: Yup.string().required('Nova senha é obrigatória'),
               otherwise: Yup.string(),
            }),
            password_confirmation: Yup.string().when('old_password', {
               is: (val: string | any[]) => !!val.length,
               then: Yup.string().required('Nova senha é obrigatória'),
               otherwise: Yup.string(),
            }).oneOf(
               [Yup.ref('password'), null],
               'Confirmação incorreta'
            ),
            whatsapp: Yup.string(),
            idade: Yup.string(),
            cidade: Yup.string(),
            estado: Yup.string(),
            bairro: Yup.string(),
            bio: Yup.string(),
            midias: Yup.string(),
            genero: Yup.string()
         })

         await schema.validate(data, {
            abortEarly: false,
         })

         try {
            const response = await api.post(`update-user/${userId?.id}`, data)
            
            if(response.data.status) {
               UpdateUser(response.data.user);
               history.push('/dashboard');
            }
         } catch (error) {
            swal({
               title: "Ops!",
               text: "Possivelmente você está informando uma senha incorreta",
               icon: "warning",
            });
         }
      } catch (err) {
         const errorInner = JSON.stringify(err.inner);

         const errors = getValidationError(errorInner);
         formRef.current?.setErrors(errors);
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
               id: user?.id,
               email: user?.email,
               name: user?.name,
               whatsapp: user?.whatsapp,
               idade: user?.idade,
               cidade: user?.cidade,
               estado: user?.estado,
               bairro: user?.bairro,
               bio: user?.bio,
               midias: user?.midias,
               genero: user?.genero
            }} onSubmit={handleSubmit}> 

               <AvatarInput>
                  <img src={user.avatar ? `${process.env.REACT_APP_FILES}/${user.avatar}` : emptyAvatar} alt=""/>
                  <label htmlFor="avatar">
                     <FiCamera />
                     <input type="file" id="avatar" onChange={handleChangeAvatar}/>
                  </label>

               </AvatarInput>

               <h1>Meu perfil</h1>
            
               <Input name="name" icon={FiUser} placeholder="Nome"/> 
               <Input name="email" icon={FiMail} placeholder="E-mail"/> 

               <Input containerStyle={{'marginTop': 25}} type="password" name="old_password" icon={FiLock} placeholder="Senha atual"/> 
               <Input name="password" icon={FiLock} type="password" placeholder="Nova senha"/> 
               <Input name="password_confirmation" type="password" icon={FiLock} placeholder="Confirmar senha"/> 

               <Input containerStyle={{'marginTop': 25}} name="whatsapp" icon={FiPhone} placeholder="Whatsapp"/> 
               <Input name="idade" icon={FiUser} placeholder="Idade"/> 
               <Input name="genero" icon={FiUser} placeholder="Gênero"/> 
               <Input name="bio" icon={FiFileText} placeholder="bio"/> 
               <Input name="midias" icon={FiFileText} placeholder="Midias"/> 

               <Input containerStyle={{'marginTop': 25}} name="cidade" icon={FiGlobe} placeholder="Cidade"/> 
               <Input name="estado" icon={FiGlobe} placeholder="Estado"/> 
               <Input name="bairro" icon={FiGlobe} placeholder="Bairro"/> 

               <Button type="submit">Cadastrar</Button>
            </Form>
         </Content>
      </Container>
   );
};

export default Profile;
