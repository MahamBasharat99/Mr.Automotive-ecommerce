import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../config/firebase";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import SettingsIcon from "@material-ui/icons/Settings";
import "../assets/css/productDetail.css";
import IconBreadcrumb from "../components/Breadcrumbs/IconBreadcrumb";
import ProductTabs from "../components/Products/productTabs";
import GoBackBtn from "../components/Others/GoBackBtn";
import Loader from "../components/Others/Loader";
import  Button  from "@material-ui/core/Button";
import {connect} from "react-redux";
import MultipleLoginForms from "../components/loginForm/MulipleLoginForms";
import {check_current_user} from "../store/action/action"
import placeholderImg from "../assets/images/placeholderImg.jpg"



const ProductDetails = (props) => {
  const [productDetail, setproductDetail] = useState({});
  const [showLoader, setShowLoader] = useState(true);
  const [open,setOpen] = useState(false);
  const [inputQtn, setInputQtn]  = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0)
    getsingleProduct();
    props.check_current_user();
  }, []);

  useEffect(()=>{
    setOpen(false)
  },[props.currentuser]);

  const openLoginForm = () => {
    open ? setOpen(false) : setOpen(true);
};

  let pdKey =  props.match.params.key;
  let cate = props.match.params.category;
  const getsingleProduct = () => {
    let dbRef = firebase.database().ref(`all_Products/categories/${cate}`);
    dbRef
      .child(pdKey)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
      
          setproductDetail(snapshot.val());
          setShowLoader(false)
        } else{
          starLoading();
        }
      });
  }
  const starLoading = () =>{
  
    setTimeout(() => {
      let pdKey =  props.match.params.key;
      let cate = props.match.params.category;
      let dbRef = firebase.database().ref(`all_Products/categories/${cate}`);
      dbRef
        .child(pdKey)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setShowLoader(false);
            setproductDetail(snapshot.val());
            return productDetail
          } else{
            setproductDetail({});
            setShowLoader(false);
            return productDetail
          }
        });
    },2000)
  }

  const handleAddtoCart = () => {
   
    let userUid = props.currentuser.userUid;
    let key = props.match.params.key;
    if(userUid){
   
    let dbRef = firebase.database().ref("users");
    dbRef
      .child(userUid)
      .get()
      .then((user) => {

        if (user.exists()) {
          dbRef.child(userUid).child('cartItems').get().then((cart) => {
              if (cart.exists()) {
                firebase.database().ref(`all_Products/categories/${cate}/${key}`).get().then((prodct)=>{
               
                  if(prodct.exists()){
                    let sa = parseInt(prodct.val().prod.stock);
                    if(sa >= inputQtn){
                      dbRef
                      .child(userUid).child('cartItems').child(key).set({
                        productID: key,
                        cate: cate,
                        qtn: inputQtn,
                      });  props.check_current_user()
                    }else{
                      alert(`Stock Qtn reached you cann only ad ${prodct.val().prod.stock} items in your cart`)
                    }
                  }
                })
               
      
              }else{
                 
                firebase.database().ref(`all_Products/categories/${cate}/${key}`).get().then((prodct)=>{
                  if(prodct.exists()){
                    let sa = parseInt(prodct.val().prod.stock);
                    if(sa >= inputQtn){
                      dbRef
                      .child(userUid).child('cartItems').child(key).set({
                        productID: key,
                        cate: cate,
                        qtn: inputQtn,
                      });  props.check_current_user()
           
              }}})}
            });

        }else{openLoginForm()}
      });

    }else{openLoginForm()}
  };

  return (
    <div className="sectionContainer">
        <MultipleLoginForms
                open={open}
                onClose={openLoginForm}
                againopen={openLoginForm}
            />
  
    {
showLoader ? <Loader/> : <>
{Object.keys(productDetail).length !== 0 ?
  
    <div className="container-md mt-5">
      <div className="row  py-0 px-0 ml-0 mr-0">
      <div className="col-12 py-3 px-0"><GoBackBtn shopCateItm={cate}/></div>
      <div className="col-12 "> <IconBreadcrumb Shop={"Shop"} cate={cate} item={pdKey}/></div>
        <div className="col-12 mt-5 ">
        <section className="mb-5">
        <div className="row py-0 px-0 ml-0 mr-0" style={{minHeight: "60vh"}}>
          <div className="col-md-6 mb-4" >
         
                <div className=" mb-0 detailImg-Wrapper">
                
        
                <Carousel
        autoPlay={true}
        animation="slide"
        swipe={true}
        indicators={true}
        IndicatorIcon={<SettingsIcon style={{ width: "17px" }} />} // Previous Example
        indicatorIconButtonProps={{
          style: {
            color: "#000",
            fontSize: "10px",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: "#444cc3",
          },
        }}

        NextIcon={<ArrowForwardIcon />}
        PrevIcon={<ArrowBackIcon />}

      >
      {productDetail.prod.imgs ?
      productDetail.prod.imgs.map((item, ind) => (
      <>
  <CardMedia key={ind}
      className="detailImageslider"
      image={item}
      component={"img"}
    />
      </>
    ))
    :  <CardMedia
    className="detailImageslider"
    image={placeholderImg}
    component={"img"}
  />
  }
     
     
         
      </Carousel>

             
            
            </div>
          </div>
          <div className="col-md-6">
            <h5>{productDetail.prod.title}</h5>
            <p className="mb-2 text-muted text-uppercase small">{productDetail.prod.category}</p>
           
            <p><span className="mr-1"><strong>RS {productDetail.prod.price}</strong></span></p>
            <p className="pt-1">{productDetail.prod.description}</p>
            <div className="table-responsive">
              <table className="table table-sm table-borderless mb-0">
                <tbody>
                  <tr>
                    <th className="pl-0 w-25" scope="row"><strong>Brand</strong></th>
                    <td>{productDetail.prod.brand}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 w-25" scope="row"><strong>Condition</strong></th>
                    <td>{productDetail.prod.condition}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 w-25" scope="row"><strong>Stock</strong></th>
                    <td>{productDetail.prod.stock}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 w-25" scope="row"><strong>Delivery</strong></th>
                    <td>All over the Pakistan</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <div className="table-responsive mb-2">
              <table className="table table-sm table-borderless">
                <tbody>
                  <tr>
                    <td className="pl-0 pb-0 w-25">Quantity</td>
                   
                  </tr>
                  <tr>
                    <td className="pl-0">
                      <div className="quantity-wrapper">
                        <button  className="btn btn-primary" onClick={()=>setInputQtn(inputQtn < 2 ? 1 : inputQtn-1)}>
                          -
                        </button>
                        <input className="quantity" min={1} name="quantity" defaultValue={1} type="number" value={inputQtn}  readonly/>
                        <button  className="btn btn-primary" onClick={()=>setInputQtn(inputQtn >= 5 ? 5 : inputQtn+1)}>
                          + 
                        </button>
                       
                      </div>
                    </td>
                
                  </tr>
                </tbody>
              </table>
            </div>
           

            {parseInt(productDetail.prod.stock) !== 0 ?
          <button onClick={handleAddtoCart} type="button" className="btn btn-warning mr-1 mb-2">Add to cart</button>
          :
          <button onClick={()=> alert("This Product is not available in our stock")} type="button" className="btn btn-warning mr-1 mb-2">Add to cart</button>

            }

          </div>
        </div>
      </section>
 

        </div>
      </div>
        <ProductTabs details={productDetail.prod}/>
    </div>
    

: <> <div className="notfound-wrapper">
  <h1 className="erText">No Products Found!</h1> 
  <Button color={'primary'} variant={"contained"}>Go Home</Button>

  </div>   </>}
  
   
</>
    }
    </div>
  );

    
};


const mapStateToProps = (store) => ({
  currentuser: store.currentuser,
  allProducts: store.allProducts,

})

const mapDispatchToProps = (dispatch) => ({
  check_current_user: () => dispatch(check_current_user())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (ProductDetails));
