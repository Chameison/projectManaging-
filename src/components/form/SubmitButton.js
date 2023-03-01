import styles from './SubmitButton.module.css'
function SubmitButton({text}){ //para podermos manusear os dados dos inputs, para podermos utilizar diversos forms
    return(
    
    <div >
        <button className={styles.btn}>{text}</button>
    </div>)
}

export default SubmitButton