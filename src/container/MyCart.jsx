import React, { useEffect, useState, forwardRef } from "react";
import firebase from "../config/firebase";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../assets/css/addCart.css";
import Button from "@material-ui/core/Button";
import FormModel from "../components/loginForm/FormModel";
import { FaBox, FaEyeDropper, FaJediOrder, FaMinusCircle, FaPlusCircle, FaRegEye, FaTimes, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import { BiBasket } from "react-icons/bi";
import { Link } from "react-router-dom";
import { get_All_Products, check_current_user, set_user_cart } from "../store/action/action";
import Loader from "../components/Others/Loader";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import EditRounded from "@material-ui/icons/EditRounded";
import PageviewIcon from "@material-ui/icons/Pageview";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";import { IconButton } from "@material-ui/core";import { withStyles, makeStyles } from "@material-ui/core/styles";import { CardMedia } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";import Toolbar from "@material-ui/core/Toolbar";
import placeholderImg from "../assets/images/placeholderImg.jpg"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "lef",
    color: theme.palette.text.secondary,
    minHeight: "180px",
    "&:hover":{
      boxShadow: "5px 5px 15px #00000053",
      transition: ".3s ease-in",

    }
  },
  table: {
    minWidth: 700,
  },
  container: {
    maxHeight: 800,
    width: "100%",
  },
  media: {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
  },
  appBar: {
    position: "relative",
    width: "100%"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));


