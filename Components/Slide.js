import React, {useState} from 'react';
import {Carousel} from 'react-bootstrap';
function Slide(){
    return(
        <div>
<Carousel fade>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://specials-images.forbesimg.com/imageserve/5fbc4c24998557783b8cb83c/960x0.jpg?fit=scale"
      alt="First slide"
    />
    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://m.economictimes.com/thumb/msid-78604296,width-1200,height-900,resizemode-4,imgsize-198498/stock.jpg"
      alt="Second slide"
    />

   
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.bbva.com/wp-content/uploads/2018/08/A-0908-Trader-BBVA-1024x629.jpg"
      alt="Third slide"
    />

    
  </Carousel.Item>
</Carousel>

        </div>
    )
}

export default Slide;