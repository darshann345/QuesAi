import './App.css';
import quespic from "./assets/quespic.png";
import Main from "./Components/Main.jsx"
import Home from './Components/Home.jsx';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Sidebar from './Components/Sidebar.jsx';
function App() {
  return(
    <>
      <div>
        <BrowserRouter>
          <Routes>
          <Route path = "/" element = {<Main/>} />
          <Route path="/home" element={<Home />} />
            <Route path="/sidebar" element={<Sidebar />} />

          </Routes>
        </BrowserRouter>
      </div>
     

    </>
  ) 
}

export default App;
