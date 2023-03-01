import { useEffect, useState } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'
function ProjectForm({btnText}){

    const [categories, setCategories] = useState([])
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

    return(
        <form className={styles.form}>
            <Input type="text" text="Nome do Projeto..." 
            name="name" placeholder="Insira o nome do Projeto" />
            
            <Input type="number" text="Orçamento do Projeto..." 
            name="budget" placeholder="Insira o Orçamento Total" />
            <Select name="category_id" text="Selecioe a Categoria"  options={categories}/>
            <SubmitButton text={btnText}/>
        </form>
    )
}
export default ProjectForm