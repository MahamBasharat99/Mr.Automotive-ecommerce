import React from 'react'
import { FaLayerGroup,FaAccusoft, FaFile } from "react-icons/fa";

function About() {


    return (
        <div>
           <section className="text-center about" >
      <h1>About US</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn" >
            <span><FaLayerGroup/></span>

            <h2>Fast</h2>
            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
          </div>
          <br/>
          <div className="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn" >
          <span><FaAccusoft/></span>
            <h2>Secure </h2>
            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum </p>
          </div>
          <br/>
          <div className="clearfix visible-md-block visible-sm-block"></div>
          <div className="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn" >
          <span><FaFile/></span>
            <h2>Policies </h2>
            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
          </div>
          
        </div>
        
      </div>
    </section>  
        </div>
    )
}

export default About
