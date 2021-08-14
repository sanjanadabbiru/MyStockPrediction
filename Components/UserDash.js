import React, {useState,useEffect} from 'react';
import {Container,Row,Col,Card,Nav,Navbar,ListGroup,NavDropdown} from 'react-bootstrap'
import Graph from './Graph'
import './UserDash.css'
import { useAuth } from "../Contexts/AuthContext"
import performance from './FYPZip/FrontEnd/Display/Performance/Images/Shar.png'
import Papa from 'papaparse'
import { Link, useHistory } from "react-router-dom"
import * as XLSX from 'xlsx';

import img1 from './FYPZip/FrontEnd/Display/Buy/Images/0.png'
import img2 from './FYPZip/FrontEnd/Display/Buy/Images/1.png'
import img3 from './FYPZip/FrontEnd/Display/Buy/Images/2.png'
import img4 from './FYPZip/FrontEnd/Display/Buy/Images/3.png'
import img5 from './FYPZip/FrontEnd/Display/Buy/Images/4.png'
import img6 from './FYPZip/FrontEnd/Display/Buy/Images/5.png'
import img7 from './FYPZip/FrontEnd/Display/Buy/Images/6.png'
import img8 from './FYPZip/FrontEnd/Display/Buy/Images/7.png'
import img9 from './FYPZip/FrontEnd/Display/Buy/Images/8.png'
import img10 from './FYPZip/FrontEnd/Display/Buy/Images/9.png'
import {csv} from 'd3';


const data = [
  {Symbols: 'CVI' , ClosePerc: '14.04477303'},
  {Symbols: 'TAK' , ClosePerc: '12.49473022'},
  {Symbols: 'NRZ' , ClosePerc: '12.66245382'},
  {Symbols: 'CCM' , ClosePerc: '11.18345566'},
  {Symbols: 'AWP' , ClosePerc: '11.17782272'},
  {Symbols: 'CPS' , ClosePerc: '10.74046357'},
  {Symbols: 'WY' , ClosePerc: '9.515930318'},
  {Symbols: 'DSX' , ClosePerc: '8.907443635'},
  {Symbols: 'FHN' , ClosePerc: '8.720699481'},
  {Symbols: 'WRK' , ClosePerc: '8.197016024'}
];




function UserDash(){
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
   const history = useHistory()
   const [rows, setRows] = React.useState([])
   const [rows1, setRows1] = React.useState([])
  React.useEffect(() => {
    async function getData() {
      const response = await fetch(`${process.env.PUBLIC_URL}/currentbuy.csv`)
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      const rows = results.data // array of objects
      setRows(rows)
    }
    getData()
  }, [])

  React.useEffect(() => {
    async function getSell() {
      const response = await fetch(`${process.env.PUBLIC_URL}/SellOrHold/Sanj.csv`)
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      const rows1 = results.data // array of objects
      setRows1(rows1)
    }
    getSell()
  }, [])



  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }
    return(
        <div>
            <div id="nav">
<Navbar bg="dark" variant="dark" fixed="top">
    <Navbar.Brand>MyStocks</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/userdash">Dashboard</Nav.Link>
      <NavDropdown title="Profile" id="navbarScrollingDropdown">
        <NavDropdown.Item href="/userprofile">Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action5" onClick={handleLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar>
        </div>
        <br></br>
          <Container>
  
  
  <Row>
    <Col>
    
    <Card body><strong>Value of Current Holdings</strong>
    <br></br>
  1322
    <br></br>
    
   
    </Card>
    
    </Col>
    
    <Col>
    <a href="http://localhost:3000/newstock">
    <Card body >New Stocks</Card>
    </a>
    </Col>
  </Row>
  <br></br>
  <br></br>
  <Row>
    <Col>
    <Card body>Top 10 buy suggestions
    <br></br>
    <br></br>
    
    <ListGroup>
      <div class="container">
   <div class="row">
    <div class="col">
    {rows.map((d) => (
            <tr key={d.Symbols}>
              <ListGroup.Item><strong>{d.Symbols}</strong> {d.ClosePerc}  </ListGroup.Item>
            <br></br>
            <br></br>
            </tr>
          ))}
       </div>  
       <div class="col">   
  <ListGroup.Item ><img  src={img1} /></ListGroup.Item>
  <ListGroup.Item><img  src={img2} /></ListGroup.Item>
  <ListGroup.Item><img  src={img3} /></ListGroup.Item>
  <ListGroup.Item><img  src={img4} /></ListGroup.Item>
  <ListGroup.Item ><img  src={img5} /></ListGroup.Item>
  <ListGroup.Item><img  src={img6} /></ListGroup.Item>
  <ListGroup.Item><img  src={img7} /></ListGroup.Item>
  <ListGroup.Item><img  src={img8} /></ListGroup.Item>
  <ListGroup.Item><img  src={img9} /></ListGroup.Item>
  <ListGroup.Item><img  src={img10} /></ListGroup.Item>
 </div>
 </div>
  </div>
</ListGroup>
</Card>
    </Col>
    <Col>
    <Card body>Top sell/hold suggestions for stocks
    <br></br>
    {rows1.map((d) => (
            <tr key={d.Symbol}>
              <ListGroup.Item>
                <div class="row">
              <div class ="col">
                <strong>{d.Symbol}</strong>
                </div>
                <div class ="col">
                 {d.ClosePerc}
                 </div> 
                 <div class ="col">
                 {d.Suggestion}  </div> </div></ListGroup.Item>
              <br></br>
            </tr>
          ))}
    <br></br>
    <ListGroup >
  <ListGroup.Item ></ListGroup.Item>
  
</ListGroup>
</Card>
    </Col>
  </Row>
  <br></br>
  <br></br>
  <Row>
    
    <Col md={{ span: 10, offset: 2 }}>
    <Card body>Performance
    <br></br>
    <img src={performance} id="perform"></img>
    </Card>
    
    </Col>
  </Row>
</Container>


        </div>
    )
}

export default UserDash;





























{/* <Col xs lg="2" id="sidenav">
    <Card body>
     Navigation
     <Navbar collapseOnSelect="false">
  <Nav defaultActiveKey="/home" className="flex-column">
  <Nav.Link >Link</Nav.Link>
  <Nav.Link >Link</Nav.Link><Nav.Link >Link</Nav.Link>
  <Nav.Link >Link</Nav.Link><Nav.Link >Link</Nav.Link>
  <Nav.Link >Link</Nav.Link><Nav.Link >Link</Nav.Link>
  
  <Nav.Link >Link</Nav.Link>
  <Nav.Link >Link</Nav.Link>
  <Nav.Link >Link</Nav.Link>
 
</Nav>
</Navbar>
</Card>
    </Col> */}