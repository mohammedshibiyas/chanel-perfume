import React, { useEffect, useState } from 'react'
import "./Cart.scss"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {

    const navigate=useNavigate()
    const {id}=useParams()
    const [totalPrice,setTotalPrice]=useState(0)
    const [getPrdct,setProdct]=useState([])

    const updateQuantity=async(id,e)=>{
      try {
        const newQuantity = parseInt(e);
        console.log(newQuantity);
        const res=await axios.patch(`http://localhost:4007/perfum/updateCartItem/${id}`,{quantity:newQuantity})
        console.log(res.data);
        getPrdctDetails();
      } catch (error) {
        console.log(error);
      }
    }

    const getProdctdetails=async(e)=>{
      // e.preventDefault();
        const res=await axios.get(`http://localhost:4007/perfume/getCartProduct/${id}`)
        setProdct(res.data)
        
    }
    useEffect(()=>{
        getProdctdetails();
    },[])

    useEffect(() => {
      const totalPriceSum = getPrdct.reduce((sum, product) => sum + Number(product.price *product.quantity ), 0);
      console.log(totalPriceSum);
      setTotalPrice(totalPriceSum);
      }, [getPrdct]);

      const BuyNow = async (e) => {
        e.preventDefault();
        const userConfirmed = window.confirm("Are you sure you want to proceed to checkout?");
        if (userConfirmed) {
          try {
    
            // console.log(res.data);
            await axios.delete(`http://localhost:4007/perfume/delAlltProduct/${id}`);
            alert("Order Placed");
            navigate("/")
          } catch (error) {
            console.error("Error deleting products:", error);
          }
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
          <select name="" id="" onChange={(e)=>{updateQuantity(data.prod_id,e.target.value)}}>
            <option value="1">Qty : 1</option>
            <option value="2">Qty : 2</option>
            <option value="3">Qty : 3</option>
          </select>
        </div>
        <div className="price">
          <h5>₹ {data.price}</h5>
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
            <div className="delivery">
            <p>Delivery Fee</p>
                <h6>₹ 99</h6>
            </div>
            <div className="total-price">
                <h5>Total</h5>
                <h6>₹ {totalPrice ? totalPrice + 99 : 99}</h6>
            </div>
        </div>

        <div className="check-out">
          <Link className='checkout-btn' onClick={BuyNow}>Continue to checkout</Link>
        </div>

      </div>
    </div>
  )
}

export default Cart
