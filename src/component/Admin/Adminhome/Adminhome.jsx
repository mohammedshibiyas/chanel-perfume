import React, { useEffect } from 'react'
import { useState } from 'react';
import './Adminhome.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';
const Adminhome = () => {
  const navigate=useNavigate();
  // const {id}=useParams()
  const [getCat,setCat]=useState([])
  const getCategory=async()=>{
   const res= await axios.get("http://localhost:4007/perfume/getcategory")
    setCat(res.data)
  }
  useEffect(()=>{
    getCategory()
  },[])


  const Logout=(e)=>{
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
        localStorage.clear();
       navigate("/adminlogin")
    }
}


  const deletecategory = async (id) => {
    // Display a confirmation dialog before making the delete request
    const userConfirmed = window.confirm("Are you sure you want to delete this category?");
  
    if (userConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:4007/perfume/delcategory/${id}`);
        console.log(res.data);
  
        if (res.status !== 404) {
          alert("Category deleted successfully");
        } else {
          alert("Category not deleted");
        }
  
        // Refresh the category list after deletion
        getCategory();
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("An error occurred while deleting the category");
      }
    } else {
      alert("Deletion canceled by user");
    }
  }; 

    const [msg, setmsg] = useState("");
    const value=JSON.parse(localStorage.getItem("admin_token"));
  // console.log(value);
    const getName=async()=>{
      const res=await axios.get("http://localhost:4007/perfume/home",{
        headers:{Authorisation:`Bearer ${value}`},

      })
      setmsg(res.data.msg)
    }
    useEffect(()=>{
      getName();
    },[])



  return (
    <div>
       <div className="admin-home">
       <div className="main">
          <div className="sidebar">
            <div className="back">
              <Link to='/adminlogin'><button><i class="fa fa-arrow-left" aria-hidden="true"></i> back</button></Link>
            </div>
            <div className="sidebar-content">
              {/* <h2>Chanel</h2> */}
              <div className="categories">
              <h6>Categories</h6>

               <div className="tables">
               <table className='category-table'>
      
      {
       getCat.map((data,index)=>
       
      
         <tr key={index} className='active_menu_link'>
      <Link className='cat-link' to={`/categoryproduct/${data.category}`}><th>{data.category}</th></Link>
       <td className='tab-btns'>
      <Link to={`/editcategory/${data._id}`}><i class="fa fa-pencil-square-o" aria-hidden="true" id='edit'></i>
</Link>
   
              <Link className='delete-btn'  to={`#${data._id}`} onClick={() => deletecategory(data._id)}><i class="fa fa-trash" aria-hidden="true"></i></Link>

       </td>

     </tr>
      
       
       )
      }

      
     </table>
               </div>
              </div>
            </div>

          </div>
          <div className="display-side">
          <div className="navbar">
          <h5><i class="fa fa-cog" aria-hidden="true"></i> ADMIN PANEL</h5>
          <div className="nav-content">
          <div className="navbar__right">
       <a href="#" id='log'>
        <Link onClick={Logout} className='logout'> <i className="fa fa-power-off" aria-hidden="true" id="log"> <span> LOGOUT</span></i></Link>
       </a>
      
      <span> <a href="#" id='msg'>
         <img width="30" src="/avatar.svg" alt="" />
        <span id='admin-name'> {msg}</span>
       </a></span>
     </div>
          </div>
        </div>

          <div className="add-cat">
            <Link to={`/addcategory`}><button id='cat-btn'>Add Category < i class="fa fa-plus" aria-hidden="true"></i></button></Link>
            <Link to={`/addproduct`}><button id='pro-btn'>Add Product < i class="fa fa-plus" aria-hidden="true"></i></button></Link>
            <Link to={``}><button id='sale-btn'>Sales < i class="fa fa-line-chart" aria-hidden="true"></i></button></Link>
            <Link to={``}><button id='cust-btn'>Customers < i class="fa fa-users" aria-hidden="true"></i></button></Link>
          </div>

          </div>
        </div>
       </div>
       
    </div>
  )
}

export default Adminhome
