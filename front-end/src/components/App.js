import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
// sets the fetched data to the data variable
const [data, setdata] = useState([])
// sets the filtered value to the value variable
const [value, setValue] = useState([])
// current page is set to 0 in the beginning, it will get increased as we click next page button.
const [currentPage, setCurrentPage] = useState(0)
const [pageLimit, setPage] = useState(1)
// error and loading states
const [isEror, setError] = useState(null)
const [isLoading, setLoading] = useState(false)

// function to fetch documents from server
async function getData(page,limit,increase){
  setLoading(true)
return await axios.get(`http://localhost:5000/getUser?page=${page}&limit=${limit}`).then((res)=>{  
  setdata(res.data.data) 
  setPage(res.data.length)
  setLoading(false)
  setCurrentPage(currentPage+increase)  
}).catch((err)=>{
  setError(err)
  console.log(err)  
})
}
useEffect(()=>{
  getData(0,4,0)
},[])

let NoOfPages = Math.ceil(pageLimit/4)

// function to handle filters with name
async function handleSearch(e){  
  e.preventDefault();
  console.log(value)
  return await axios.get(`http://localhost:5000/getuserByName?name=${value}`).then((res)=>{
    console.log(res.data)
    setdata(res.data)
    setValue("")    
    console.log(res)
  }).catch((err)=>{
    alert("there is an error", err)
    console.log("error is", err)
  })
}

function handleReset(){
  getData(0,4,1)
}

// function to handle pagination features
function renderPagination(){  
  if(currentPage===0){
    // if displayed page is the first page
    return (
      <div  className='pageClass' style={{maxWidth:"200px", textAlign:"center"}}>
        <p>1</p><button onClick={()=>{getData((currentPage+1),4,1)}}>Next</button>
      </div>
    )
  }else if(currentPage<NoOfPages && (currentPage+1)!==NoOfPages){
    
    return(
               <div className='pageClass' style={{maxWidth:"200px", textAlign:"center"}}>
                <button onClick={()=>{getData((currentPage-1), 4,-1)}}>Previous</button>
                <p>{currentPage+1}</p>
                <button  onClick={()=>{getData((currentPage+1),4,1)}}>Next</button>
               </div>
          )
  }else{
    // if displayed page is last page
    return(
      <div className='pageClass' style={{maxWidth:"200px", textAlign:"center"}}>
       <p>{currentPage+1}</p><button onClick={()=>{getData((currentPage-1),4,-1)}}>Previous</button>
      </div>
    )
  }
}
// if loading is true, then show loading
if(isLoading) {return <h1 style={{textAlign:"center"}}>...Loading</h1>}
// if there is an error, throw error
if(isEror) {return <p style={{textAlign:"center"}}>There is an error</p>}

  return (
   
    <div className='users'>
<form style={{
  margin:"auto",
  padding:"15px",
  maxWidth:"400px",
  alignContent:"center"}} onSubmit={handleSearch}>  
  <input type="text" className="inputFiled" placeholder='Search name' onChange={(e)=>{
    setValue(e.target.value) }} value ={value} style={{marginRight:"5px"}}/>

  <button type='submit' className ="search" color='dark' style={{marginRight:"5px"}}>Search </button>
  <button className='reset' color='dark' onClick={handleReset} style={{marginRight:"5px"}}>Reset </button>  
</form>
<div style={{marginTop:"100px"}}>
<Link to="/Adduser">
  <button className='AdduserBTN'>Add user</button>
</Link><br></br>
<table>
  <thead>     
     <tr>
      <th scope='col'>No</th>
      <th scope='col'>Name</th>
      <th scope='col'>Email</th>
      <th scope='col'>Phone</th>
     </tr>
     </thead> 

     {data.length===0 ? (
      
      <tbody>
        <tr>
          <td>No data found</td>
        </tr>
        </tbody>
      
     ):(
      data.map((item,index)=>{
        return (
          <tbody>
            <tr>
              <th scope='row'>{index+1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          </tbody>
        )
      })
     )}
     
  </table>
  
<br></br>
<div>
 {renderPagination()} 
</div>
</div>
    </div>
   
  );
}

export default App;
