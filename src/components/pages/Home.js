import styles from './Home.module.css'
import savings from '../../assets/img/projectGroup.svg'
import LinkButton from '../layouts/LinkButton'
import Container from '../layouts/Container'
function Home(){
    return(
        <Container>
            <section className={styles.home_container}>
                <div className={styles.row1}>
                    <h1>Bem-Vindo Ao<span>Project Managing</span></h1>
                    <p>Gerenciador de Projetos Moderno</p>
                    <LinkButton to="/newprojects" text="Criar Projeto" />
                </div>
                <div className={styles.row2}>
                    <img src={savings} alt="Project" />
                </div>
    
            </section>
        </Container>
    )
}

export default Home