import React from 'react';
// import { Carousel } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import bannerImg from "../assets/carousel1.jpg";
import bannerimg1 from "../assets/carousel2.jpg";
import bannerimg2 from "../assets/carousel3.jpg";



export default function Bannerslider() {
  return (
 
 <div
      id="bannerCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="1000"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={ bannerImg} className="d-block w-100" alt="E-commerce Banner 1" />
        </div>
        <div className="carousel-item">
          <img src={bannerimg1} className="d-block w-100" alt="E-commerce Banner 2" />
        </div>
        <div className="carousel-item">
          <img src={bannerimg2} className="d-block w-100" alt="E-commerce Banner 3" />
        </div>
      </div>

      {/* Navigation controls */}
      {/* <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#bannerCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#bannerCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button> */}
    </div>
  
  )
}
