import Message from "../layouts/Message";
import Container from "../layouts/Container";
import LinkButton from "../layouts/LinkButton";

import { useLocation } from "react-router-dom";
import styles from "./Project.module.css";
import ProjectCard from "../projects/ProjectCard";
import { useState, useEffect } from "react";
function Projects() {
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message; //se tiver algo la, vamos ver e vamos ve se message exisste, e entao vamos acessar
  }

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newprojects" text="Criar Projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      <Container customClass="start">
        {projects.length > 0 && //vamos fazer um loop para pegar dado por dado
          projects.map((project) => <ProjectCard
          id={project.id}
          name={project.name} 
          budget={project.budget}
          category={project.category.name}
          key={project.id}
          />)}
      </Container>
    </div>
  );
}

export default Projects;
