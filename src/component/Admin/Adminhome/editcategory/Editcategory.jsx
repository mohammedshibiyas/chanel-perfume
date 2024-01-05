import React from 'react'
import axios from 'axios'
import './Editcategory.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'



const Editcategory = () => {
    const navigate=useNavigate()
    const {id}=useParams()

    const[val,setVal]=useState({
        category:"",
        about:""
    })

    const getFulldata=async ()=>{
        const res=await axios.post(`http://localhost:4007/perfume/getfulldetails/${id}`)
        setVal(res.data)
      }
    useEffect(()=>{
        getFulldata()
    },[])


    
  const editcategory=async(e)=>{
    e.preventDefault()
   try {
    const res=await axios.patch(`http://localhost:4007/perfume/editcategory/${id}`,{...val})
    console.log(res.data);
   
    if(res.status==404){
      alert("Data Not Added")
    }else{
      alert("Seccussfully Edited")
      navigate("/adminhome")
    }
   } catch (error) {
    alert("Data not added",error)
   }
    // console.log(res);
  }

    const Getdata=(e)=>{ 
        setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
        console.log(val);
      }


    
  return (
    <div>
     <div className="all-edit">
     <div class="container">
	
	<div class="modal">
		<div class="modal__header">
			<span class="modal__title">Edit Category</span><Link to='/adminhome'><button class="button button--icon"><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0V0z"></path>
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg></button></Link>
		</div>
		<div class="modal__body">
			
			<div class="input">
								{/* <label class="input__label">Email</label> */}
                <input class="input__field"  name='category' type="text" placeholder='Category' value={val.category} onChange={Getdata} />
			</div>
           
            <div class="input">
				{/* <label class="input__label">Password</label> */}
				<input class="input__field" name='about' type="text" placeholder='About' id='about-inp' value={val.about}  onChange={Getdata} /> 
			</div>

          
		</div>
		<div class="modal__footer">
			<button class="button button--primary" onClick={editcategory} >Add</button>
		</div>
	</div>
</div>
     </div>
    </div>
  )
}

export default Editcategory
