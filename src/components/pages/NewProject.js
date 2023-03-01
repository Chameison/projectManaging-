import { useNavigate } from 'react-router-dom'
import ProjectForm from '../projects/ProjectForm'
import styles from './NewProject.module.css'


//Layout 
import Container from '../layouts/Container'
function NewProject(){

    const history = useNavigate() // 
    function createPost(project){
        //Alguns comecçam xerados e serao preenchidos no sistema
        
        //Initialize cost and services
        project.cost = 0
        project.services = []
        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
            }).then((res) => res.json())
            .then((data)=>{
                console.log(data)
                history.pushState('/projects', {message: 'Projeto criado com sucesso'})
                //redirect
            })
            .catch(err=>console.log(err))
    }
    return(
        <div className={styles.container_dad}>
            <div className={styles.newproject_container}>
                <h1>Criar Projeto</h1>
                <p>Crie o projeto para então adicionar os serviços e seus valores</p>
                <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
            </div>
        </div>
    )
}

export default NewProject