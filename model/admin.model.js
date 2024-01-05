import mongoose from "mongoose";

const admin_schema=new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    phone:{type:String},
    password:{type:String}
})

export default mongoose.model.Admin||mongoose.model("admin",admin_schema)