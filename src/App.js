import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './components/pages/Home';
import Contact from './components/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';


//Layoyt
import Container from './components/layouts/Container';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Projects from './components/pages/Projects';

function App() {
  return (
      <Router>

        <Navbar />
        <Container>

          <Routes>
              <Route exact path="/" element={ <Home /> } />
              <Route exact path="/company" element={ <Company /> } />
              <Route exact path="/contact" element={ <Contact /> } />
              <Route exact path="/projects" element={ <Projects /> } />

              <Route exact path="/newprojects" element={ <NewProject /> } />
          </Routes>
        </Container>

        <Footer />
        </Router>
    
  );
}

export default App;
