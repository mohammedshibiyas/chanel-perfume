import React, { useEffect, useState } from 'react'
import "./Cart.scss"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {

    const navigate=useNavigate()
    const {id}=useParams()
    const [totalPrice,setTotalPrice]=useState(0)
    const [getPrdct,setProdct]=useState([])

    const getProdctdetails=async(e)=>{
      // e.preventDefault();
        const res=await axios.get(`http://localhost:4007/perfume/getCartProduct/${id}`)
        setProdct(res.data)
        // console.log(res.data);
    }
    useEffect(()=>{
        getProdctdetails();
    },[])

    useEffect(() => {
        const totalPriceSum = getPrdct.reduce((sum, product) => sum + Number(product.price), 0);
        setTotalPrice(totalPriceSum);
      }, [getPrdct]);

      const qty = (e, index) => {
        const selectedQuantity = parseInt(e.target.value, 10);
        const productPrice = getPrdct[index].price;
       
        if (!isNaN(productPrice)) {
          console.log(getPrdct[index].price);
          const updatedPrice = selectedQuantity * productPrice
          console.log(updatedPrice);
          const updatedGetPrdct = [...getPrdct];
          updatedGetPrdct[index].price = updatedPrice;
          setProdct(updatedGetPrdct);
        } else {
          console.error('Invalid product price:', productPrice);
        }
      };


      const delCartPrdct = async (id) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this product from the cart?");
        if (userConfirmed) {
          try {
            const res = await axios.delete(`http://localhost:4007/perfume/delCartProduct/${id}`);
            // console.log(res.data);
            if (res) {
              alert("Product deleted");
            } else {
              alert("Product not deleted");
            }
            getProdctdetails();
          } catch (error) {

            console.error("Error deleting product:", error);
          }
        }
      };

  return (
    <div>
      <div className="all-cart">
        <div className="head">
            <h4>Shopping cart</h4>
            <p>CHANEL presents each purchase in signature packaging.</p>
        </div>
        <div className="roow">
  {getPrdct.map((data, index) => (
    <div className="product-container" key={index}>
      <div className="left-side">
        <img src={data.banner} alt="" />
        <div className="content">
          <h5>{data.name}</h5>
          <p>{data.title}</p>
          <Link className="delete-btn" onClick={() => delCartPrdct(data._id)}>
            Delete
          </Link>
        </div>
      </div>
      <div className="right-side">
        <div className="qty">
          <select name="" id="" onChange={(e) => qty(e, index)}>
            <option value="1">Qty : 1</option>
            <option value="2">Qty : 2</option>
            <option value="3">Qty : 3</option>
          </select>
        </div>
        <div className="price">
          <h5>{data.price} ₹</h5>
        </div>
      </div>
     
    </div>
    
  ))}
</div>
{/* 
        <div className="roow">
          
            <div>
            <div className="left-side">
                <img src="/n5.jpg" alt="" />
                <div className="content">
                    <h5>Note 5</h5>
                    <p>Eau de Parfum Spray</p>
                    <Link className="delete-btn">Delete</Link>
                </div>
            </div>
            <div className="right-side">
                <div className="qty">
                <select name="" id=""  onChange={(e) => qty(e, index)}>
                <option value="1">Qty : 1</option>
                <option value="2">Qty : 2</option>
                <option value="3">Qty : 3</option>
               
              </select>
                </div>
                <div className="price">
                    <h5>105$</h5>
                </div>
            </div>
            </div>
        </div> */}

        <div className="total">
            <div className="subtotal">
                <p>Subtotal</p>
                <h6>₹  {totalPrice ? totalPrice : 0}</h6>
            </div>
            <div className="total-price">
                <h5>Total</h5>
                <h6>₹ {totalPrice ? totalPrice + 99 : 99}</h6>
            </div>
        </div>

        <div className="check-out">
          <Link className='checkout-btn'>Continue to checkout</Link>
        </div>

      </div>
    </div>
  )
}

export default Cart
