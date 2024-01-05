import React, { useEffect, useState } from 'react'
import './Editproduct.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'


const EditproductAdm = () => {

    const{id}=useParams();
    const navigate=useNavigate();
  let Images = "";
  let Banner = ""
  const [getCat, setCat] = useState([])
  const [val, setVal] = useState({
    name: "",
    category: "",
    title:"",
    description: "",
    price: "",
    stock: "",
    images: [],
    banner: ""

  })


  const convertToBase64Images = (files) => {
    return Promise.all(
      Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', () => resolve(reader.result));
          reader.addEventListener('error', (error) => reject(error));
          reader.readAsDataURL(file);
        });
      })
    );
  };

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
  
  
   const GetBanner=async(e)=>{
      e.preventDefault()
    
      Banner=await convertToBase64(e.target.files[0])
      console.log(Banner);
    }
  
 

  const GetImages = async (e) => {
    e.preventDefault()

    Images = await convertToBase64Images(e.target.files)
    console.log(Images);
    // setVal(Images)
  }



  const Getdata = (e) => {
    setVal((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    console.log(val);
  }

  const getproduct=async()=>{
    const res=await axios.get(`http://localhost:4007/perfume/getproduct/${id}`)
    setVal(res.data)
    console.log(res.data);
    // console.log(getProduct.images[0]);
  
  }
  useEffect(()=>{
    getproduct();
  },[])

  const getCategory = async () => {
    const res = await axios.get("http://localhost:4007/perfume/getcategory")
    setCat(res.data)
    console.log(getCat);
  }
  useEffect(() => {
    getCategory();
  }, [])



  const editProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`http://localhost:4007/perfume/editproduct/${id}`, { ...val, images: Images, banner: Banner })
      console.log(res.data);
      if (res.status != 404) {
        alert("Product Editted")
        navigate("/adminhome")

      }
    } catch (error) {
      alert("error")
    }
  }

  return (
    <div>
      <div className="add-product">
        <div class="container">

          <div class="modal_main">
            <div class="modal__header">
              <span class="modal__title">Edit Product</span><Link to='/adminhome'><button class="button button--icon"><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg></button></Link>
            </div>
            <div class="modal__body">

              <div class="input">
                {/* <label class="input__label">Email</label> */}
                <input class="input__field" name='name' type="text" value={val.name} placeholder='product Name' onChange={Getdata} />
              </div>

              <div class="input">
                <select class="input__field" name='category' type="text" value={val.category} placeholder='Category' onChange={Getdata} >
                  {
                    getCat.map((data, index) =>
                      <option value={data.category} key={index}>{data.category}</option>
                    )}
                </select>

              </div>
              <div class="input">
                {/* <label class="input__label">Password</label> */}
                <input class="input__field" name='title' type="text" placeholder='title' onChange={Getdata} id='titlee'  value={val.title}/>
              </div>

              <div class="input">
                {/* <label class="input__label">Password</label> */}
                <input class="input__field" name='description' type="text" placeholder='description' onChange={Getdata} id='descript' value={val.description} />
              </div>

              <div class="input">
                {/* <label class="input__label">Password</label> */}
                <input class="input__field" name='price' type="text" placeholder='price' onChange={Getdata}  value={val.price} />
              </div>

              <div class="input">
                {/* <label class="input__label">Password</label> */}
                <input class="input__field" name='stock' type="text" placeholder='stock' onChange={Getdata} value={val.stock} />
              </div>

              <div class="input">
                {/* <label class="input__label">Password</label> */}
                <input class="input__field" name='images' type="file" placeholder='photo' onChange={GetImages} multiple   />
              </div>

              <div class="input">
                {/* <label class="input__label">banner</label> */}
                <input class="input__field" name='banner' type="file" placeholder='Banner' onChange={GetBanner}   />
              </div>


            </div>
            <div class="modal__footer">
              <Link to='/adminhome'><button class="button button--primary" onClick={editProduct}>Add</button></Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default EditproductAdm
