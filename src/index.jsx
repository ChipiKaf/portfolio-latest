import './styles/main.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';

const root = ReactDOM.createRoot(document.querySelector('#root'))

function App() {
return (
    <>
    <Router>
        <Navbar />
        <Routes>   
            <Route exact path="/" Component={Home} />
            <Route exact path="/about" Component={About} />
        </Routes>
    </Router>
    <Cursor />
    </>
)
}

root.render(<App />)