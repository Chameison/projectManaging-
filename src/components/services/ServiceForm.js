import { useState } from "react";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "../projects/ProjectForm.module.css";
function ServiceForm({handleSubmit, btnText, projectData}) {

  const [service, setService] = useState({})
  function submit(e) {
    e.preventDefault() //pegamos o evento 
    projectData.services.push(service) //vamos ter mais um servico, vamos da um push e jogando serviços dentro dos serviços
    handleSubmit(projectData) //
  }
  function handleChange(e) { 
    setService({...service, [e.target.name]: e.target.value}) // pegamos o objeto atual e colocamos o nome do Input que sera a chave, quando estamos
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Serviço"
        name="name"
        placeholder="Insira o nome do Serviço"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Custo do Serviço"
        name="cost"
        placeholder="Insira o Valor Total"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Descrição do Serviço"
        name="description"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
      />
      <SubmitButton  text={btnText}/>
    </form>
  );
}
export default ServiceForm;
