import './App.css'
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard/Dashboard';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import EditUser from './Pages/EditUser/EditUser';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
function App() {
  return (
    <div className="App ">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/admin/login" element={<AdminLogin />}/>
          <Route path="/admin/editUser/:userId" element={<EditUser/>}/>
          <Route exact path="/admin" element={<Dashboard />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
