import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
   font-family: 'Amaranth', sans-serif;
`

export const Content = styled.div`
   width: 60%;
   margin:auto;
   padding-top: 100px;
`

export const ContentHeader = styled.div`
   display: flex;
   justify-content: space-between;
   align-items:center;

   div{
      font-size: 25px;
   }

   button{
      display:flex;
      justify-content: center;
      align-items:center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 0;
      background: #333;
      transition: background 0.2s;

      :hover{
         background: ${shade(0.5, '#FFF')};
      }
   }
`

export const ContentBody = styled.div`
   margin-top: 40px;
   font-size: 25px;

   display:grid;
   grid-template-columns: 1fr 1fr 1fr;
   grid-column-gap: 40px;

   .card {
      margin-top: 40px;
      min-height: 140px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 10px;
      padding: 20px;
      background: #FFF;
      border: 1px solid #ddd;
      box-shadow: 10px 10px 53px -17px rgba(0,0,0,0.75);
   }
`