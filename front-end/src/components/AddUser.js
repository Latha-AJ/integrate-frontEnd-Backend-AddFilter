import React, { useState } from "react";
import axios from "axios"
import "./AddUser.css"
import { Link } from "react-router-dom";


const obj = {
    name:"",
    email:"",
    phone:""
}


function AddUser(){

const [details, setDetails] = useState(obj)
let {name,email,phone} = details;

async function handleSubmit(e){
        e.preventDefault()
        console.log(name,email,phone)
if(!name || !email || !phone){
    alert("missing the mandatory fields")
}else{
    return axios.post("http://localhost:5000/adduser",{name:name,email:email,phone:phone})
    .then((res)=>{
        alert("user added successully")
    }).catch((err)=>{
        alert(err.response.data.data)
        console.log(err)
    })
}
}

function handleChange(e){
const {name,value} = e.target;
setDetails({
    ...details,
    [name] : value
})



}


    return (
        <div className="addUser">
<form onSubmit={handleSubmit}>
<label htmlFor="name">Name</label>
 <input type="text" id="name" name="name" onChange={handleChange} value={name}/><br></br>

<label htmlFor="email">Email</label>
<input type="text" id="email" name="email" onChange={handleChange} value = {email}/><br></br>

<label htmlFor="phone">Phone</label>
<input type="Number" id="number" name="phone" onChange={handleChange} value={phone}/><br></br>

<input type="submit" value="Submit"/>
<Link to="/">
    <button>Go back to Home page</button>
</Link>

</form>
</div>
    )
}

export default AddUser