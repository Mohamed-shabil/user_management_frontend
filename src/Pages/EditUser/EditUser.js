import React,{useEffect, useState} from 'react'
import { useLocation,useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const EditUser = () => {
    const {userId} = useParams();
  const navigate = useNavigate()
  const [user,setUser] = useState({})
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [preview,setPreview] = useState(null)
 
  axios.defaults.withCredentials = true;

  useEffect(()=>{
    console.log(userId)
    axios.get(`http://localhost:5000/admin/editUser/${userId}`)
    .then(res=>{
        console.log(res.data)
      setName(res.data.data.name)
      setEmail(res.data.data.email)
      setPhone(res.data.data.phone)
      setUser(res.data.data)
    }).catch((err)=>{
      console.log(err)
      if(err.response.status === 401||404){
        const data = {
          message:'Please Login to Continue'
        }
        navigate('/admin/login',{state:data})
      }
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

    axios.post(`http://localhost:5000/admin/editUser/${userId}`,data).then(res=>{
      console.log(res.data.data)
      setUser(res.data.data)
      toast.success('Your data is updated Successfully')
    })
  }
  
  const handleLogout = () => {
    axios.get('http://localhost:5000/logout').then(res=>{
      console.log(res.data.data)
      setUser(res.data.data)
      toast.success('Your data is updated Successfully')
    })
  }
  const handlePreview = (e)=>{
    const url = URL.createObjectURL(e.target.files[0])
    setPreview(url);
  }
  

  // console.log(values)
  return (
      <div className="container">
      <div><Toaster/></div>
        <div className="signup-box">
            <form method='post' onSubmit={handleForm}>
           
              <h2>Edit Account </h2>
                <div className="profileImg">
                  <img src={preview? preview :`http://localhost:5000/profile/${user.profile}`} alt={user.name}/>
                  <label htmlFor='upload' className="profile"> Set Profile Picture</label>
                </div>
                <input type="file"  name='profile' id="upload" onChange={handlePreview} /><br/>
                <label>Username</label><br/>
                <input type="text" placeholder="Enter Your name"
                  required 
                  minLength='3'
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                 />
                <label>Email</label><br/>
                <input type="email" placeholder="Enter Your email"
                 required 
                 value={email}
                 
                 onChange={(e)=>setEmail(e.target.value)}
                 />
                <label>Phone</label><br/>
                <input type="text" placeholder="Phone number"
                  pattern="[0-9]*" required title='Only numeric values are allowed' 
                  minLength='10' maxLength='10'
                  value={phone}
                  
                  onChange={(e)=>setPhone(e.target.value)}
                  />
                <br />
                <input type="submit" />
                
            </form>
        </div>
      </div>
  )
}

export default EditUser