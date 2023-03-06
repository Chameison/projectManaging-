import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../layouts/Loading";
import Container from "../layouts/Container";
function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);

  //vamos criar um styate respnsavel por mostrar ou nao o projeto

  const [showProjectForm, setShowProjectForm] = useState(false)
  //vmos criar uma funcao anonimas
  useEffect(() => {
    setTimeout (() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((rest) => rest.json())
        .then((data) => {
          setProject(data)
        })
        .catch((err) => console.log(err));
    }, 3000) //loading para carregar o projeto
  }, [id]); //depois de finalizarmos essa requisição termos acesso de forma dinamica aos dados do projeto que foi clicado

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}> 
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Projeto {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'EditarProjeto': 'Fechar'}</button> 
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>Project Form</p>
                </div>
              ): (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria: </span> {project.category.name}
                  </p>
                  <p>
                    <span>Total Do Orçamento: </span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado: </span> R${project.cost}
                  </p>
                </div>
              )}
            </div>
          </Container>
        </div>
      ): (
        <Loading />
      )}
    </>
  )
}
export default Project;
