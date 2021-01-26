import styled, { css } from 'styled-components';

import Tooltip from '../../components/Tooltip';

interface ContainerProps  {
   isFocus: boolean;
   isFilled: boolean;
   isErrored: boolean;
}

export const Label = styled.label`
`
export const Container = styled.div<ContainerProps>`
   background: #FFF;
   border-radius: 6px;
   border: 0.001px solid #232129;
   padding:16px;
   margin: 10px 0;
   color: #666360;

   display: flex;
   align-items: center;

   & + div {
      margin-top: 8px;
   }

   ${props => props.isErrored && css`
      border-color: #c53030;
   `}

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

export const Error = styled(Tooltip)`
   height: 20px;
   svg {
      margin: 0;
      margin-left: 16px;
   }

   span{
      background: #c53030;
      color: #FFF;

      &::before{
         border-color: #c53030 transparent;
      }
   }
`