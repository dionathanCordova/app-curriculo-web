import styled from 'styled-components';
import { shade } from 'polished';

import BgSign from '../../assets/bgSign.jpg';

export const Container = styled.div`
   height: 100vh;
   display: flex;
   align-items: stretch;
`

export const Content = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 100%;
   max-width: 700px;
   font-family: 'Amaranth', sans-serif;


   h1{
      margin-bottom: 24px;
      font-family: 'Amaranth', sans-serif;
   }

   form{
      margin: 80px 0;
      width: 340px;
      text-align: center;

      a {
         color: #232129;
         display: block;
         margin-top: 24px;
         text-decoration: none;
         transition: color 0.2s;

         :hover{
            color: ${shade(0.5, '#fff')}
         }
      }
   }

   > a {
      color: #8558e3;
      display: block;
      margin-top: 10px;
      text-decoration: none;
      transition: color 0.2s;
      margin-bottom: 100px;

      display: flex;
      align-items: center;

      svg {
         margin-right: 16px;
      }

      :hover{
         color: ${shade(0.5, '#8558e3')}
      }
   }
`

export const Background = styled.div`
   flex: 1;
   background: url(${BgSign}) no-repeat center;
   background-size: cover;
`
