import React,{useEffect, useState} from 'react'
import './Dashboard.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link} from 'react-router-dom';
import {addUser,deleteUser,fetchUser,searchUser} from '../../Slices/userSlice'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
function Dashboard() {
    const [form,setForm] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [passwordConfirm,setPasswordConfirm] = useState('')
    const [search,setSearch] = useState('')
    axios.defaults.withCredentials = true;
    const users = useSelector((state) => state.users);
    console.log(users)
    useEffect(()=>{
        axios.get('http://localhost:5000/admin/')
        .then(res=>{
            console.log(res.data)
            dispatch(fetchUser(res.data.data));
        }).catch(err=>{
            console.log(err)
        })
    },[])
    const handleDelete = (id)=>{
        axios.delete(`http://localhost:5000/admin/deleteUser/${id}`)
        .then((res)=>{
            console.log(res.data)
            dispatch(deleteUser(id))
            toast.success('Deleted Successfully');
        })
        dispatch(deleteUser(id))
    }
    const createUser = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/admin/createUser',{name,password,email,phone,passwordConfirm})
        .then(res=>{
            console.log(res);
            toast.success('User created successfully')
            dispatch(addUser(res.data.data))
        }).catch(err=>{
            toast.error(err.response.data.message);
        })
    }
    const handlelogout = ()=>{
        axios.get('http://localhost:5000/admin/logout')
            .then((res)=>{
                console.log(res)
                if(res.status === 200){
                    navigate('/admin/login')
                }
            })
    }
    console.log('search ...',search)
  return (
    <div>
        <Toaster
            position="top-center"
            reverseOrder={false}
            />  
        <div className="wrapper">
            <div id={form+""}> 
                <div className="Welcome">
                    <h2>Welcome to Dashboard</h2>
                </div>
                <div className="create-user">
                    <div>
                        <input type="text" className='search-field' placeholder='Search ' onChange={(e)=>{setSearch(e.target.value)}}/>
                        <button onClick={()=>{dispatch(searchUser(search))}}>Search</button>
                    </div>
                    <div>
                        <button onClick={()=>{setForm(true)}}>Create User</button>
                        <button className='logout' onClick={()=>{handlelogout()}}>Logout</button>
                    </div>
                </div>
                <div className="table">
                    <table>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                        {
                            users.map((user,index) =>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button onClick={()=>{handleDelete(user._id)}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-trash3" viewBox="0 0 16 16">
                                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                                </svg>
                                            </button>
                                        </td>
                                        <td>
                                        <Link to={`/admin/editUser/${user._id}`}>
                                            <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                    </svg>
                                                </button>
                                        </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </table>
                </div>
            </div>
            {form ? (<div className="create_user">
            <div className="signup-box">
            <button className='close_btn'
                onClick={()=>{setForm(false)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            </button>
                <form method="post" onSubmit={createUser}>
                    <h2>Create a User </h2>
                    <label>Username</label><br/>
                    <input type="text" name="name" 
                        placeholder="Enter Your name" 
                        required minLength='3'
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                    <label>Email</label><br/>
                    <input type="email" 
                        name='email' 
                        placeholder="Enter Your email" 
                        required
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <label>Phone</label><br/>
                    <input type="text" 
                        placeholder="Phone number" 
                        name='phone' pattern="[0-9]*" 
                        required title='Only numeric values are allowed' 
                        minLength='10' 
                        maxLength='10'
                        onChange={(e)=>{setPhone(e.target.value)}}
                    />
                    <label>Password</label><br/>
                    <input type="password" name="password" 
                    pattern="^(?=.*[A-Z])(?=(?:[^0-9]*[0-9]){2,}).{8,}$" 
                    title="Password must be at least 8 characters long, contain at least 1 capital letter, and have at least 2 numbers." 
                    required
                    placeholder='Password'
                    onChange={(e)=>{setPassword(e.target.value)}}
                    />

                    <label>Confirm Password</label><br/>
                    <input type="Password" 
                        placeholder="Confirm Password" 
                        name='confirmPassword'
                        onChange={(e)=>{setPasswordConfirm(e.target.value)}}
                    />
                    <br />
                    <input type="submit"/>
                </form>
            </div>
            </div>) : <></>}
        </div>
    </div>
  )
}

export default Dashboard