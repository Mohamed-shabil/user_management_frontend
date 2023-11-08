import './App.css'
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard/Dashboard';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
function App() {
  return (
    <div className="App ">
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/Login" element={<Login />}/>
      </Routes>
    </Router>
      {/* <Login/> */}
      {/* <Home/> */}
      {/* <Dashboard/> */}
    </div>
  );
}

export default App;
