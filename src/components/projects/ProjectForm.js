import { useEffect, useState } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'
function ProjectForm({handleSubmit, btnText, projectData}){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
    //React nao entende bem essa renedereização e fica fazendo mapeamento par ver se tem dados infinitamente, usamos entao o useEffet()
    useEffect(() => { //usamos para que seja feita somente uma vez
        fetch("http://localhost:5000/categories", { 
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        res => res.json()).then((data)=> {
            setCategories(data)
        }).catch( err => console.log(err))
    }, [])
    const submit = (e) =>{
        e.preventDefault()
        console.log(project)
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value})
        console.log(project)
    }
    function handleCategory(e) {
        setProject({ ...project,
             category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex]
             },
            })
        console.log(project)
    }
    return(
        <form onSubmit={submit} className={styles.form}>
            <Input type="text" text="Nome do Projeto..." 
            name="name" placeholder="Insira o nome do Projeto"
             handleOnChange={handleChange} value={project.name ? project.name : ''} />
            
            <Input type="number" text="Orçamento do Projeto..." 
            name="budget" placeholder="Insira o Orçamento Total" 
            handleOnChange={handleChange} value={project.budget ? project.budget : ''} />


            <Select name="category_id" text="Selecioe a Categoria"
            options={categories} handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''} //achar o valor e setar se tiver vazio
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}
export default ProjectForm