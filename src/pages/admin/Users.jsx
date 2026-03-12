import React,{useEffect,useState}from 'react';
import "./users.css";

function Users() {
  const[users,setUsers]=useState([]);
  useEffect(()=>{
    fetch("https://localhost:7196/Categories/GetallUsers/GetAllUsers")
      .then((res)=>res.json())
      .then((data)=>setUsers(data))
      .catch((err)=>console.error("Fetch users error:",err));
   },[]);
  return (
    <div>
      <h2>Users List</h2>
      <table className="my-table">
        <thead>
          <tr>
            <th>UserId</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u)=>(
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              {/* <td>{u.password}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
