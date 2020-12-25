import styled from 'styled-components';

export const Container = styled.div`
   position: relative;

   span{
      width: 160px;
      background: #8558e3;
      padding: 8px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      opacity: 0;
      transition: opacity 0.4s;
      bottom: 100%;

      position: absolute;
      bottom: calc(100% + 12px);
      left: 50%;
      transform: translateX(-50%); 
      visibility: hidden;

      color: #FFF;

      &::before{
         content: '';
         border-style: solid;
         border-color: #8558e3 transparent;
         border-width: 6px 6px 0 6px;
         bottom: 20px;
         top: 100%;
         position: absolute;
         left: 51%;
         /* transform: translateX(-50%);  */
      }
   }

   &:hover span {
      opacity: 1;
      visibility: visible;
   }
`;