const MyCart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [qtn, setQtn] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [showMyOrders, setShowMyOrders] = useState(false);
  const [myAlert, setMyAlert] = useState({
    msg: ""
  });


  useEffect(() => {
    setShowLoader(true)
    getCartitems();
    if(showMyOrders){
      props.check_current_user();
    }
  }, [props.currentuser]);

  var user = props.currentuser;
  var dbProdRef = firebase.database().ref("all_Products/categories/");
  var db = firebase.database();

  let price = [];
  let prd = [];
  let cat = [];
  let id = [];

  function getCartitems() {
    prd = [];
    let isAvailable = Object.keys(user).length;
    if (isAvailable !== 0) {
      db.ref(`users/${user.userUid}/cartItems`).once('value').then((data) => {
        if (data) {
          prd = data.val();
          setStateForProducts();
          setShowLoader(false);
        }
      }).catch((error) => {

        setOpen(true); setMyAlert({ msg: error.message })
      })
    } else {
      setTimeout(() => {
        setShowLoader(false);
      }, 3000)

    }
  };
  function setStateForProducts() {
    let prddd = [];
    cat = [];
    id = [];
    let q = []
    setQtn([])
    if (prd) {
      Object.values(prd).map((v, i) => {
        cat.push(v.cate)
        id.push(v.productID);
        q.push(v.qtn);
        setQtn(q);
        
      })
      if (cat.length > 0) {
        cat.map((ct, i) => {
          dbProdRef
            .child(ct).child(id[i])
            .get().then((prod) => {
              if (prod.exists()) {
                prddd.push(prod.val())
                if (i === cat.length - 1) {
                  setCartItems(prddd);
                  props.set_user_cart();
                }
              }
            })
            .catch((error) => {

              setOpen(true); setMyAlert({ msg: error.message })
            });
        })
      }
    }
  };
  const upDateCartQtn = (method, productCate, productid, del) => {

    let isAvailable = Object.keys(user).length;
    if (isAvailable !== 0) {
      let ProdRef = db.ref('users').child(user.userUid).child('cartItems').child(productid);
      if (method) {
        ProdRef.get().then((itm) => {
          if (itm.exists()) {
            let prodFromProd = dbProdRef.child(`${itm.val().cate}/${itm.val().productID}`).child('prod')
            switch (method) {
              case '+':
                prodFromProd.get().then((prodct)=>{
                  if(prodct.exists()){
                    let st = parseInt(prodct.val().stock);
                
                    if(st >= itm.val().qtn + 1){
                      ProdRef.set({
                        productID: itm.val().productID,
                        cate: itm.val().cate,
                        qtn: itm.val().qtn >= 5 ? 5 : itm.val().qtn + 1,
                      });
                      if (itm.val().qtn >= 5) { setOpen(true); setMyAlert({ msg: "Maximum Quantity of single product is 5" }) }
                    }else{
                      setOpen(true); setMyAlert({ msg: "Stock limit is reached" }) 
                    }
                  }
                })
              
                break;
              case "-":
                ProdRef.set({
                  productID: itm.val().productID,
                  cate: itm.val().cate,
                  qtn: itm.val().qtn < 2 ? 1 : itm.val().qtn - 1,
                });
                if (itm.val().qtn < 2) { setOpen(true); setMyAlert({ msg: "Minimum Quantity of single product is 1" }) }
            }
            props.check_current_user()
          } else {
            setOpen(true); setMyAlert({ msg: "NO Records are found of this product in our Database!" })
          }
        });
      }
      if (del) {
        ProdRef.remove().then(() => {
          setOpen(true);
          setMyAlert({ msg: "Removed From Cart Successfully!" })
        })
    }}

  };
  const clearCart = () => {
    setOpen(true);
    setMyAlert({ msg: "Are you Sure you want to Clear your cart ?", delAll: "Yes" });

  };
  const  clearedCart = () => {
    db.ref(`users/${props.currentuser.userUid}`).child("cartItems").remove().then(()=>{
      setOpen(true);
      setMyAlert({ msg: "Your cart has been Cleared Successfully!",});
      props.check_current_user();
    })
  };
  const openAlertBox = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <>
      <div className="container_section">
      {Object.keys(props.currentuser).length !== 0 ? (
        <>
        {showMyOrders ?
          <div className="deletAll">
            <Button color="inherit" onClick={()=>setShowMyOrders(false)} variant="contained">
              Back
            </Button>
            <h3>My Orders</h3>
          </div>
          :
          <div className="deletAll">
            <Button color="secondary"
                  onClick={()=> setShowMyOrders(true)}
                  variant="contained">
                  View Orders
                 &nbsp; <FaBox />
            </Button>
            {
              props.currentuser.cartItems &&
              <Button style={{ backgroundColor: "#ff5e14", color: "#fff" }}
              onClick={clearCart}
              variant="contained">
              Clear Cart
             &nbsp; <FaTrashAlt />
              </Button>
            }
          </div>
        }
        {
        showMyOrders ? 
          props.currentuser.orders ? 
          <>
            <div className="cart_header">
            <h2>Order</h2>
            <h4>Products</h4>
            <h4>Price</h4>
            <h4>Status</h4>
            <h4>Date</h4>
            </div>
            <div className="cart_container">
            {Object.values(props.currentuser.orders).map((item, key) => {
              return (
                <>
                  <div className="cart_details" key={key}>
                    <div className="cart_img">
                      <FullScreenUserDetails orderID={item.orderId} currentuser={props.currentuser}/>
                   
                      {
                        item.productList  ?
                        item.productList[0].imgs ?
                        <img src={item.productList[0].imgs[0]} alt="" /> 
                        :<img src={placeholderImg} alt="" />
                        :  <img src={placeholderImg} alt="" />
                      }            
                      <span className="cart_name">{item.orderId}</span>
                    </div>
                    <div className="cart_price">{item.productList.length}</div>
                    <div className="cart_price">{item.TotalOrderPrice}</div>
                    <div className="cart_qtn">
                      <span className="qtn_box">{item.otherDetails.orderStatus}</span>              
                    </div>
                    <div className="cart_item_total">
                      <span id="total_pr">
                          {
                          item.otherDetails.orderPlacingDate
                          }
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
            </div>
          </>
          : 
          <>
            <div style={{ textAlign: "center", margin: "50px auto" }}>
              <BiBasket style={{ fontSize: "7vh", color: "orange" }} />
              <h1 style={{ color: "orange" }}>No previous Orders found!</h1>
              <Button component={Link} onClick={() => props.history.push('/Shop')} variant="contained" style={{ backgroundColor: "#ff5e14", color: "#fff" }}>Buy Now</Button>
            </div>
          </>
        :
        <>
        {props.currentuser.cartItems ? 
        <>
          <div className="cart_header">
            <h2>Product</h2>
            <h4>Price</h4>
            <h4>Quantity</h4>
            <h4>Sub Total</h4>
          </div>
          <div className="cart_container">
            {Object.values(cartItems).map((item, key) => {
              return (
                <>
                  <div  className="cart_details" key={key}>
                    <div className="cart_img">
                      <FaTimesCircle className="remove" onClick={() => upDateCartQtn(' ', item.prod.category, item.prod.key, 'del')} />{
                        item.prod.imgs ?
                        <img src={item.prod.imgs[0]} alt="" />
                        :  <img src={placeholderImg} alt="" />
                      }
                     
                      <span className="cart_name">{item.prod.title.slice(0, 20)}</span>
                    </div>
                    <div className="cart_price">{item.prod.price}</div>
                    <div className="cart_qtn">
                      <FaMinusCircle
                        className="inc_dec dec_cart"
                        onClick={() => upDateCartQtn("-", item.prod.category, item.prod.key)}
                      />
                      <span className="qtn_box">{qtn[key]}</span>
                      <FaPlusCircle
                        className="inc_dec inc_cart"

                        onClick={() => upDateCartQtn('+', item.prod.category, item.prod.key)}
                      />
                    </div>
                    <div className="cart_item_total">
                      <span id="total_pr">
                        RS: {parseInt(item.prod.price * qtn[key])

                        }
                        <span style={{ display: "none" }}>
                          {
                            price.push(parseInt(item.prod.price * qtn[key]))
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
            <div className="final_ptice">
              <h2>Cart Totals</h2>
              <div className="final_p_box">
                <span>Total Cart Items</span>
                <span id="total_cartitems">Qtn : {
                  qtn.reduce((a, b) => a + b, 0) < 10 ? "0" + qtn.reduce((a, b) => a + b, 0) : qtn.reduce((a, b) => a + b, 0)}
                </span>
                <span>Total Cart Price</span>
                <span id="total_cartPrice">Rs :  &nbsp;
              {
                    price.length > 0 ?
                      price.reduce((a, b) => a + b, 0)


                      : " 00"

                  }
                </span>
                <span>Shipping Fee</span>
                <span id="ship_fees">RS : 50.00</span>
                <span>Final Order Price</span>
                <span id="final_price">RS : &nbsp; {
                  price.length > 0 ?
                    price.reduce((a, b) => a + b, 0) + 50


                    : " 00"

                }</span>
              </div>
              <Button component={Link} to="/Checkout" style={{backgroundColor: "#ff5e14", color: "#fff" }}>Proceed to Checkout</Button>
            </div>
          </div>
        </>
        :
        <div style={{ textAlign: "center", margin: "50px auto" }}>
            <BiBasket style={{ fontSize: "7vh", color: "orange" }} />
            <h1 style={{ color: "orange" }}>No Items in your cart </h1>
            <Button component={Link} onClick={() => props.history.push('/Shop')} variant="contained" style={{ backgroundColor: "#ff5e14", color: "#fff" }}>Shop Now</Button>
          </div>
        }
        </>
        }
        </>
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
      </div>
      {open && <ConfirmDialog msg={myAlert.msg} head={"Alert!"} delAll={myAlert.delAll === "Yes" && "Yes"} open={open} close={openAlertBox} confirmedDelete={clearedCart}/>}
    </>
  );
};

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


          {props.delAll ?
          <>
            <Button
              style={{backgroundColor: "#ff5e14", color: "#fff" }}
              onClick={props.close}
              variant="contained"
            >
              No
              <FaTimes />
            </Button>
            <Button
              color="secondary"
              onClick={()=> props.confirmedDelete()}
              variant="contained"
            >
              {props.delAll}
              <DeleteIcon />
            </Button>
            </>
            :
            <Button
              color="primary"
              onClick={props.close}
              variant="contained"
            >
              ok
           <DoneAllIcon />
            </Button>
          }

        </DialogActions>
      </Dialog>
    </>
  );
};

function FullScreenUserDetails(props) {
  useEffect(() => {
    getOrderDetails(props.orderID);
  },[])
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [orderDet, setOrderDet] = useState({
    TotalOrderPrice: 0,
    orderId: "",
    otherDetails: {orderPlacingDate: "", orderPlacingTime: "", orderStatus: ""},
    productList: [],
    shipFee: 50,
    
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  function getOrderDetails(ordId) {
    if (ordId) {
      firebase.database().ref(`orders/${props.currentuser.userUid}`)
        .child(ordId)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setOrderDet(snapshot.val());
          }
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
    }
  }
  return (
    <>
      <IconButton
      style={{fontSize: "18px", color: "#ff5e14" , margin: "0"}}
        onClick={() => {
          handleClickOpen();
          getOrderDetails(props.orderID);
        }}
        aria-label="View"
      >
        <FaRegEye />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} style={{backgroundColor: "#ff5e14", color: "#fff" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Order Details
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="UserupdateFormAdmin" >
        <ListItem>
              <ListItemText
                primary={"Order ID"}
                secondary={orderDet.orderId}
              />
                <ListItemText
                primary={"Date"}
                secondary={orderDet.otherDetails.orderPlacingDate}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={"Order Price"}
                secondary={orderDet.TotalOrderPrice}
              /> <ListItemText
                primary={"Shipping Fee"}
                secondary={orderDet.shipFee}
              />
            </ListItem>

            <ListItem>
            
              <ListItemText
                primary={"Status"}
                secondary={orderDet.otherDetails.orderStatus}
              />
              <ListItemText
                primary={"Time"}
                secondary={orderDet.otherDetails.orderPlacingTime}
              />
            </ListItem>
            <Divider />
            <Typography component="p" variant="h6">Products</Typography>
            <div className="cart_header" style={{width:"100%"}}>
                <p>Product</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Sub Total</p>       
              </div>
            {orderDet.productList.map((item,key)=>{
              return(
                <div className="cart_details" key={key}>
                <div className="cart_img">
                 {item.imgs ?<img src={item.imgs[0]} alt="" style={{  width: "30%",height: "30%"}}/>
                  :<img src={placeholderImg} alt="" style={{  width: "30%",height: "30%"}}/>
                 }
                  
                  <span className="cart_name">{item.title.slice(0, 8)}</span>
                </div>
                <div className="cart_price">{item.price}</div>
                <div className="cart_qtn">
                  <span className="qtn_box">{item.qtn}</span>
                </div>
                <div className="cart_item_total">
                  <span id="total_pr">
                  {parseInt(item.price * item.qtn)}
                  </span>
                </div>
              </div>
              )
            })}
        </div>
      </Dialog>
    </>
  );
}

const mapStateToProps = (store) => ({
  currentuser: store.currentuser,
});
const mapDispatchToProps = (dispatch) => ({
  get_All_Products: () => dispatch(get_All_Products()),
  check_current_user: () => dispatch(check_current_user()),
  set_user_cart: () => dispatch(set_user_cart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyCart));
