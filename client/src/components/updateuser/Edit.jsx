import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../adduser/add.css' /*we dont need to add new edit.css file as Add.jsx and Edit.jsx 
will have same form so just import add.css in Edit.jsx component
*/ 
import { toast } from 'react-hot-toast'

const Edit = () => {
    const users={
        fname:"",
        lname:"",
        email:"",
        password:""
    }
    const {id} =useParams(); //useParams() is react router dom hook that will fetch the id from url;
    const [user,setUser] = useState(users)
    const navigate=useNavigate();
    const inputChangeHandler=(e)=>{
        const {name,value}=e.target;
        setUser({...user,[name]:value})
    }


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getOne/${id}`)
        .then((response)=>{
            setUser(response.data)
        })
        .catch((error)=>console.log(error))
    },[id]) //whenever the id changes at that time this get one api will also hit



    const submitForm=async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/${id}`, user)
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
    <h3>Update user</h3>
    <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
            <label htmlFor="fname">First name</label>
            <input type="text" id='fname' name='fname' value={user.fname} onChange={inputChangeHandler} autoComplete='off' placeholder='First name'/>
        </div>
        <div className="inputGroup">
            <label htmlFor="lname">Last name</label>
            <input type="text" id='lname' name='lname' value={user.lname} onChange={inputChangeHandler} autoComplete='off' placeholder='Last name'/>
        </div>
        <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name='email' value={user.email} onChange={inputChangeHandler}  autoComplete='off' placeholder='email'/>
        </div>
      
        <div className="inputGroup">
            <button type='submit'>UPDATE USER</button>
        </div>
    </form>
</div>

  )
}

export default Edit
