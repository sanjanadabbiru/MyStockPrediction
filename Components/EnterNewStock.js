import React, { useRef, useState,useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../Contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { csv } from 'd3'
import raw from './myFile.csv'

function EnterNewStock() {
    const[date,setDate] = useState("");
    const[username,setUsername] = useState("");
    const[tickerSymbol,setTickerSymbol] = useState("");
    const[noOfShares,setNoOfShares] = useState("");
    const[costPerShare,setCostPerShare] = useState("");
    const [text,setText] = useState("");
    const onSubmit = (e) =>{
        e.preventDefault();
    }
  
 function createCsv(status){
    
    const dataValues = [status,date,username,tickerSymbol,noOfShares,costPerShare];
    
    const datatext='';
    fetch(raw)
  .then(r => r.text())
  .then(text => {
    datatext=text;
  });
    const element=document.createElement("a");
         const file=new Blob([dataValues],{
            type:"text/plain;charset-utf-8",
         });
         element.href=URL.createObjectURL(file);
         element.download="myFile.csv";
         document.body.appendChild(element);
         element.click();
 }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Enter your new stock</h2>
          <Form>
            <Form.Group id="Date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="text" required value = {date} onChange = {(e)=>{setDate(e.target.value)}}/>
            </Form.Group>
            <Form.Group id="Username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" required value = {username} onChange = {(e)=>{setUsername(e.target.value)}}/>
            </Form.Group>
            <Form.Group id="TickerSymbol">
              <Form.Label>Ticker Symbol</Form.Label>
              <Form.Control type="text" required value = {tickerSymbol} onChange = {(e)=>{setTickerSymbol(e.target.value)}}/>
            </Form.Group>
            <Form.Group id="NOofShares">
              <Form.Label>No. of Shares</Form.Label>
              <Form.Control type="number" required value = {noOfShares} onChange = {(e)=>{setNoOfShares(e.target.value)}}/>
            </Form.Group>
            <Form.Group id="CostPerShare">
              <Form.Label>Cost per share</Form.Label>
              <Form.Control type="number" required value = {costPerShare} onChange = {(e)=>{setCostPerShare(e.target.value)}}/>
            </Form.Group>
            
            <button type="submit" onClick={() => createCsv("buy")} >Buy</button>
            <button type="submit" onClick={() => createCsv("sell")} >Sell</button>
          </Form>
        </Card.Body>
      </Card>
      
    </>
  )
}

export default EnterNewStock;