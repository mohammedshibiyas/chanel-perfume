import React, { useState } from 'react'
import './Addcustomer.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Addcustomer = () => {
  let Photo=""
  const[val,setVal]=useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    personal_address:"",
    location:{
        state:"",
        district:"",
        pincode:"",
        place:"",
        landmark:"",
        street:"",
    },
    photo:""
  })

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
  }

  const upload=async(e)=>{
    e.preventDefault();
    Photo= await convertToBase64(e.target.files[0])
    console.log(Photo);
  }

  const Getlocation=(e)=>{
    setVal((pre)=>({...pre,location:{...pre.location,[e.target.name]:e.target.value}}))
  }

  const GetData=(e)=>{
   setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
   console.log(val);
  }

  const registerCustomer=async(e)=>{
    e.preventDefault();
   try {
    const res=await axios.post("http://localhost:4007/perfume/addcustomer",{...val,photo:Photo})
    console.log(res.data);
    if(res)
    {
      alert("successfully Registered")
    }
   } catch (error) {
    alert("Not added")
   }

  }
  return (
    <div>
      <div className="cust-all">
      <div className="back">
              <Link to='/adminlogin'><button><i class="fa fa-arrow-left" aria-hidden="true"></i> back</button></Link>
            </div>
        <div className="head">
          <h6>Create Account</h6>
        </div>
        <div className="register">
          <div className="input-field">
            <input type="text" name='name' placeholder='Name'onChange={GetData} />
            <input type="text" name='email' placeholder='Email' onChange={GetData}/>
          </div>

          <div className="input-field">
            <input type="password" name='password' placeholder='Password'onChange={GetData} />
            <input type="text" name='phone' placeholder='Phone' onChange={GetData}/>
          </div>

          <div className="input-field">
            <input type="text" name='personal_address' placeholder='Personal Address' onChange={GetData} />
            <input type="text" name='state' placeholder='State' onChange={Getlocation}/>
          </div>

          <div className="input-field">
            <input type="text" name='district' placeholder='District' onChange={Getlocation}/>
            <input type="text" name='pincode' placeholder='Pincode' onChange={Getlocation}/>
          </div>

          <div className="input-field">
            <input type="text" name='place' placeholder='Place' onChange={Getlocation} />
            <input type="text" name='landmark' placeholder='Landmark' onChange={Getlocation}/>
          </div>

          <div className="input-field">
            <input type="text" name='street' placeholder='Street' onChange={Getlocation}/>
            <input type="file" name='photo' placeholder='Photo' id='image' onChange={upload}/>
          </div>
         <div className="reg-btn">
         <Link className='register-btn' onClick={registerCustomer}>Register</Link>
         <p id='already'>already have an acc? <Link className='log' to='/logincustomer'>Login</Link></p>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Addcustomer
