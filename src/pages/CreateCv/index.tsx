import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { current, produce } from "immer";

import {
   FiArrowLeft,
   FiLock,
   FiMail,
   FiUser,
   FiBriefcase,
   FiPlus,
   FiTrash,
} from "react-icons/fi";

import { Container, Content, BoxInfo } from "./styles";

import Input from "../../components/Input";
import SelectInput from "../../components/SelectInput";
import Button from "../../components/Button";
import api from "../../services/api";
import EscolaridadeFields from "../../components/EscolaridadeFields";
import { string } from "yup";
import AuthContext from "../../contexts/Authcontext";

interface JobProps {
   id: string;
   name: string;
   icon_path: string;
}

interface EscolaridadeProp {
   id: number;
   instituicao: string;
   curso: string;
   situacao: string;
}

interface ExperienciaProp {
   id: number;
   cargo: string;
   empresa: string;
   atribuicao: string;
   salarioFinal: string;
   tempoServico: string;
}

interface CursoProp {
   id: number;
   titulo: string;
}

const CreateCv: React.FC = () => {
   const { user } = useContext(AuthContext);

   const history = useHistory();

   const formRef = useRef<FormHandles>(null);
   const [escolaridadeIndex, setEscolaridadeIndex] = useState(0);
   const [escolaridadeIndexArray, setEscolaridadeIndexArray] = useState([0]);

   const [experienciaIndex, setExperienciaIndex] = useState(0);
   const [experienciaIndexArray, setExperienciaIndexArray] = useState([0]);

   const [cursosIndex, setCursosIndex] = useState(0);
   const [cursosIndexArray, setCursosIndexArray] = useState([0]);

   const [escolaridade, setEscolaridade] = useState<EscolaridadeProp[]>([
      { id: 0, instituicao: "", curso: "", situacao: "" },
   ]);
   const [experiencia, setExperiencia] = useState<ExperienciaProp[]>([
      {
         id: 0,
         cargo: "",
         empresa: "",
         atribuicao: "",
         salarioFinal: "",
         tempoServico: "",
      },
   ]);
   const [cursos, setCursos] = useState<CursoProp[]>([{ id: 0, titulo: "" }]);

   const [jobs, setJobs] = useState<JobProps[]>([
      {
         id: "1",
         name: "selecione",
         icon_path: "",
      },
   ]);

   const handleSubmit = useCallback(async (data) => {
      console.log(data);
      console.log(escolaridade);
      console.log(experiencia);
      console.log(cursos);

      const createEscolaridade = await api.post(`escolaridade/create/${user.id}`, {
         escolaridade
      });

      if(createEscolaridade) {
         history.push('/dashboard');
      }
      
      console.log(createEscolaridade);
     
      // escolaridade/create
      // console.log("teste");

      // console.log(escolaridadeIndexArray);
   }, [escolaridade, experiencia, cursos]);

   useEffect(() => {
      (async function anyNameFunction() {
         const job = await api.get("/profissoes");

         setJobs(job.data);
      })();
   }, []);

   const handleAddEscolaridadeField = useCallback(() => {
      const idGenerate = escolaridadeIndex + 1;

      setEscolaridadeIndexArray([...escolaridadeIndexArray, idGenerate]);
      setEscolaridadeIndex(idGenerate);

      setEscolaridade((current) => [
         ...current,
         {
            id: idGenerate,
            instituicao: "",
            curso: "",
            situacao: "",
         },
      ]);
   }, [escolaridadeIndex, escolaridade]);

   const handleAddExperienciaField = useCallback(() => {
      const idGerenate = experienciaIndex + 1;

      setExperienciaIndex(idGerenate);
      setExperienciaIndexArray([...experienciaIndexArray, idGerenate]);

      setExperiencia((current) => [
         ...current,
         {
            id: idGerenate,
            atribuicao: "",
            cargo: "",
            empresa: "",
            salarioFinal: "",
            tempoServico: "",
         },
      ]);
   }, [experienciaIndex, experiencia]);

   const handleAddCurso = useCallback(() => {
      const idGerenate = cursosIndex + 1;

      setCursosIndex(idGerenate);
      setCursosIndexArray([...cursosIndexArray, idGerenate]);

      setCursos((current) => [
         ...current,
         {
            id: idGerenate,
            titulo: "",
         },
      ]);
   }, [cursosIndex, cursos]);

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
               <SelectInput
                  icon={FiBriefcase}
                  name="profissao"
                  jobsData={jobs}
               />
               <BoxInfo>
                  <h3>Escolaridade</h3>
                  <button onClick={handleAddEscolaridadeField} type="button">
                     <FiPlus size={32} color="#FFF" />
                  </button>
               </BoxInfo>{" "}
               <hr />
               <br />
               {escolaridade.map((element, index) => {
                  return (
                     <div key={element.id} className="boxInputDinamico">
                        <div className="escolatidadeContentMain">
                           <div className="contentTrash">
                              <button
                                 onClick={() =>
                                    setEscolaridade((current) =>
                                       current.filter(
                                          (x) => x.id !== element.id
                                       )
                                    )
                                 }
                              >
                                 <FiTrash color="#D21F3C" />
                              </button>
                           </div>

                           <Input
                              defaultValue={element.instituicao}
                              name="instituicao"
                              icon={FiUser}
                              placeholder="Instituição"
                              onChange={(e) => {
                                 const instituicao = e.target.value;
                                 setEscolaridade((current) =>
                                    produce(current, (v) => {
                                       v[index].instituicao = instituicao;
                                    })
                                 );
                              }}
                           />

                           <Input
                              defaultValue={element.curso}
                              name="curso"
                              icon={FiUser}
                              placeholder="Curso"
                              onChange={(e) => {
                                 const curso = e.target.value;
                                 setEscolaridade((current) =>
                                    produce(current, (v) => {
                                       v[index].curso = curso;
                                    })
                                 );
                              }}
                           />

                           <Input
                              defaultValue={element.situacao}
                              name="situação"
                              icon={FiUser}
                              placeholder="Situação: ex cursando ..."
                              onChange={(e) => {
                                 const situacao = e.target.value;
                                 setEscolaridade((current) =>
                                    produce(current, (v) => {
                                       v[index].situacao = situacao;
                                    })
                                 );
                              }}
                           />
                        </div>{" "}
                        <br />
                     </div>
                  );
               })}
               <BoxInfo>
                  <h3>Experiência</h3>
                  <button onClick={handleAddExperienciaField} type="button">
                     <FiPlus size={32} color="#FFF" />
                  </button>
               </BoxInfo>{" "}
               <hr />
               <br />
               {experiencia.map((element, index) => {
                  return (
                     <div key={element.id} className="boxInputDinamico">
                        <div className="experiencia">
                           <div className="contentTrash">
                              <button
                                 onClick={() =>
                                    setExperiencia((current) =>
                                       current.filter(
                                          (x) => x.id !== element.id
                                       )
                                    )
                                 }
                              >
                                 <FiTrash color="#D21F3C" />
                              </button>
                           </div>

                           <Input
                              name="cargo"
                              icon={FiUser}
                              placeholder="Cargo"
                              defaultValue={element.cargo}
                              onChange={(e) => {
                                 const cargo = e.target.value;
                                 setExperiencia((current) =>
                                    produce(current, (v) => {
                                       v[index].cargo = cargo;
                                    })
                                 );
                              }}
                           />

                           <Input
                              name="empresa"
                              icon={FiUser}
                              placeholder="Empresa"
                              defaultValue={element.empresa}
                              onChange={(e) => {
                                 const cargo = e.target.value;
                                 setExperiencia((current) =>
                                    produce(current, (v) => {
                                       v[index].empresa = cargo;
                                    })
                                 );
                              }}
                           />

                           <Input
                              name="atribuicao"
                              icon={FiUser}
                              placeholder="Atribuíções da função"
                              defaultValue={element.atribuicao}
                              onChange={(e) => {
                                 const cargo = e.target.value;
                                 setExperiencia((current) =>
                                    produce(current, (v) => {
                                       v[index].atribuicao = cargo;
                                    })
                                 );
                              }}
                           />

                           <Input
                              name="salarioFinal"
                              icon={FiUser}
                              placeholder="Salário Final"
                              defaultValue={element.salarioFinal}
                              onChange={(e) => {
                                 const cargo = e.target.value;
                                 setExperiencia((current) =>
                                    produce(current, (v) => {
                                       v[index].salarioFinal = cargo;
                                    })
                                 );
                              }}
                           />

                           <Input
                              name="tempoServico"
                              icon={FiUser}
                              placeholder="Tempo de Serviço"
                              defaultValue={element.tempoServico}
                              id="tempoServico"
                              onChange={(e) => {
                                 const cargo = e.target.value;
                                 setExperiencia((current) =>
                                    produce(current, (v) => {
                                       v[index].tempoServico = cargo;
                                    })
                                 );
                              }}
                           />
                        </div>{" "}
                        <br />
                     </div>
                  );
               })}
               <BoxInfo>
                  <h3>Cursos</h3>
                  <button onClick={handleAddCurso} type="button">
                     <FiPlus size={32} color="#FFF" />
                  </button>
               </BoxInfo>{" "}
               <hr />
               <br />
               {/* {cursos.map((element, index) => {
                  return (
                     <div key={element.id} className="boxInputDinamico">
                        <div className="cursos">
                           <div className="contentTrash">
                              <button
                                 onClick={() =>
                                    setCursos((current) =>
                                       current.filter(
                                          (x) => x.id !== element.id
                                       )
                                    )
                                 }
                              >
                                 <FiTrash color="#D21F3C" />
                              </button>
                           </div>
                           <Input
                              name="titulo"
                              icon={FiUser}
                              placeholder="Nome do curso"
                              defaultValue={element.titulo}
                              onChange={(e) => {
                                 const titulo = e.target.value;
                                 setCursos((current) =>
                                    produce(current, (v) => {
                                       v[index].titulo = titulo;
                                    })
                                 );
                              }}
                           />
                        </div>
                     </div>
                  );
               })} */}
               <Button type="submit">Cadastrar</Button>
            </Form>
         </Content>
      </Container>
   );
};

export default CreateCv;
