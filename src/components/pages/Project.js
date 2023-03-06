import { parse, v4 as uuidv4 } from "uuid";
import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../layouts/Loading";
import Container from "../layouts/Container";
import Message from "../layouts/Message";
//ele permite que possamos customizar o submit, e fazer um adição ou atualização
import ProjectForm from "../projects/ProjectForm";
import ServiceForm from "../services/ServiceForm";
import ServiceCard from "../services/ServiceCard";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);

  const [message, setMessage] = useState();
  const [type, setType] = useState();
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
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 3000); //loading para carregar o projeto
  }, [id]); //depois de finalizarmos essa requisição termos acesso de forma dinamica aos dados do projeto que foi clicado

  function editPost(project) {
    setMessage("");
    //budget Validation
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto");
      setType("error");
      return false;
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data); //estamos mudadno o estado de fato
        setShowProjectForm(false);
        setMessage("Projeto Atualizado Com Sucesso");
        setType("success"); //vamos passar os dados atualizados
      })
      .catch((err) => console.log(err));
    //ja estamos alteradno o estado do objeto
  }

  //metodo criar o service
  function createService(project) {
    //LAST SERVICE
    setMessage("");

    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();
    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);
    //maximun value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento Ultrapassado, verifique o valor do serviço");
      setType("error");
      project.services.pop(); //se o projeto for maior que o limite, emitimos uma mensagem e removemos o serviõ com o pop
      return false;
    }

    //add service cost to projetct total cost
    project.cost = newCost;
    //update project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        //exibit o serviço
        setShowServiceForm(false);
        setMessage("Serviço adicionado Com Sucesso!");
        setType("success");
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  //metodo remover servico
  function removeService(id, cost) {
    setMessage('')

    const servicesUpdate = project.services.filter(
      //pegando o servico, nosso servico nesse id, criamos uma constante que
      (service) => service.id !== id
    );

    const projectUpdate = project;
    projectUpdate.services = servicesUpdate;
    projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost);
    fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdate),
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(projectUpdate)
        setServices(servicesUpdate)
        setMessage('Serviço Excluido Com Sucesso!')
        setType('error')
      })
      .catch((err) => console.log(err));
    //o servico atualizado tem o servico a menos e tambem o custo reduzido
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
            {message && <Message type={type} msg={message} />}
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
                    <span>Prazo: </span>{project.deadline}
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
              {project.budget == project.cost && (
                <p>
                  O Orçamento está completo, não há como adicionar mais serviços
                </p>
              )}
              {project.budget != project.cost && (
                <button onClick={toggleServiceForm} className={styles.btn}>
                  {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
                </button>
              )}
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há Serviços</p>}
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
