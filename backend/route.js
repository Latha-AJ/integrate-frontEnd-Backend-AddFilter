const express = require('express');
const { model } = require('mongoose');
const route = express.Router()
let userModel = require("./userModel/userModel")


// post API to add user 

route.post("/adduser", async function(req,res){
    const data = req.body;
    const {name,email,phone} = data;
// if missing any field, then throw error
if(!name || !email || !phone) return res.status(400).send({message:"missing the mandatory fileds"})
const newUser = await userModel.create(data);
res.status(201).send({message:"user Added successfully", data: newUser})
})

// get details of all the users

route.get("/getUser", async function(req,res){            
    let page = req.query.page;    
    let limit = req.query.limit;
    // calculate how many documents have to be skipped. 
    let skip = page*limit; 
    const getTotal = await userModel.find()   
    const getUser = await userModel.find().skip(skip).limit(limit)    
    if(getUser.length==0) return res.status(400).send({message:"No user found"})    
    res.status(200).send({length:getTotal.length, data:getUser})
})

route.get("/getuserByName", async function(req,res){
    let name= req.query.name;
    // using regex to fetch all the matched documents
    const getUser = await userModel.find({name:{'$regex': `(\s+${name}|^${name})`, '$options': 'i'}},{})    
    res.status(200).send(getUser)
})

module.exports = route;