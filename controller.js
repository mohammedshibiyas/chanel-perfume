import admin_schema from './model/admin.model.js'
import category_schema from './model/category.model.js'
import product_schema from './model/product.model.js'
import customer_schema from './model/customer.model.js'
import wishlist_schema from './model/wishlist.model.js'
import cart_schema from './model/cart.model.js'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const {sign}=pkg



export async function addAdmin(req,res){

    try {
        const{username,phone,email,password}=req.body
        console.log(username,phone,email,password);

        if(!(username&&phone&&email&&password))
        return res.status(404).send("fields are empty")

        bcrypt.hash(password,10)
        .then((hashedpwd)=>{
            admin_schema.create({username,phone,email,password:hashedpwd})
        })
        .then(()=>{
            res.status(201).send("successfully registered")
        })
        .catch((error)=>{
            res.status(500).send(error)
        })

    } catch (error) {
        console.log(error);
    }

}

export async function adminLogin(req, res) {
    try {
     console.log(req.body);
     const { email, password } = req.body;
     const usr = await admin_schema.findOne({ email })
     console.log(usr);
     if (usr === null) return res.status(404).send("username or password doesnot exist");
     const success =await bcrypt.compare(password, usr.password)
     console.log(success);
     const{username}=usr
     console.log("hai",usr);
     if (success !== true) return res.status(404).send("username or password doesnot exist");
     const token = await sign({ username }, process.env.JWT_KEY, { expiresIn: "24h" })
     console.log(username);
     console.log(token);
     res.status(200).send({ msg: "successfullly login", token })
     res.end();
     
    } catch (error) {
     console.log(error); 
}
}

export async function home(req,res){
    try {
      console.log(req.user);

      const {username}=req.user
    //   console.log(username);
      res.status(200).send({msg:` ${username}`})
    res.end()
      
    } catch (error) {
      res.status(404).send(error)
      
    }
  
   }

   export async function adminFrgtPwd(req, res) {
    const phone = req.params.phone;
    // const updatedPassword = req.body.password;
    const{email,password}=req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    let task = await admin_schema.updateOne({ email }, { $set: { password: hashedPassword } });
    res.status(200).send(task);
}

// category

export async function addCategory(req,res){

    try {
        const { category, about } = req.body;
        console.log(category, about);
        if (!(category && about)) {
          return res.status(400).send("Fields are empty");
        }
        const task=await category_schema.create({ category, about });
    
        res.status(200).send(task);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }

}

export async function getCategory(req,res){ 
    let task=await category_schema.find()
    res.status(200).send(task)
}

export function delCategory(req,res)
{
    const{id}=req.params;
    const data=category_schema.deleteOne({_id:id})
    data.then((resp)=>{
        res.status(200).send(resp)
    }).catch((error)=>{
        res.status(404).send(error)
    })
}

export async function EditCategory(req, res) {
  const { id } = req.params;
  try {
      const updatedData = req.body;
      const value = await category_schema.updateOne({ _id: id }, { $set: updatedData });
      res.status(200).send(value);
  } catch (error) {
      res.status(404).send(error);
  }
}

export async function getfullcategory(req,res){
  const{id}=req.params;
  console.log(id);
  let task=await category_schema.findOne({_id:id})
  console.log(task);
  res.status(200).send(task)
}


// product

