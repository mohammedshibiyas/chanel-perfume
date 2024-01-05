import React, { useState } from 'react'
import './Logincustomer.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logincustomer = () => {
    const navigate=useNavigate();
    const [val,setVal]=useState({
            email:"",
         password:""
    })

    const GetData=(e)=>{
        setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
        console.log(val);
    }


    const custLogin=async()=>{
      try {
        const res=await axios.post("http://localhost:4007/perfume/logincustomer",{...val})
        console.log(res.data);
        const data=res.data

        if(res){
            alert("Successfully login")
            const customer_token=data.token
            localStorage.setItem("customer_token",JSON.stringify(customer_token))
            navigate("/")
        }
      } catch (error) {
        alert(error,"login failed")
      }
    }
  return (
    <div>
      <div className="login-all">
        <div className="row">
            <div className="col-lg-8">
            {/* <div className="back">
              <Link to='/adminlogin'><button><i class="fa fa-arrow-left" aria-hidden="true"></i> back</button></Link>
            </div> */}
            <div className="main-image">
                <img src="/main2.jpg" alt="" />
            </div>
            </div>
            <div className="col-lg-4 login-content">
           
        <div className="head">
          <h6>Login here !</h6>
        </div>
        <div className="login">
          <div className="input-field">
          <input type="text" name='email' placeholder='Email' onChange={GetData} />
          </div>

          <div className="input-field">
          <input type="password" name='password' placeholder='Password' onChange={GetData} />
          </div>

         <div className="login-button">
         <Link className='login-btn' onClick={custLogin}>Login</Link>
         <p id='already'>Don't have an acc? <Link className='log' to='/addcustomer'>Register</Link></p>

         </div>



        </div>
            </div>
        </div>
 
      </div>
    </div>
  )
}

export default Logincustomer
