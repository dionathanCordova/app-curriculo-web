import styled from 'styled-components';

export const Container = styled.div`
`
export const Content = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   padding: 3% 10%;

   img{
      width: 140px;
   }
`

export const BoxSign = styled.div`

   /* width: 10rem; */

   display: flex;
   flex-direction: row;
   justify-content: space-between;

   /* font-family: 'Concert One', cursive; */
   /* font-family: 'Mitr', sans-serif; */

   button {
      font-size: 22px;
      font-family: 'Amaranth', sans-serif;
      margin-left: 20px;
      height: 40px;
      padding: 0 40px;
      background: #fcfcff;
      border: 0;
      -webkit-box-shadow: 10px 10px 53px -27px rgba(0,0,0,0.75);
         -moz-box-shadow: 10px 10px 53px -27px rgba(0,0,0,0.75);
         box-shadow: 10px 10px 53px -27px rgba(0,0,0,0.75);

      :hover{
         background: #e97b3d;
         color: #fcfcff;
         border-radius: 20px;
        
      }

   }

`