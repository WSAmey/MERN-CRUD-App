import React, { useState } from 'react'
import './add.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Add = () => {
    const users={ //users is initial value of state which will be empty 
        fname:"",
        lname:"",
        email:"",
        password:""
    }
    const [user, setUser]=useState(users);

    const navigate=useNavigate(); //For redirecting or navgating from one page to another 

    const inputHandler=(e)=>{
        const {name,value}= e.target;
        setUser({...user,[name]:value}); //so this will append the new values ([name]:value) with previous or initial values(...user)
        //we need to pass this user data coming from input fields to api
    }

    const submitForm=async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8000/api/create", user)
        .then((response)=>{
            toast.success(response.data.msg,{position:"top-right"})
            navigate("/"); //once user data is added then we need to redirect to home page
        }).catch((error)=>{
            console.log(error)
        })
    }


  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Add new user</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="fname">First name</label>
                <input type="text" onChange={inputHandler} id='fname' name='fname' autoComplete='off' placeholder='First name'/>
            </div>
            {/* inoutHandler function will give us the names and values of input fields */}
            <div className="inputGroup">
                <label htmlFor="lname">Last name</label>
                <input type="text" onChange={inputHandler} id='lname' name='lname' autoComplete='off' placeholder='Last name'/>
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={inputHandler} id='email' name='email' autoComplete='off' placeholder='email'/>
            </div>
            <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input type="password" onChange={inputHandler} id='password' name='password' autoComplete='off' placeholder='password'/>
            </div>
            <div className="inputGroup">
                <button type='submit'>ADD USER</button>
            </div>
        </form>
    </div>
  )
}

export default Add
