import React, { useState } from 'react'
import './Addcategory.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Addcategory = () => {

    const navigate=useNavigate()
    const[val,setVal]=useState({
        category:"",
        about:""
    })
    
    const Getdata=(e)=>{ 
        setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
        // console.log(val);
      }

      const addCategory=async(e)=>{
        e.preventDefault();

        const res=await axios.post("http://localhost:4007/perfume/addcategory",{...val})
        if(res.status!=404)
        {
            alert("successfully added")
            navigate("/adminhome")
        }
        else{
            alert("not add")
        }

      }

  return (
    <div>
      <div className="all-category">
      <div class="container">
	
	<div class="modal">
		<div class="modal__header">
			<span class="modal__title">Add Category</span><Link to='/adminhome'><button class="button button--icon"><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0V0z"></path>
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg></button></Link>
		</div>
		<div class="modal__body">
			
			<div class="input">
								{/* <label class="input__label">Email</label> */}
                <input class="input__field" name='category' type="text" placeholder='Category' onChange={Getdata} />
			</div>
           
            <div class="input">
				{/* <label class="input__label">Password</label> */}
				<input class="input__field" name='about' type="text" placeholder='About' id='about-inp'  onChange={Getdata} /> 
			</div>

          
		</div>
		<div class="modal__footer">
			<button class="button button--primary" onClick={addCategory} >Add</button>
		</div>
	</div>
</div>
      </div>
    </div>
  )
}

export default Addcategory
