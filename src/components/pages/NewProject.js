import ProjectForm from '../projects/ProjectForm'
import styles from './NewProject.module.css'

function NewProject(){
    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie o projeto para então adicionar os serviços e seus valores</p>
            <ProjectForm />
        </div>
    )
}

export default NewProject