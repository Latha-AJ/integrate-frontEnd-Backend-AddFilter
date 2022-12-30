const mongoose = require("mongoose")

const userSchma = new mongoose.Schema({
name:{
   type:String,
   required: true,   
},
phone:{
    type: Number,
    required:true
},
email:{
    type:String,
    unique: true
}
}, {timestamps:true})


module.exports = mongoose.model("user", userSchma)
