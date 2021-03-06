import styled from 'styled-components';
import {shade}  from 'polished';

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
      margin: 80px 0;
      width:340px;
      text-align:center;
      display: flex;
      flex-direction: column;

      div{
         display: flex;
         flex-direction: row;
      }

      h1{
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

export const AvatarInput = styled.div`

   margin-bottom: 32px;
   position: relative;
   align-self: center;

   img{
      max-width: 150px;
      max-height: 150px;
      border-radius: 50%;
      min-height: 150px;
      min-width: 150px;
   }

   place-content: center;

   label{
      position: absolute;
      width: 48px;
      height: 48px;
      background: #ff9000;
      border-radius: 60%;
      right: 0;
      bottom: 0;
      border: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;

      input {
         display: none;
      }

      svg {
         width: 20px;
         color:#FFF;
         height: 20px;
      }

      &:hover{
         background: ${shade(0.2, '#ff9000')}
      }
   }
`