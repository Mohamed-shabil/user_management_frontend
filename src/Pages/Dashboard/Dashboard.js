import React,{useEffect, useState} from 'react'
import './Dashboard.css'
import axios from 'axios'
function Dashboard() {
    const [form,setForm] = useState(false)
  return (
    <div>
        <div className="wrapper">
            <div id={form+""}> 
                <div className="Welcome">
                    <h2>Welcome to Dashboard</h2>
                </div>
                <div className="create-user">
                    <button onClick={()=>{setForm(true);console.log(form)}}>Create User</button>
                </div>
                <div className="table">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                        <tr>
                            <td>Mohamed Shabil</td>
                            <td>+91 7902663667</td>
                            <td>Mohamed Shabil231@gmail.com</td>
                            <td><button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>
                            </button></td>
                            <td><button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            </button></td>
                        </tr>

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
                <form action="" method="get">
                    <h2>Create a User </h2>
                    <label>Username</label><br/>
                    <input type="text" name="name" placeholder="Enter Your name" required minLength='3'/>
                    <label>Email</label><br/>
                    <input type="email" name='email' placeholder="Enter Your email" required/>
                    <label>Phone</label><br/>
                    <input type="text" placeholder="Phone number" name='phone' pattern="[0-9]*" required title='Only numeric values are allowed' minLength='10' maxLength='10'/>
                    <label>Password</label><br/>
                    <input type="password" name="password" 
                    pattern="^(?=.*[A-Z])(?=(?:[^0-9]*[0-9]){2,}).{8,}$" 
                    title="Password must be at least 8 characters long, contain at least 1 capital letter, and have at least 2 numbers." 
                    required
                    placeholder='Password'
                    />

                    <label>Confirm Password</label><br/>
                    <input type="Password" placeholder="Confirm Password" name='confirmPassword'/>
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