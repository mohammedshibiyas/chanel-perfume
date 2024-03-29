import React, { useEffect, useState } from 'react'
import './Mencategory.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Lesexclusifes = () => {

    const [msg,setmsg]=useState("")
    const value=JSON.parse(localStorage.getItem('customer_token'));
    const[getproduct,setProduct]=useState([])
    const[cart,setCart]=useState({

    })

    const getName=async()=>{
      const res=await axios.get("http://localhost:4007/perfume/customerhome",{
        headers:{Authorization:`Bearer ${value}`},

      })
      setmsg(res.data.msg)
    }
    useEffect(()=>{
      getName();
    },[])



    const getProducts=async()=>{
        const res=await axios.get(`http://localhost:4007/perfume/getallproduct`)
        setProduct(res.data)
        setCart(res.data)
        console.log(res.data);
    }
    useEffect(()=>{
        getProducts();
    },[])

  return (
    <div>
         <div className="category-all">
  <div className="back">
    <Link to='/'><button><i class="fa fa-arrow-left" aria-hidden="true"></i> back</button></Link>
  </div>
  <div className="recomend">
    <h4> Men Collections</h4>
    <div className="products">
      {getproduct.filter((data)=> data.category==='les exclusifs')
        .map((data, index) => (
          <div key={index}>
            <Link className="prod-detail" to={`/custproductdetails/${data._id}`}>
              <div className="col-lg-3 prod-1">
                <img src={data.banner} alt="" />
                <div className="details">
                  <h5>{data.name}</h5>
                  <p>{data.title}</p>
                  {/* <p>{data.description}</p> */}
                  <h5 id='prod-price'>{data.price}₹</h5>
                  {/* <Link className='delete-btn' onClick={addToCart}>Add To Bag</Link> */}
                </div>
              </div>
            </Link>
          </div>
        ))
      }
    </div>
  </div>
</div>

    </div>
  )
}

export default Lesexclusifes
