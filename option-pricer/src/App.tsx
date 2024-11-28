
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register';

const App = () => {

    return (
      <>
      <BrowserRouter>
        <Routes>
          <Route path = "/login" element= {<Login/>} />
          <Route path = "/register" element= {<Register/>} />
        </Routes>
      </BrowserRouter>
      
      </>
    )
};

export default App
