import mongoose from "mongoose";
const cart_schema=new mongoose.Schema({
    cust_id:{type:String},
    prod_id:{type:String},
    name:{type:String},
    category:{type:String},
    description:{type:String},
    quantity:{type:Number},
    price:{type:String},
    banner:{type:String}
})

export default mongoose.model.cart||mongoose.model("cart",cart_schema)