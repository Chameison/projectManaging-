function ProjectForm(){
    return(
        <form>
            <div>
                <input type="text" placeholder="Digite o nome do Projeto..." />

            </div>
            <div>
                <input type="number" placeholder="Digite o Orçamento Inicial..." />
            </div>
            <div>
                <select name="category_id">
                    <option disabled selected>Selecione  a Categoria</option>
                </select>
            </div>
            <div className="">
                <input type="submit" value="Criar Projeto" />
            </div>
        </form>
    )
}
export default ProjectForm