import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Home(){
    const [users, setUsers]=useState([])

    const {id} = useParams()

    useEffect(()=>{
        loadUsers()
    },[])

    const loadUsers=async()=>{
        const result=await axios.get("http://localhost:8080/user")
        setUsers(result.data)
    }

    const deleteUser = async(id) =>{
        await axios.delete(`http://localhost:8080/user/${id}`)
        loadUsers()
    }

    return (
        <div className="container">
            <div className="py-4">
            <table className="table border shadow">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">UserName</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index)=>{
                        index = index + 1
                        return(
                            <tr key={index}>
                            <th scope="row"></th>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <button className="btn btn-primary mx-2">View</button>
                            <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>Edit</Link>
                            <button className="btn btn-danger mx-2" onClick={()=>deleteUser(user.id)}>Delete</button>
                            </tr>
                        )
                    })
                }
                
            </tbody>
            </table>
            </div>
        </div>
    )
}