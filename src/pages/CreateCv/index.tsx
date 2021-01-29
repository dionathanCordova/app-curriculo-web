import React, {
   useCallback,
   useContext,
   useEffect,
   useRef,
   useState,
} from "react";

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
import AuthContext from "../../contexts/Authcontext";
import swal from "sweetalert";

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
   atribuicoes: string;
   salario_final: string;
   data_fim: string;
   data_inicio: string;
   atual: boolean;
   ferramentas: string;
}

interface CursoProp {
   id: number;
   titulo: string;
}

const CreateCv: React.FC = () => {
   const { user } = useContext(AuthContext);

   const history = useHistory();

   const formRef = useRef<FormHandles>(null);
   const [ hiddenNewJobTitle, setHiddenNewJobTitle ] = useState(true);
   const [ profissaoCreate, setProfissaoCreate ] = useState('');

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
         atribuicoes: "",
         salario_final: "",
         data_fim: "",
         data_inicio: "",
         atual: false,
         ferramentas: "",
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

   const handleSubmit = useCallback(
      async (data) => {
         const profissao_id = data.profissao;
         console.log(profissao_id);

         console.log(data);
         console.log(escolaridade);
         console.log(experiencia);
         console.log(cursos);

         // const createEscolaridade = await api.post(
         //    `escolaridade/create/${user.id}`,
         //    {
         //       escolaridade,
         //    }
         // );

         const createExperiencia = await api.post(
            `experiencia/create/${user.id}`,
            {
               experiencia,
               profissao_id
            }
         );

         if(createExperiencia.data.status === 'error') {
            swal({
               title: "Ops!",
               text: createExperiencia.data.message,
               icon: "warning",
            });
         }

         // if (createEscolaridade && createExperiencia) {
         //    history.push("/dashboard");
         // }

         console.log(createExperiencia.data.status);
      },
      [escolaridade, experiencia, cursos]
   );

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
            empresa: "",
            salario_final: "",
            cargo: "",
            atribuicoes: "",
            data_fim: "",
            data_inicio: "",
            atual: false,
            ferramentas: "",
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

   const handleChangeFieldProfissao = useCallback(() => {
      setHiddenNewJobTitle(!hiddenNewJobTitle);

      if(!hiddenNewJobTitle) {
         setProfissaoCreate('');
      }
   }, [hiddenNewJobTitle])

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
                  isHidden={!hiddenNewJobTitle}
                  name="profissao"
                  jobsData={jobs}
               />

               {/* <Input
                  isHidden={hiddenNewJobTitle}
                  onChange={(e) => setProfissaoCreate(e.target.value)}
                  value={profissaoCreate}
                  name="profissaoCreate"
                  placeholder="Nova profissão"
               />

               <button type="button" onClick={handleChangeFieldProfissao} className="CadastroProfissao">
                  {hiddenNewJobTitle ? 'Cadastrar nova profissão' : ' Usar profissões cadastradas'}
               </button> */}

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
                              placeholder="Empresa"
                              defaultValue={element.empresa}
                              onChange={(e) => {
                                 const empresa = e.target.value;
                                 setExperiencia((current) =>
                                    produce(current, (v) => {
                                       v[index].empresa = empresa;
                                    })
                                 );
                              }}
                           />

                           <Input
                              name="atribuicao"
                              placeholder="Atribuíções da função"
                              defaultValue={element.atribuicoes}
                              onChange={(e) => {
                                 const atribuicoes = e.target.value;
                                 setExperiencia((current) =>
                                    produce(current, (v) => {
                                       v[index].atribuicoes = atribuicoes;
                                    })
                                 );
                              }}
                           />

                           <Input
                              name="atribuicao"
                              placeholder="Atribuíções da função"
                              defaultValue={element.ferramentas}
                              onChange={(e) => {
                                 const ferramentas = e.target.value;
                                 setExperiencia((current) =>
                                    produce(current, (v) => {
                                       v[index].ferramentas = ferramentas;
                                    })
                                 );
                              }}
                           />

                           <Input
                              name="salarioFinal"
                              placeholder="Salário Final"
                              defaultValue={element.salario_final}
                              onChange={(e) => {
                                 const salario_final = e.target.value;
                                 setExperiencia((current) =>
                                    produce(current, (v) => {
                                       v[index].salario_final = salario_final;
                                    })
                                 );
                              }}
                           />

                           <Input
                              label="Data de inicio"
                              name="data_inicio"
                              type="date"
                              placeholder="Tempo de Serviço"
                              id="data_inicio"
                              onChange={(e) => {
                                 const data_inicio = e.target.value;
                                 setExperiencia((current) =>
                                    produce(current, (v) => {
                                       v[index].data_inicio = data_inicio;
                                    })
                                 );
                              }}
                           />

                           <Input
                              label="Data de termino"
                              name="data_fim"
                              type="date"
                              placeholder="Tempo de Serviço"
                              id="data_fim"
                              onChange={(e) => {
                                 const data_fim = e.target.value;
                                 setExperiencia((current) =>
                                    produce(current, (v) => {
                                       v[index].data_fim = data_fim;
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
