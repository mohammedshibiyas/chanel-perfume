import React, { useEffect } from 'react'
import './Wishlist.scss'
import { Link } from 'react-router-dom'
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

  return (
    <div>
       <div className="category-all">
  <div className="back">
    <Link to='/'><button><i class="fa fa-arrow-left" aria-hidden="true"></i> back</button></Link>
  </div>
  <div className="recomend">
    <h4>Collections</h4>
    <div className="products">
      {
        getPrdct.map((data, index) => (
          <div key={index}>
            <Link className="prod-detail" >
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

export default Wishlist
