import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
   button{
      background: #8558e3;
      height: 56px;
      border-radius:10px;
      border: 0;
      padding: 0 16px;
      color:#FFF;
      width: 100%;
      font-weight: 600;
      margin-top: 16px;
      transition: background 0.2s;
      font-family: 'Amaranth', sans-serif;
   
   
      :hover{
         background: ${shade(0.2, '#8558e3')}
      }  
   }
`;
