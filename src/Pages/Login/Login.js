import React,{useState,useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {Link} from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  
  useEffect(()=>{
    if(location.state){
      toast.error(location.state.message);
    }

  },[])


  const handleLogin = (e) =>{
    e.preventDefault()
    console.log(email,password)
    axios.defaults.withCredentials = true;
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    axios.post('http://localhost:5000/login',{email,password},config).then((res)=>{
      console.log(res)
      navigate('/');
    }).catch(err=>{
      console.log(err);
      toast.error(err.response.data.message)
    })
  }
  return (
      <div className="container">
        <Toaster
          position="top-center"
          reverseOrder={false}
        />  
        <div className="signup-box">
            <form onSubmit={(e)=>{handleLogin(e)}} method='post'>

                <h2>Login </h2>
                <label>Email</label><br/>
                <input type="email" 
                  placeholder="Enter Your email" 
                  required
                  onChange={(e)=>{setEmail(e.target.value)}}
                  />
                <label>Password</label><br/>
                <input type="password" name="password" 
                    pattern="^(?=.*[a-z])(?=(?:[^0-9]*[0-9]){2,}).{8,}$" 
                    title="Password must be at least 8 characters long, contain at least 1 capital letter, and have at least 2 numbers." 
                    required
                    placeholder='Password'
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <br />
                <input type="submit"/>
                <Link className="redirect" to='/signup'>Don't have an account!Signup</Link>
            </form>
        </div>
    </div>
  )
}

export default Login