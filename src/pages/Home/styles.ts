import styled from 'styled-components';

export const Container = styled.div`
   height: 100vh;
`

export const Content = styled.div`
   display: flex;
   flex-direction: row;
   align-items:center;
   justify-content:center;
   /* justify-content: space-around; */
`

export const BoxInfo = styled.div`
   width: 100rem;
   font-size: 80px;
   margin: auto;
   margin-top: 1%;
   line-height: 100px;
   /* font-family: 'Padauk', sans-serif; */
   font-family: 'Andika New Basic', sans-serif;
   margin-bottom: 50px;


   z-index: 999;

   .title {
      padding: 0 20%;
      width: 100%;

      span{
         font-weight: bold;
         font-size: 110px;
      }
   }

   .description{
      padding-left: 20%;
      font-size: 30px;
      width: 80%;
      line-height: 40px;

   }
`

export const BoxImage = styled.div`
   width: 100rem;
   margin-bottom: 50px;

`
