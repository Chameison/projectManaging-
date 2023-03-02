import Message from "../layouts/Message";
import Container from "../layouts/Container";

import { useLocation } from "react-router-dom";

function Projects() {

  const location = useLocation();
  let message = ''
  if(location.state){
    message = location.state.message //se tiver algo la, vamos ver e vamos ve se message exisste, e entao vamos acessar
  }
  return (
    <Container>
      <div>
        <h1>Meus Projetos</h1>
        {message && <Message type="success" msg={message}  />}
      </div>
    </Container>
  );
}

export default Projects;
