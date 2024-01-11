import React, { useEffect, useState } from 'react'
import './Wishlist.scss'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const Wishlist = () => {

  const { id } = useParams();
  const [getPrdct, setProdct] = useState([]);

  const getwishlistprdct=async()=>{
    const res=await axios.get(`http://localhost:4007/perfume/getWishlistProduct/${id}`)
    setProdct(res.data)
    console.log(res.data);
  }

  useEffect(()=>{
    getwishlistprdct();
  },[])

  const delwishlistPrdct = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this product from the cart?");
    if (userConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:4007/perfume/delWishListProduct/${id}`);
        // console.log(res.data);
        if (res) {
          alert("Product deleted");
        } else {
          alert("Product not deleted");
        }
        getwishlistprdct();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };


  return (
    <div>
       <div className="category-all">
  <div className="back">
    <Link to='/'><button><i class="fa fa-arrow-left" aria-hidden="true"></i> back</button></Link>
  </div>
  <div className="recomend">
    <h4>wishlist</h4>
    <div className="products">
      {
        getPrdct.map((data, index) => (
          <div key={index}>
            <Link className="prod-detail" to={`/custproductdetails/${data._id}`} >
              <div className="col-lg-3 prod-1">
                <img src={data.banner} alt="" />
                <div className="details">
                  <h5>{data.name}</h5>
                  <p>{data.title}</p>
                  {/* <p>{data.description}</p> */}
                  <h5 id='prod-price'>{data.price}₹</h5>
                  
                  <Link className='delete-btn' onClick={()=>delwishlistPrdct(data._id)} >Delete</Link>
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

export default Wishlist
