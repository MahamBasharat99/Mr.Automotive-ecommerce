import React from "react";
import "../../assets/css/footer.css";
import { FaEnvelope, FaFacebook, FaGooglePlusG, FaMapMarkedAlt, FaPhone, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import ourLogo from "../../assets/images/webRelated/gears1.png";
import firebase from "../../config/firebase";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {withRouter} from "react-router-dom";

const Footer = (props) => {


  const initialValues = {
    email: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email!').required('Required!')
  })

  const SubscribeEmail = (values) => {
   
    if (values.email) {
      let key = firebase.database().ref('emailSubscribers').push().key;
      firebase.database().ref('emailSubscribers').child(key).set(values.email).then(() => {
        values.email = "";
        formik.handleReset()
        alert("Thankyou ! \n You have Successfully subscribed our email news letter")
      })
    } else {
      alert("Please Enter your Email")
    }

  }
  const formik = useFormik({
    initialValues,
    onSubmit: SubscribeEmail,
    validationSchema,
    onReset: ""
  })
  return (
    props.location.pathname &&
      props.history.location.pathname !== "/AdminDashboard" ? (
        <>
    <footer className="footer-section">
      <div className="container">
        <div className="footer-cta pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i ><FaMapMarkedAlt /></i>
                <div className="cta-text">
                  <h4>Find us</h4>
                  <span>Faislabad, Pakistan</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i><FaPhone /> </i>

                <div className="cta-text">
                  <h4>Call us</h4>
                  <span>+92 3332339872</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i><FaEnvelope /></i>
                <div className="cta-text">
                  <h4>Mail us</h4>
                  <span>mrAuto@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-content pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <a href="index.html"><img src={ourLogo} className="img-fluid" alt="logo" /></a>
                </div>
                <div className="footer-text">
                  <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                      elit,Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="footer-social-icon">
                  <span>Follow us</span>
                  <a href="#"><i className="facebook-bg"><FaFacebook /></i></a>
                  <a href="#"><i className="twitter-bg"><FaTwitter /></i></a>
                  <a href="#"><i className="google-bg"><FaGooglePlusG /></i></a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Useful Links</h3>
                </div>
                <ul>
                  <li><Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
                  <li><Link to="/About" onClick={() => window.scrollTo(0, 0)}>About us</Link></li>
                  <li><Link to="/Shop" onClick={() => window.scrollTo(0, 0)}>Shop</Link></li>
                  <li><Link to="/Contact" onClick={() => window.scrollTo(0, 0)}>Contact</Link></li>
                  <li>Categories</li>
                  <li><Link to="/"></Link></li>
                  <li><Link to="/Shop/Bearing" onClick={() => window.scrollTo(0, 0)}>Bearing</Link></li>
                  <li><Link to="/Shop/OtherItems" onClick={() => window.scrollTo(0, 0)}>OtherItems</Link></li>
                  <li><Link to="/Shop/Seal" onClick={() => window.scrollTo(0, 0)}>Seal</Link></li>
                  <li><Link to="/Shop/Tubes" onClick={() => window.scrollTo(0, 0)}>Tubes</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Subscribe</h3>
                </div>
                <div className="footer-text mb-25">
                  <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                </div>
                <div className="subscribe-form">
                  <form action="" onSubmit={formik.handleSubmit}>
                    <div class="input-group">
                      <input type="email" name="email" id="email" id="validationServerUsername" placeholder="Email Address" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className={formik.touched.email && formik.errors.email && "is-invalid" } required/>
                      {formik.touched.email && formik.errors.email ? <div class="invalid-feedback">
                      {formik.errors.email}
                    </div> : null}
                    </div>
                    
                    <button type="submit"><i><FaTelegramPlane /></i></button>


                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
              <div className="copyright-text">
                <p>Copyright © 2018, All Right Reserved <a href="https://mrautomotive-dd1f6.web.app/">mrAuto</a></p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
              <div className="footer-menu">
                <ul>
                  <li><Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
                  <li><Link to="/Shop" onClick={() => window.scrollTo(0, 0)}>Shop</Link></li>
                  <li><Link to="/Contact" onClick={() => window.scrollTo(0, 0)}>Contact</Link></li>
                  <li><Link to="/About" onClick={() => window.scrollTo(0, 0)}>About</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
        </>
    ) :null

  )
}

export default withRouter(Footer);