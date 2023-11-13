import React,{useEffect,useReducer, useState} from 'react'
import {Link} from 'react-router-dom'
import './Signup.css'
import axios from 'axios'

const Signup = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const [passwordConfirm,setPasswordConfirm] = useState('')
  const handleSignup = (e)=>{
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:5000/signup',{name,email,phone,password,passwordConfirm}).then((res)=>{
      console.log(res);
    })
  }
  return (
      <div className="container">
        <div className="signup-box">
            <form onSubmit={(e)=>{handleSignup(e)}} method="post">
                <h2>Signup </h2>
                <label>Username</label><br/>
                <input type="text" 
                  onChange={(e)=>{setName(e.target.value)}}
                  placeholder="Enter Your name" 
                  required 
                  minLength='3'/>
                <label>Email</label><br/>
                <input type="email" 
                  placeholder="Enter Your email" 
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required/>
                <label>Phone</label><br/>
                <input type="text" placeholder="Phone number" 
                  pattern="[0-9]*" 
                  required title='Only numeric values are allowed' 
                  onChange={(e)=>{setPhone(e.target.value)}}
                  minLength='10' 
                  maxLength='10'/>
                <label>Password</label><br/>
                <input type="password" name="password" 
                  pattern="^(?=.*[A-Z])(?=(?:[^0-9]*[0-9]){2,}).{8,}$" 
                  title="Password must be at least 8 characters long, contain at least 1 capital letter, and have at least 2 numbers." 
                  required
                  onChange={(e)=>{setPassword(e.target.value)}}

                  placeholder='Password'
                  />

                <label>Confirm Password</label><br/>
                <input type="Password" 
                  placeholder="Confirm Password"
                  onChange={(e)=>{setPasswordConfirm(e.target.value)}}
                  />
                <br />
                <input type="submit"/>
                <Link className="redirect" to='/login'>Already have an account?Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup