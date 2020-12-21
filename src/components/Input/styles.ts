import styled, { css } from 'styled-components';

interface ContainerProps  {
   isFocus: boolean;
   isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
   background: #FFF;
   border-radius: 6px;
   border: 0.001px solid #232129;
   padding:16px;
   color: #666360;

   display: flex;
   align-items: center;

   & + div {
      margin-top: 8px;
   }

   ${props => props.isFilled && css`
      color: #8558e3;
   `}
   
   ${props => props.isFocus && css`
      color: #8558e3;
      border-color: #8558e3;
   `}



   input {
      font-family: 'Amaranth', sans-serif;
      flex: 1;
      border: 0;
      background: transparent;
      color: #666360;

      &::placeholder{
         color: #666360;
      }
   }

   svg {
      margin-right: 16px;
   }
`;
