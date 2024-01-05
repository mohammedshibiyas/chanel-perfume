import React, { useState } from 'react'
import './Adminreg.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Adminreg = () => {

   const navigate=useNavigate()
    const [val,setVal]=useState({
      username:"",
      phone:"",
      password:"",
      confirmpwd:""
    })
  
    const Getdata=(e)=>{ 
      setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
      // console.log(val);
    }
  
    const registerData=async(e)=>{
      e.preventDefault()
      console.log(val);
      const{password,confirmpwd}=val;
      if(password!=confirmpwd){
        alert("password not match")
      }
      else{

        const res=await axios.post("http://localhost:4007/perfume/addadmin",{...val})
      
      if(res.status!=201){
        alert("Data Not Added")
      }else{
        alert("Seccussfully Registred")
        navigate("/adminlogin")
      }
      // console.log(res);
    }
      }
      
  
  return (
    <div>
        <div class="container">
	
	<div class="modal">
		<div class="modal__header">
			<span class="modal__title">Admin Registration</span><button class="button button--icon"><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0V0z"></path>
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg></button>
		</div>
		<div class="modal__body">
			<div class="input">
				{/* <label class="input__label">Username</label> */}
				<input class="input__field" name='username' type="text" placeholder='Username' onChange={Getdata}/> 
			</div>
			<div class="input">
								{/* <label class="input__label">Email</label> */}
                <input class="input__field" name='email' type="text"  placeholder="Email" onChange={Getdata}/>
			</div>
            <div class="input">
								{/* <label class="input__label">Phone</label> */}
                <input class="input__field" name='phone' type="text" placeholder='Phone' onChange={Getdata}/>
			</div>
            <div class="input">
				{/* <label class="input__label">Password</label> */}
				<input class="input__field" name='password' type="password" placeholder='Password' onChange={Getdata}/> 
			</div>

            <div class="input">
				{/* <label class="input__label">Confirm Password</label> */}
				<input class="input__field" name='confirmpwd' placeholder='Confirm Password' type="password" onChange={Getdata}/> 
			</div>
		</div>
		<div class="modal__footer">
			<button class="button button--primary" onClick={registerData}>Register</button>
     <span> Already have an account <Link to='/adminlogin'> <a>Login</a></Link></span>
		</div>
	</div> 
</div>
    </div>
  )
}

export default Adminreg
