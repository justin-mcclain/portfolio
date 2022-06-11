import './App.scss';
import NavBar from './components/NavBar';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Contact from './components/Contact'
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App" id="app">
        <NavBar/>
        <div className="middle">
          <h1>JUSTIN</h1>
          <h1>MCCLAIN</h1>
        </div>
        <About/>
        <Projects/>
        <Contact/>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
