import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
   font-family: "Amaranth", sans-serif;

   > header {
      height: 144px;
      background: #fff;

      display: flex;
      align-items: center;

      div {
         width: 100%;
         max-width: 1120px;
         margin: 0 auto;

         svg {
            color: #999591;
            width: 25px;
            height: 25px;
         }
      }
   }
`;

export const Content = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   margin: -150px auto 0;

   width: 100%;

   form {
      position: relative;

      margin: auto;
      margin-top: 200px;
      margin-bottom: 200px;

      width: 340px;
      display: flex;
      flex-direction: column;

      button.CadastroProfissao {
         border: 0;
         margin: 10px 0;
         display: flex;
         justify-content: center;
         align-items: center;
         border-radius: 5px;
         height: 40px;
         border: 0;
         background: #333;
         transition: background 0.2s;
         color: #fff;
         font-weight: 500;

         :hover {
            background: ${shade(0.5, "#FFF")};
         }
      }

      h1 {
         color: #000;
         margin-bottom: 24px;
         font-size: 20px;
         text-align: left;
      }

      h3 {
         margin-top: 20px;
         color: #000;
         margin-bottom: 24px;
         font-size: 15px;
         text-align: left;
      }

      a {
         color: #f4ede8;
         display: block;
         margin-top: 24px;
         text-decoration: none;
         transition: color 0.2s;

         &:hover {
            color: ${shade(0.2, "#f4ede8")};
         }
      }

      .cursos {
         margin-bottom: 20px;
      }

      .contentTrash {
         button {
            align-self: flex-end;
            margin-left: auto;
            background: red;
         }
         /* display: flex;
         flex-direction: row;
         background: red;
         align-items: flex-end;
         justify-content: flex-end; */
      }

      .boxInputDinamico button {
         border: none;
         margin-left: auto;
      }
   }
`;

export const BoxInfo = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;

   button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 0;
      background: #333;
      transition: background 0.2s;

      :hover {
         background: ${shade(0.5, "#FFF")};
      }
   }
`;
