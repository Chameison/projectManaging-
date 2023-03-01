import { Link } from "react-router-dom"
import Container from "./Container"
import styles from './Navbar.module.css'
import logo from '../../assets/logo.svg'
function Navbar(){
return(
    <nav className={styles.navbar}>
        <Container>
            <Link className={styles.logo} to="/"><img src={logo} alt="Logo"  /></Link>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to="/">Home</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/company">Compania</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/projects">Projetos </Link>
                </li>

                {/* <li className={styles.item}>
                    <Link to="/newproject">Novo Projeto</Link>
                </li> */}
                <li className={styles.item}>
                    <Link to="/contato">Contato</Link>
                </li>
            </ul>

        </Container>
    </nav>

)
}
export default Navbar