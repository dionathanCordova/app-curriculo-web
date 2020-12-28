import styled from 'styled-components';

export const Container = styled.div`
`
export const Content = styled.div`
   /* display: flex; */
   /* flex-direction: row; */
   /* justify-content: space-around; */

   /* div {
      display: flex;
      flex-direction: row;
   } */

   padding: 32px 0;
   background: #FFF;
`
export const Profile = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   margin-left: 80px;   

   img{
      border-radius: 50%;
      width: 60px;
      height: 60px;
   }

   div {
      font-family: 'Amaranth', sans-serif;
      margin-left: 16px;

      span{ 
         color: #3339;
      }

      a {
         text-decoration: none;
         color: #000;

         &:hover{
            opacity: 0.3;
         }
      }
   }
`

export const HeaderContent = styled.div`
   max-width: 1120px;
   margin: 0 auto;
   display: flex;
   align-items: center;

   button {
      margin-left: auto;
      background: transparent;
      border: 0;

      > svg {
         color: #999191;
         width: 20px;
         height: 20px;
      }
   }
`