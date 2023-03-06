import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../layouts/Loading";
import Container from "../layouts/Container";
import Message from "../layouts/Message"
//ele permite que possamos customizar o submit, e fazer um adição ou atualização
import ProjectForm from "../projects/ProjectForm";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [message, setMessage] = useState()
  const [type, setType] = useState()
  //vamos criar um styate respnsavel por mostrar ou nao o projeto

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  //vmos criar uma funcao anonimas
  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((rest) => rest.json())
        .then((data) => {
          setProject(data);
        })
        .catch((err) => console.log(err));
    }, 3000); //loading para carregar o projeto
  }, [id]); //depois de finalizarmos essa requisição termos acesso de forma dinamica aos dados do projeto que foi clicado

  function editPost(project) {
    setMessage('')
    //budget Validation
    if (project.budget < project.cost) {
      setMessage('O orçamento não pode ser menor que o custo do projeto')
      setType('error')
      return false
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res => res.json()))
      .then((data) => {
        setProject(data) //estamos mudadno o estado de fato
        setShowProjectForm(false)
        setMessage('Projeto Atualizado Com Sucesso')
        setType('success')        //vamos passar os dados atualizados
      })
      .catch((err) => console.log(err));
    //ja estamos alteradno o estado do objeto
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">

            {/* Mensagem */}
            {message && <Message  type={type} msg={message}/>}
            <div className={styles.details_container}>
              <h1>Projeto {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
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
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço</h2>
              <button onClick={toggleServiceForm} className={styles.btn}>{!showServiceForm ? 'Adicionar Serviço' : 'Fechar' }</button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <div>
                    Form
                  </div>
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
                  <p>Itens dos Serviços</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
export default Project;
