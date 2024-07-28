import './App.css';
import Landing from './pages/Landing';
import Homepage from './pages/Homepage';
import { BrowserRouter } from 'react-router-dom';
import Routing from './pages/Routing';


function App() {
  return (
    <div>
      <BrowserRouter>
       <Routing />
      </BrowserRouter>
    </div>
  );
}

export default App;