export async function AddProducts(req, res) {
  try {
    
    const { ...products} = req.body;
    const task=await product_schema.create({...products});
    console.log(task);
    res.status(200).send({result : task});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
// export async function SetPath(req,res)
// {
//   let { filename } = req.params;
//   console.log(filename);
//   return res.sendFile(path.resolve(`./images/${filename}`))
// }

export async function getcategorywise(req,res){
 try {
  const {category}=req.params;
  const product=await product_schema.find({category:category});

  res.status(200).send(product)
 } catch (error) {
  res.status(500).send("internal server error")
 }
}

export async function delproduct(req,res){
  const{id}=req.params;
  const data=product_schema.deleteOne({_id:id})
  data.then((resp)=>{
      res.status(200).send(resp)
  }).catch((error)=>{
      res.status(404).send(error)
  })
}

export async function getProduct(req,res){
  const{id}=req.params
  console.log(id);
  const data=await product_schema.findOne({_id:id})
  console.log(data);
  res.status(200).send(data)
}

export async function editProduct(req,res){
  const { id } = req.params;
  try {
      const updatedData = req.body;
      const value = await product_schema.updateOne({ _id: id }, { $set: updatedData });
      res.status(200).send(value);
  } catch (error) {
      res.status(404).send(error);
  }
}

export async function getAllProducts(req,res){
  let task=await product_schema.find()
  res.status(200).send(task)
}

export async function getProductcust(req,res){
  const{id}=req.params
  console.log(id);
  const data=await product_schema.findOne({_id:id})
  console.log(data);
  res.status(200).send(data)
}
// customer

export async function addCustomer(req,res){
  const {password,...custDetails}=req.body
  const hashedpwd=await bcrypt.hash(password,10)
  customer_schema.create({...custDetails,password:hashedpwd})
   res.status(200).send("succesfully registered")

}
export async function loginCustomer(req,res){
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const usr = await customer_schema.findOne({ email })
    console.log("haii",usr);
    if (usr === null) return res.status(404).send("username or password doesnot exist");
    const success =await bcrypt.compare(password, usr.password)
    console.log(success);
    const{name,_id}=usr
    console.log("hai",usr);
    if (success !== true) return res.status(404).send("username or password doesnot exist");
    const token = await sign({ name,_id }, process.env.JWT_KEY, { expiresIn: "24h" })
    console.log(name);
    console.log(token);
    res.status(200).send({ msg: "successfullly login", token })
    res.end();
    
   } catch (error) {
    console.log(error,"internal server error"); 
}
}

export async function customerHome(req,res)
{
  try {
    console.log(req.user);
    

    const {name,_id}=req.user
    console.log(name);
  //   console.log(username);
    res.status(200).send({msg:` ${name}`,id:`${_id}`})
  res.end()
    
  } catch (error) {
    res.status(404).send(error)
    
  }
}

// cart

export async function Addtocart(req,res){
  try {
    console.log(req.body);
    const {  cust_id,prod_id,name,category,description,quantity,price,banner } = req.body;
    const task = await cart_schema.create({  cust_id,prod_id,name,category,description,quantity,price,banner });
    console.log(task);
    res.status(200).send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }

}


export async function getCartProduct(req,res){
  const { id }=req.params;
  console.log(id);
  let task=await cart_schema.find({ cust_id:id })
  console.log(task);
  res.status(200).send(task)
}

export function delCartProduct(req,res)
{
    const{id}=req.params;
    const data=cart_schema.deleteOne({_id:id})
    data.then((resp)=>{
        res.status(200).send(resp)          
    }).catch((error)=>{
        res.status(404).send(error)
    })
}

// export function deleteAllProducts(req,res)
// {
//     const{id}=req.params;
//     const data=cart_schema.deleteMany({cust_id:id})
//     data.then((resp)=>{
//         res.status(200).send(resp)          
//     }).catch((error)=>{
//         res.status(404).send(error)
//     })
// }

export function deleteAllProducts(req,res)
{
    const{id}=req.params;
    console.log("cart",id);
    const data=cart_schema.find({cust_id:id})
    console.log("wqw  qw  w qw  qw",data);        
  
    const result=data.map(dt=> product_schema.updateOne({_id:dt.prod_id},{$inc:{stockes:-(dt.quantity)}})
     // custOrder_schema.create({pname:dt.pname,qty:dt.qty})
    )
   
    Promise.all(result).then(()=>{
        // res.status(200).send(resp)  
        // delete from cart
        console.log("updated");        
    }).catch((error)=>{
      console.log('error');
        // res.status(404).send(error)
    })
}

export async function placeOrder(req, res) {
  try {
    const { id } = req.params;
    let cart = await cart_schema.find({ cust_id: id });
    console.log(cart);
    let s="";
    const stockeResult=cart.map(dt=>
        // s=dt.size;
        // console.log(s)  
      product_schema.updateOne({_id:dt.prod_id},{$inc:{stock:{s:-(dt.quantity)}}})
      // product_schema.updateOne({_id:dt.prod_id},{ $inc: { [stock.${dt.size}]: -(dt.quantity)}})
      )
      Promise.all(stockeResult).then(()=>{
        console.log("update");
      })
      .catch(()=>{console.log("error");})
    

    // const result = await Promise.all(
    //   cart.map(async (item) => {
    //     const order = await myOrder_schema.create({ ...item });
    //     return order;
    //   })
    // );

    // // After all orders are created, delete the items from the cart
    // await cart_schema.deleteMany({ cust_id: id });

    // res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}










export async function editQuantity(req, res) {
  const { prodId } = req.params;
  try {
      const updatedData = req.body;
      const value = await cart_schema.updateOne({ prod_id: prodId }, { $set: updatedData });
      res.status(200).send(value);
  } catch (error) {
      res.status(404).send(error);
  }
}

// wishlist


export async function AddToWishList(req, res) {
  try {
    const { ...productdetails } = req.body;
    const task = await wishlist_schema.create({ ...productdetails });
    console.log(task);
    res.status(200).send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

export async function getWishlistProduct(req,res){
  const { id }=req.params;
  console.log(id);
  let task=await wishlist_schema.find({ cust_id:id })
  console.log(task);
  res.status(200).send(task)
}

export function delwishListProduct(req,res)
{
    const{id}=req.params;
    const data=wishlist_schema.deleteOne({_id:id})
    data.then((resp)=>{
        res.status(200).send(resp)          
    }).catch((error)=>{
        res.status(404).send(error)
    })
}
