import React, { useState, useEffect,forwardRef,useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "../components/checkoutFrom/AddressForm";
import PaymentForm from "../components/checkoutFrom/PaymentForm";
import Review from "../components/checkoutFrom/Review";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get_All_Products, check_current_user, set_user_cart } from "../store/action/action";
import "../assets/css/checkOut.css";
import Loader from "../components/Others/Loader";
import FormModel from "../components/loginForm/FormModel";
import { BiBasket } from "react-icons/bi";
import { FiArrowRightCircle, FiDownloadCloud } from "react-icons/fi";
import firebase from "../config/firebase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import IconButton from "@material-ui/core/IconButton";
import ourLogo from "../assets/images/webRelated/gears1.png";
import html2pdf from "html2pdf.js"
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
      minHeight: "70vh"
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),

  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

}));


function Checkout(props) {

  const [showLoader, setShowLoader] = useState(true);
  const [myalert, setAlert] = useState({
    show:false, msg:"",head:""
  });
  const classes = useStyles();


  
  const [activeStep, setActiveStep] = useState(0);
  
  
  
  const [FormDetails, setFormDetails] = useState({
    userName: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "Pakistan ",
    zip: "",
    NameOnCard: "",
    cardNumber: "",
    ExpiryDate: "",
    CVV: "",
    
  })
  const [orderDetail, setOrderDetail] = useState({})
  useEffect(() => {
    if (Object.keys(props.currentuser).length !== 0) {
        props.set_user_cart();
  
         setFormDetails({
           ...FormDetails,
           userName: props.currentuser.userName,
           phone: props.currentuser.phone,
           address1: props.currentuser.address,
          });
          setShowLoader(false);    
          setActiveStep(0)
    }
    else {
      setShowLoader(true)
      setTimeout(() => {
        setShowLoader(false);
       },3000);
    }

  }, [props.currentuser])

   
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleFormData = (e) => {
    setFormDetails({ ...FormDetails, [e.target.name]: e.target.value })
  }
  var dt = new Date();
  var h = dt.getHours(),
      m = dt.getMinutes();
  var time;
  if (h === 12) {
      time = h + ":" + m + " PM";
  } else {
      time = h > 12 ? h - 12 + ":" + m + " PM" : h + ":" + m + " AM";
  }
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;

  const PlaceOrder = () => {

    let products = [];
    let pr = {};
    let price = [];
    Object.values(props.userCart.prddd).map((product,i) => {
      pr = {...product.prod, qtn: props.userCart.qtn[i]};
      products.push(pr);
      price.push(parseInt(product.prod.price) * props.userCart.qtn[i])
      if(props.userCart.qtn.length === i+1){
        finallyPlaceTheOrder();
      }
    });
      function finallyPlaceTheOrder (){
        
        setOrderDetail({...orderDetail, productList: products, 
          TotalOrderPrice:price.length > 0 ? price.reduce((a, b) => a + b, 0) :" 00",
          shipFee: 50,
          userDetails: FormDetails,
          otherDetails: {
            orderStatus: "Processing...",
            orderPlacingDate: today,
            orderPlacingTime: time,
            
          },
          userID: props.currentuser.userUid
        });
      
        let key = firebase.database().ref(`users/${props.currentuser.userUid}/orders`).push().key;
        firebase.database().ref('orders').child(props.currentuser.userUid).child(key).set(
          {
          ...orderDetail, productList: products, 
            TotalOrderPrice:price.length > 0 ? price.reduce((a, b) => a + b, 0) :" 00",
            shipFee: 50,
            userDetails: FormDetails,
            otherDetails: {
              orderStatus: "Processing...",
              orderPlacingDate: today,
              orderPlacingTime: time,
            },
            orderId: key,
            userID: props.currentuser.userUid
        }).then(()=>{
          setAlert({show:true, msg: "Your order has been placed Successfully!", head:"Hurry!"});
         
      
          firebase.database().ref(`users/${props.currentuser.userUid}/orders`).child(key).set(
            {
              ...orderDetail, productList: products, 
                TotalOrderPrice:price.length > 0 ? price.reduce((a, b) => a + b, 0) :" 00",
                shipFee: 50,
                userDetails: FormDetails,
                otherDetails: {
                  orderStatus: "Processing...",
                  orderPlacingDate: today,
                  orderPlacingTime: time,
                },
                orderId: key,
                userID: props.currentuser.userUid
            }

          ); 
            products.forEach(prdss => {
              console.log(prdss)
              if(prdss){
                firebase.database().ref(`all_Products/categories/${prdss.category}/${prdss.key}`).child('prod').get().then((geted)=>{
                  if(geted.exists()){
                    firebase.database().ref(`all_Products/categories/${prdss.category}/${prdss.key}`).child('prod').update({
                      stock: parseInt(geted.val().stock) - parseInt(prdss.qtn)  <= 0 ? 0  : parseInt(geted.val().stock) - parseInt(prdss.qtn) 
                    })
                  }
                })
              }
             
              
            });
        }).catch((error=>{
          alert(error.message)
        }));
      }
  }

  const steps = ["Shipping address", "Payment details", "Review your order"];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm fillForm={handleFormData} formData={FormDetails} />;
      case 1:
        return <PaymentForm fillForm={handleFormData} formData={FormDetails} />;
      case 2:
        return <Review cartData={props.userCart} formData={FormDetails}/>;
      default:
        throw new Error("Unknown step");
    }
  }

  let price = [];
  let qtn = [];
  const printDocument = () => {
    let invoice1=document.getElementById('ss');
    var opt = {
        margin: 1,
        filename: 'reciept.pdf',
        image: {
            type: 'jpg',
            quality: 0.99
        },
        html2canvas: {
            scale: 2,
        },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait'
        }
    };

    // Enable all 'modes', with no explicit elements.
    html2pdf().set({
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    });
    

    html2pdf().from(invoice1).set(opt).save();
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        {Object.keys(props.currentuser).length !== 0 ? (
          props.currentuser.cartItems ?
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Checkout
          </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label,i) => (
                  <Step key={i} >
                    <StepLabel 
                    >{label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <>
                    <div className="container_section">
                    
                      
                        <Button
                             variant="contained"
                             style={{color: "#fff", backgroundColor: "#ff5e14"}}
                             onClick={()=> {props.history.push('/Shop');
                             props.check_current_user();}
                            }
                             className={classes.button}
                           >
                            Continue Shopping
                           </Button>

                           <Button
                             variant="contained"
                             color="secondary"
                             onClick={printDocument}
                             className={classes.button}
                           >
                            Download Invoice &nbsp;
                            <FiDownloadCloud style={{fontSize: "20px"}}/>
                           </Button>
                    
                      <div className="cont">
                      
                        <div className="invoice_sec" id="ss">
                          {/* Reciept Top section */}
                          <div className="inv_top_sec">
                            <div className="inv_logo">
                              <img src={ourLogo} alt="MrAuto" />
                              <p style={{ color: '#fff', fontSize: '12px' }}>www.mrAuto.com</p>
                            </div>
                            <div className="inv_data">
                              <h3 id="invoice_number">#{props.currentuser.userUid}</h3>
                              <div id="p_date">{today}</div>
                            </div>
                          </div>
                          <h3 className="cl_i">Shipping Details</h3>
                          {/* Reciept Bottom section */}
                          <div className="inv_bottom_sec">
                            <div className="inv_clint_Info">
                              <p>Name: <span id="c_name">{FormDetails.userName}</span></p>
                              
                              <p>Address: <span id="c_address"> {FormDetails.address1}</span></p>
                              <p>Country: <span id="c_country"> Pakistan</span></p>
                            </div>
                            <div className="inv_payment_sec">
                              <p>Payment Method: <span id="pm_m"> Card</span></p>
                              <p>Phone: <span id="c_phone"> {FormDetails.phone}</span></p>
                              <p>Postal/Zip Code: <span id="c_zip">{FormDetails.zip}</span></p>
                            </div>
                          </div>
                          {/* Products List */}
                          <h3 className="cl_i">Order Details</h3>
                          <div className="inv_head cart_header">
                            <h2>Product</h2>
                            <h4>Price</h4>
                            <h4>Quantity</h4>
                            <h4>Sub Total</h4>
                          </div>
                          <div className="cart_container" style={{width: "97% !important"}}>
                          {orderDetail.productList && Object.values(orderDetail.productList).length !== 0 &&
                          Object.values(orderDetail.productList).map((item, key) => {
                            return (
                              <>
                                <div className="cart_details" key={key}>
                                  <div className="cart_img">
                                    {/* <img src={item.imgs[0]} alt="" /> */}
                                    <span className="cart_name">{item.title.slice(0, 12)}</span>
                                  </div>
                                  <div className="cart_price">{item.price}</div>
                                  <div className="cart_qtn">
                                    <span className="qtn_box">{item.qtn}</span>
                                  </div>
                                  <div className="cart_item_total">
                                    <span id="total_pr">
                                      RS: {parseInt(item.price) * item.qtn}
                                      <span style={{ display: "none" }}>
                                        {
                                          price.push(parseInt(item.price * item.qtn)),
                                          qtn.push(item.qtn)
                                        }
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                            })}
                          </div>
                          <div className="total_cartPrice">
                            <div className="final_ptice inv_final_p">
                              <h2>Products Totals</h2>
                              <div className="final_p_box">
                                <span>Total Cart Items</span><span id="total_cartitems">
                                {
                      qtn.reduce((a, b) => a + b, 0) < 10 ? "0" + qtn.reduce((a, b) => a + b, 0) : qtn.reduce((a, b) => a + b, 0)}
                                </span>
                                <span>Total products Price</span><span id="total_cartPrice">
                                  Rs &nbsp;
                                  {
                                      price.length > 0 ?
                                        price.reduce((a, b) => a + b, 0)
                                        : " 00"
                                }</span>
                                <span>Shipping Fee</span><span id="ship_fees">RS 50.00</span>
                                <span style={{ backgroundColor: '#000', color: '#fff' }}>Final Order Price</span><span style={{ backgroundColor: '#000', color: '#fff' }} id="final_price">RS : &nbsp; {
                                  price.length > 0 ?
                                  price.reduce((a, b) => a + b, 0) + 50
                                  : " 00"
                                  }</span>
                              </div>
                            </div>
                          </div>
                          <br />
                          <p className="wt_m">If you have any questions about this, Please Contact.</p>
                          <p className="wt_m"><Link to="/Contact">mrAuto.Help& Support</Link></p> <br />
                          <p className="wt_m">Thankyou! For Shopping</p>
                          <br /><br />
                          {/* Reciept Footer */}
                          <div style={{ justifyContent: 'flex-start', borderBottomRightRadius: '7px', borderBottomLeftRadius: '7px' }} className="inv_head cart_header">
                            <p className="wt_m" style={{ color: '#fff', fontWeight: 300 }}><a href="https://mrautomotive-dd1f6.web.app/">https://mrautomotive-dd1f6.web.app/</a></p>
                          </div>
                        </div>
                      </div>
                      </div>
                  </>
                ) : (
                    Object.keys(props.currentuser).length !== 0 ? 
                      <React.Fragment>
                      {getStepContent(activeStep)}
                         <div className={classes.buttons}>
                           {activeStep !== 0 && (
                             <Button onClick={handleBack} className={classes.button}>
                               Back
                               {  console.log(activeStep === steps.length - 1 ,"ff")}
                             </Button>
                           )}
                           {activeStep === steps.length - 1 ?
                           
                             <Button
                             variant="contained"
                             style={{color: "#fff", backgroundColor: "#ff5e14"}}
                             onClick={()=> {console.log(activeStep === steps.length - 1 ,"ff"); handleNext(); PlaceOrder()}}
                             className={classes.button}
                           >
                             {  console.log(activeStep === steps.length - 1 ,"ff")}
                            Place order
                           </Button>:
                             <Button
                             variant="contained"
                             style={{color: "#fff", backgroundColor: "#ff5e14"}}
                             onClick={handleNext}
                             className={classes.button}
                           >     {  console.log(activeStep === steps.length - 1 ,"ff")}
                             Next
                           </Button>
                          
                          }
                         
                         </div>
                         </React.Fragment>
                            : null
                )}
              </React.Fragment>
            </Paper>
            :
            <div style={{ textAlign: "center", margin: "50px auto" }}>
              <BiBasket style={{ fontSize: "7vh", color: "orange" }} />
              <h1 style={{ color: "orange" }}>No Items in your cart For Checkout Please add some products to your cart first </h1>
              <Button component={Link} onClick={() => props.history.push('/Shop')} variant="contained" style={{ backgroundColor: "#ff5e14", color: "#fff" }}>Shop Now</Button>
            </div>

        ) : (
          <>
            <div className="container">
              <div className="row">
                {showLoader ?
                  <Loader />
                  :
                  <div className="col-12 d-flex flex-column justify-content-center align-items-center text-center" style={{ height: "60vh" }}>
                    <FormModel name="Login" />
                    <br />
                    <Button onClick={() => props.history.goBack()}>Go Back</Button>
                  </div>
                }
              </div>
            </div>

          </>
        )}
      </main>
      {myalert.show && <ConfirmDialog msg={myalert.msg} head={myalert.head} open={myalert.show} close={()=> {setAlert({show: false, msg: ""})}}/>}
    </React.Fragment>
  );
}


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = (props) => {


  return (
    <>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.close}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.head}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          {props.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton
            color= {props.head === "Thanks" ? "primary": "secondary"}
            onClick={props.close}
          >
            <DoneAllIcon  />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};


const mapStateToProps = (store) => ({
  currentuser: store.currentuser,
  userCart: store.userCart,
});
const mapDispatchToProps = (dispatch) => ({
  get_All_Products: () => dispatch(get_All_Products()),
  check_current_user: () => dispatch(check_current_user()),
  set_user_cart: () => dispatch(set_user_cart()),

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));
