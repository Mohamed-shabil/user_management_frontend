import React,{useEffect, useState} from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const Home = () => {
  const [user,setUser] = useState({})
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [edit,setEdit] = useState(true)
  const [preview,setPreview] = useState(null)
  const token = localStorage.getItem('jwt')
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', 
    },
  };

  useEffect(()=>{
    console.log('token', token)
    axios.get('http://localhost:5000/getMe',config).then(res=>{
      setName(res.data.data.name)
      setEmail(res.data.data.email)
      setPhone(res.data.data.phone)
      setUser(res.data.data)
    })
  },[]);

  
  const handleForm = (e)=>{
    e.preventDefault();
    const data = new FormData();
    const selectedImage = document.getElementById('upload')
    const image = selectedImage.files[0];

    if(image){
      data.append('profile',image)
    }
    data.append('name',name)
    data.append('email',email)
    data.append('phone',phone)
    console.log(data)
    axios.post('http://localhost:5000/updateProfile',data,config).then(res=>{
      console.log(res.data.data)
      setUser(res.data.data)
      toast.success('Your data is updated Successfully')
    })
  }
  const handlePreview = (e)=>{
    const url = URL.createObjectURL(e.target.files[0])
    setPreview(url);
  }
  const logout = ()=>{
    localStorage.set('jwt','')
    
  }
  // console.log(values)
  return (
      <div className="container">
      <div><Toaster/></div>
        <div className="signup-box">
            <form method='post' onSubmit={handleForm}>
            <div className="editOption" onClick={()=> {edit ? setEdit(false):setEdit(true);}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
            </div>
              <h2>My Account </h2>
                <div className="profileImg">
                  <img src={preview? preview :`http://localhost:5000/profile/${user.profile}`} alt={user.name}/>
                  <label htmlFor='upload' className="profile"> Set Profile Picture</label>
                </div>
                <input type="file"  name='profile' id="upload" onChange={handlePreview} /><br/>
                <label>Username</label><br/>
                <input type="text" placeholder="Enter Your name"
                 required minLength='3'
                  value={name}
                  disabled={edit}
                  onChange={(e)=>setName(e.target.value)}
                 />
                <label>Email</label><br/>
                <input type="email" placeholder="Enter Your email"
                 required 
                 value={email}
                 disabled={edit}
                 onChange={(e)=>setEmail(e.target.value)}
                 />
                <label>Phone</label><br/>
                <input type="text" placeholder="Phone number"
                  pattern="[0-9]*" required title='Only numeric values are allowed' 
                  minLength='10' maxLength='10'
                  value={phone}
                  disabled={edit}
                  onChange={(e)=>setPhone(e.target.value)}
                  />
                <br />
                <input type="submit" disabled={edit}/>
                <button onClick={logout}></button>
            </form>
        </div>
      </div>
  )
}

export default Home