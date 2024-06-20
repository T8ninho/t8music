import { useRouteError } from "react-router-dom";
import { Linha, Laranja, Codigo, Verde, Roxo, Azul, Amarelo } from "../../Components/style/StyledComponts";

export default function PaginaErro() {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ textAlign: 'center' }}>
      <p>HTTP: <span>404</span></p>
      <Codigo>
        <Linha>Esta_página.<Verde><em>não_existe</em></Verde> = <Verde>true</Verde></Linha>
          <Linha>if <Laranja>(</Laranja><Roxo>você_escreveu_errado</Roxo><Laranja>)</Laranja> <Laranja>&#123;</Laranja></Linha> 
          <Linha><Verde>Tente_novamente()</Verde> </Linha>
        <Linha><Laranja>&#125;</Laranja>else if <Laranja>(</Laranja><Roxo>nós_estragamos_tudo</Roxo><Laranja>)</Laranja> <Laranja>&#123;</Laranja> </Linha>
        <Linha><Azul>alert</Azul><Laranja>(</Laranja><Amarelo>"Nós realmente sentimos muito por isso."</Amarelo><Laranja>)</Laranja>; </Linha>
        <Linha>window.<em>location</em> = home </Linha>
        <Laranja>&#125;</Laranja> 
      </Codigo>
      <a href="/">Clique para ir ao Inicio</a>
    </div>
  );
}