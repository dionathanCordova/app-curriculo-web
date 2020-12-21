import styled from 'styled-components';

export const Container = styled.div`
   height: 100px;
   background-color: red;
`
export const Content = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-around;

   div {
      display: flex;
      flex-direction: row;
   }
`
export const BoxUserInfo = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   align-items: center;

   img{
      border-radius: 50%;
      width: 60px;
      height: 60px;
   }
`