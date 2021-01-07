import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
   font-family: 'Amaranth', sans-serif;

   > header {
      height: 144px;
      background: #FFF;

      display: flex;
      align-items:center;

      div{
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

   form{
      position: relative;
      align-self: center;
      
      margin: auto;
      margin-top: 200px;

      width:340px;
      text-align:center;
      display: flex;
      flex-direction: column;

      h1{

         color: #000;
         margin-bottom: 24px;
         font-size: 20px;
         text-align: left;
      }

      a {
         color: #f4ede8;
         display: block;
         margin-top: 24px;
         text-decoration: none;
         transition: color 0.2s;

         &:hover{
            color: ${shade(0.2, "#f4ede8")};
         }
      }
   }
`