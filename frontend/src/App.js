import { Container } from 'react-bootstrap';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
// import Homescreen from './screen/homescreen';
import { Outlet } from 'react-router-dom';

function App() {
  return (
   <>
   <div style={{background: "linear-gradient(to top, rgba(0,0,255,0), rgba(0,0,255,0.1))"}}>
    <header>
    <Header/>
    </header>
    <Container>
    <main >
         <Outlet/>
    </main>
    </Container>
    <footer>
    <Footer/>
    </footer>
    <ToastContainer/>
    </div>
    
   </>
  );
}

export default App;
