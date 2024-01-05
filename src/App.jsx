
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Adminreg from './component/Admin/Adminreg'
import Adminlogin from './component/Admin/Adminlogin/Adminlogin'
import Adminhome from './component/Admin/Adminhome/Adminhome'
import Forgotpassword from './component/Admin/Forgot password/Forgotpassword'
import Addcategory from './component/Admin/Adminhome/Addcategory/Addcategory'
import Addproduct from './component/Admin/Adminhome/product/Addproduct/Addproduct'
import Editcategory from './component/Admin/Adminhome/editcategory/Editcategory'
import Home from './component/Home/Home'
import Categoryproduct from './component/category-vise/Categoryproduct'
import Addcustomer from './component/User/Customerreg/Addcustomer'
import Logincustomer from './component/User/Logincust/Logincustomer'
import Productdetails from './component/Admin/Adminhome/product/productdetails/ProductdetailsAdm'
import EditproductAdm from './component/Admin/Adminhome/product/editproduct/EditproductAdm'
import Allproducts from './component/Home/product/allproducts/Allproducts'
import Custproductdetails from './component/Home/product/Custproductdetails/Custproductdetails'
import Cart from './component/Home/cart/Cart'
import Wishlist from './component/Home/wishlist/Wishlist'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/adminregister' Component={Adminreg}/>
            <Route path='/adminlogin' Component={Adminlogin}/>
            <Route path='/adminhome' Component={Adminhome}/>
            <Route path='/adminforgetpwd' Component={Forgotpassword}/>
            <Route path='/addcategory' Component={Addcategory}/>
            <Route path='/addproduct' Component={Addproduct}/>
            <Route path='/editcategory/:id' Component={Editcategory}/>
            <Route path='/' Component={Home}/>
            <Route path='/categoryproduct/:category' Component={Categoryproduct}/>
            <Route path='/addcustomer' Component={Addcustomer}/>
            <Route path='/logincustomer' Component={Logincustomer}/>
            <Route path='/productdetails/:id' Component={Productdetails}/>
            <Route path='/editproduct/:id'Component={EditproductAdm}/>
            <Route path='/allproducts' Component={Allproducts}/>
            <Route path='/custproductdetails/:id' Component={Custproductdetails}/>
            <Route path='/addtocart/:id' Component={Cart}/>
            <Route path='/addtowishlist/:id' Component={Wishlist}/>

          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
