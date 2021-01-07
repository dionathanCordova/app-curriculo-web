import React, { useCallback, useRef } from "react";
import { FormHandles } from "@unform/core";
import { FiArrowLeft, FiLock, FiMail, FiUser, FiBriefcase } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Form } from '@unform/web';

import { Container, Content } from "./styles";
import Input from "../../components/Input";
import SelectInput from "../../components/SelectInput";
import Button from "../../components/Button";

const CreateCv: React.FC = () => {
   const formRef = useRef<FormHandles>(null);

   const handleSubmit = useCallback((data) => {
      console.log(data);
      console.log('teste');
   }, []);

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
            <Form ref={formRef} onSubmit={handleSubmit}>
               <h1>Cadastro de currículo</h1>

               <SelectInput icon={FiBriefcase} name="profissao"/>

               <Input name="name" icon={FiUser} placeholder="Nome"/> 
               <Input name="email" icon={FiMail} placeholder="E-mail"/> 

               <Input containerStyle={{'marginTop': 25}} type="password" name="old_password" icon={FiLock} placeholder="Senha atual"/> 

               <Button type="submit">Cadastrar</Button>

            </Form>
         </Content>
      </Container>
   );
};

export default CreateCv;
