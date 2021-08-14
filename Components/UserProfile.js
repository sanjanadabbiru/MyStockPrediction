
import React, {useState} from 'react';
import Papa from 'papaparse'
import './UserProfile.css'
import {Container,Row,Col,Card,Nav,Navbar,ListGroup,NavDropdown} from 'react-bootstrap'
import img1 from './FYPZip/FrontEnd/Display/Users/Images/Sanj.png'
function UserProfile(){
  //   const [rows, setRows] = React.useState([])
  // React.useEffect(() => {
  //   async function getData() {
  //     const response = await fetch(`${process.env.PUBLIC_URL}/Users/Shar.csv`)
  //     const reader = response.body.getReader()
  //     const result = await reader.read() // raw array
  //     const decoder = new TextDecoder('utf-8')
  //     const csv = decoder.decode(result.value) // the csv text
  //     const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
  //     const rows = results.data // array of objects
  //     setRows(rows)
  //   }
  //   getData()
  // }, [])
    
    return(
        <div class="container">
   <div class="row">
    <div class="col">
        {/* {rows.map((d) => (
            <tr key={d.id}>
              <ListGroup.Item><strong>Status:{d.Status}</strong> 
              <br></br>
              Data:{d.Date}  
              <br></br>
              Id: {d.id}
              <br></br> 
              Ticker: {d.Ticker}
              <br></br> 
              Quanitiy: {d.Quantity}
              <br></br> 
              Cost: {d.Cost}</ListGroup.Item>
              
            </tr>
          ))} */}
          <img src={img1}></img>
          </div>
          </div>
          </div>
    )
}

export default UserProfile;