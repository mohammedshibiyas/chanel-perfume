import React from 'react'
import './Adminlogin.scss'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import  axios  from 'axios'

const Adminlogin = () => {
    
    const navigate=useNavigate()
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const Login=async(e)=>{
        e.preventDefault()
        try {
            const res=await axios.post("http://localhost:4007/perfume/adminlogin",{
                email:email,
                password:password
            })
            const data=res.data;
            console.log(data);
            if(res.status!==404){
              const token=data.token
              localStorage.setItem("admin_token",JSON.stringify(token))
              navigate("/adminhome")
        }}
         catch (error) {
            alert("can't login")
        }

    }


  return (
    <div>
       <div className="all-login">
       <div class="container">
	
	<div class="modal">
		<div class="modal__header">
			<span class="modal__title">Admin Login</span><Link to='/'><button class="button button--icon"><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0V0z"></path>
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg></button></Link>
		</div>
		<div class="modal__body">
			
			<div class="input">
								{/* <label class="input__label">Email</label> */}
                <input class="input__field" name='email' type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
			</div>
           
            <div class="input">
				{/* <label class="input__label">Password</label> */}
				<input class="input__field" name='password' type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/> 
			</div>

          
		</div>
		<div class="modal__footer">
			<button class="button button--primary" onClick={Login}>Login</button>
		</div>
	</div>
</div>


       </div>
           </div>
  )
}

export default Adminlogin
