import React,{useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const AdminLogin = () => {
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const navigate = useNavigate();
    const handleLogin  = (e)=>{
        e.preventDefault();
        console.log('name ',name ,'Password', password)
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/admin/login',{name,password})
        .then((res)=>{
            console.log(res)
            if(res.status === 200){
                navigate('/admin')
            }
        }).catch(err=>{
            console.log(err)
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
  
                  <h2>Admin Login </h2>
                  <label>Username</label><br/>
                  <input type="text" 
                    placeholder="Username" 
                    required
                    onChange={(e)=>{setName(e.target.value)}}
                    />
                  <label>Password</label><br/>
                  <input type="password" name="password" 
                    //   pattern="^(?=.*[a-z])(?=(?:[^0-9]*[0-9]){2,}).{8,}$" 
                      title="Password must be at least 8 characters long, contain at least 1 capital letter, and have at least 2 numbers." 
                      required
                      placeholder='Password'
                      onChange={(e)=>{setPassword(e.target.value)}}
                  />
                  <br />
                  <input type="submit"/>
              </form>
          </div>
      </div>
    )
}

export default AdminLogin