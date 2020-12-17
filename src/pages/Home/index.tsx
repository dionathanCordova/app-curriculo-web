import React from "react";
import Header from "../../components/Header";
import icon from '../../assets/ilustre.png';

import { 
   Container, 
   Content,
   BoxInfo,
   BoxImage
} from "./styles";

const Home = () => {
   return (
      <Container>
         <Header />
         <Content>
            <BoxInfo>
               <p className="title">
                  Controle seus 
                  <span> Currículos</span>
               </p>

               <p className="description">Mantenha todos os seus currículos em um só lugar</p>
            </BoxInfo>

            <BoxImage>
               <img src={icon} alt="" width="80%"/>
            </BoxImage>
         </Content>

      </Container>
   );
};

export default Home;
