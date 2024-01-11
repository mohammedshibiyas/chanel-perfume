import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Categoryproduct.scss'
import { useParams } from 'react-router-dom'

const Categoryproduct = () => {
  
  const[catprod,setCatprod]=useState([])
  const{category}=useParams();
 

  const getCategorywise=async(e)=>{
    // e.preventDefault();
   try {
    const res=await axios.get(`http://localhost:4007/perfume/getcategorywise/${category}`);
    console.log(res.data);
    console.log(res.data.banner);
    console.log(res.data.category);
    setCatprod(res.data)

   }
   catch (error) {
      console.log("not fetch");
   }h
  
  }
   useEffect(()=>{
    getCategorywise();
   },[category])

   const delproduct=async(id)=>{
   try {
    const res=await axios.delete(`http://localhost:4007/perfume/delproduct/${id}`)
    if(res.status!=404){
      alert("product deleted")
    }
   } catch (error) {
    alert(error,"Can't delete")
   }
   getCategorywise();
   }

  
  return (
    <div>
      <div className="category-all">
      <div className="back">
              <Link to='/adminhome'><button><i class="fa fa-arrow-left" aria-hidden="true"></i> back</button></Link>
            </div>
      <div className="recomend">
      <h4>Collections</h4>
  
    <div className=" products">
       {
    catprod.map((data,index)=>
    
  <div key={index}>
    
  <Link className="prod-detail" to={`/productdetails/${data._id}`}>
    <div className=" col-lg-4 prod-1">
     
     <img src={data.banner} alt="" />
      <div className="details">
        <h5>{data.name}</h5>
        <p>{data.title}</p>
        {/* <p>{data.description}</p> */}
        <h5>{data.price}₹</h5>
        <Link className='delete-btn' to={`#${data._id}`} onClick={()=>delproduct(data._id)}>Delete</Link>
      </div>
     
    </div>
  </Link>
  </div>
   )
  }

   </div>
  
      </div>
    </div>

    {/* <div className="all-collection">
      <div className="collection">
        <h4>Collection</h4>
        <div className=" products">
          
        </div>

        {
          catprod.map((data,index)=>

          <div key={index}>

<div className="col-lg-3">
          <Link className='perfumes'>
          <div className="prod">
              <img src="/n5.jpg" alt="" />
              <div className="collection-detail">
                <h5>Note 5</h5>
                <p>Eadu DE spray</p>
                <h5>200$</h5>
                <Link className='delete-btn'>Delete</Link>
              </div>
            </div>
          </Link>
          </div>
            
          </div>


          )
        }
      </div>
    </div> */}

    </div>
  )
}


export default Categoryproduct
