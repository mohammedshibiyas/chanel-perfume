import React from 'react'
import { Link } from 'react-router-dom'
import './Forgotpassword.css'
import { useState } from 'react'




const Forgotpassword = () => {
    const [val,setVal]=useState({})
    const handlechange=(e)=>{
        setVal({[e.target.name]:e.target.value})
        console.log(val);
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
								{/* <label class="input__label">Email</label> */}
                <input class="input__field" name='email' type="text"  placeholder="Email" onChange={handlechange}/>
			</div>
            <div class="input">
								{/* <label class="input__label">Phone</label> */}
                <input class="input__field" name='phone' type="text" placeholder='Phone' onChange={handlechange}/>
			</div>
            <div class="input">
				{/* <label class="input__label">Password</label> */}
				<input class="input__field" name='password' type="password" placeholder='New Password' onChange={handlechange}/> 
			</div>

          
		</div>
		<div class="modal__footer">
			<button class="button button--primary" >Change Password</button>
     <span> <Link to='/adminlogin'> <a>Back</a></Link></span>
		</div>
	</div> 
</div>
    </div>
  )
}

export default Forgotpassword
