import styles from './Select.module.css'
function Select({text, name, options, handleOnChange, value}){ //para podermos manusear os dados dos inputs, para podermos utilizar diversos forms
    return(
    
    <div className={styles.form_control}>
        <label htmlFor={name}>{text}</label>
        <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
            <option>Selecione uma Opção</option>
            {options.map((option) => (
                <option value={option.id} key={option.id}>{option.name}</option> 
            ))}
        </select>
         
    </div>)
}

export default Select