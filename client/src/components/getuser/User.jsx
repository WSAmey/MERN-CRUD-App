import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './user.css'
import { toast } from 'react-hot-toast'
function User() {


  const[users,setUsers]=useState([])


  useEffect(()=>{
    const fetchData = async()=>{
     const response= await axios("http://localhost:8000/api//getAll");
     setUsers(response.data)
    }
    fetchData();
  },[]) //here we have passed an empty array because the data will be rendered when ever the initial state array
        // will change or the state array will be updated with the new data (or state) using setUsers() function

    
    const deleteUser=async(userId)=>{
      await axios.delete(`http://localhost:8000/api/delete/${userId}`)
      .then((response)=>{ //here as we are removing data from database then we also need to remove the 
                          //data from state as well so in setUSers, prevuser parameter holds the previous data in state
        setUsers((prevUser)=>prevUser.filter((user)=>user._id!==userId))
        toast.success(response.data.msg,{position:"top-right"})
        // navigate("/")
      })
    }


  return (
    <div className='userTable'>
      <Link to={"/add"} className='addButton'>Add User</Link> {/*on clicking this 
      add user link it will navigate to add user component through the path we have 
      given in App.js component route as well as in to attribute of this Link tag*/}
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
            <tr>
                <th>S.No.</th>
                <th>User name</th>
                <th>User Email</th>
                <th>Actions</th>
                
            </tr>
        </thead>
        <tbody>
          {
            users.map((user,index)=>(
                  <tr key={user._id}>
                  <td>{index+1}</td> {/*Here if we pass only index then as we know, 
                  array starts from 0th index so we need to increment it by 1 so that it starts with 1*/}

                  <td>{user.fname} {user.lname}</td>
                  <td>{user.email}</td>
                  <td className='actionButtons'>
                      <button onClick={()=>{deleteUser(user._id)}}><i className="fa-solid fa-trash"></i></button>
                      <Link to={`/edit/`+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>

                  </td>
                </tr>

            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default User
