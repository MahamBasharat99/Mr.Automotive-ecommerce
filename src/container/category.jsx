import React, { useState, useEffect } from 'react';
import firebase from "../config/firebase";
import Product from "../components/Products/Product";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconBreadcrumb from "../components/Breadcrumbs/IconBreadcrumb";
import { Link,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GoBackBtn from "../components/Others/GoBackBtn";
import Loader from "../components/Others/Loader";
import oopsNotFound from "../assets/images/webRelated/oopsNotFound.png";
function Category(props) {
  console.log(props)
  const [categoryDetail, setCategory] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  let cate = props.match.params.category;


  useEffect(() => {
    window.scrollTo(0, 0)
    getSingleCategory();
  },[props.match.params.category] );

  const getSingleCategory = () => {
    
    let dbCategoryRef = firebase.database().ref(`all_Products/categories/${cate}`);
    let storeAllitems = [];
    
    dbCategoryRef.on('child_added', (data) => {
      storeAllitems.push(data.val())
      setCategory(storeAllitems);
      setShowLoader(false);
    });
    endLoading();
    return categoryDetail
  }

  const endLoading = () => {
    setShowLoader(true);
      setTimeout(() => {;
        if (categoryDetail.length === 0) {
          setShowLoader(false);
        }
      }, 5000)
    
  }

  return (
    <div className="sectionContainer">
     
      {
        categoryDetail.length > 0 ?
          <>
            <div className="container-lg " style={{ margin: "50px auto" }}>
          
              <div className="row">
                <div className="col-sm-12 col-xs-12   d-flex align-items-center justify-content-start"><GoBackBtn shop={"/Shop"}/>
                 <IconBreadcrumb Shop={"Shop"} cate={cate}  /></div>
                <div className="col-md-6 col-sm-12 col-xs-12  p-5 d-flex align-items-center justify-content-end">
                 
                    <ButtonGroup variant="contained" color="" >

                    {Object.entries(props.allProducts).length !== 0 ? Object.keys(props.allProducts).map((categoryName,ind)=>{return (
                          <Button component={Link} key={ind}
                            to={{ pathname: `/Shop/${categoryName}` }}
                            params={{ category: `${categoryName}` }} style={{ textDecoration: "none", color: "#fff" }} style={{backgroundColor: "#ff5e14", color: "#fff" }} >{categoryName}</Button>

                        )}) :<h1>Loading...</h1>}
                    </ButtonGroup>
                </div>

                <div className="col-12">
                  <h1 className="headingText">{props.match.params.category}</h1>
                </div>

                {categoryDetail.map((product, index) => {
                  return (
                    <div style={{ margin: "10px auto" }}
                    className="cardsGrid"
                      key={index}>
                      <Product product={product} index={index} />
                    </div>
                  )

                })}

              </div>
            </div>

          </>
          :
                <>
          {categoryDetail.length === 0 ?
          
          <>
           {showLoader ?  <Loader /> : 
           
           <>
<div className="notfound-wrapper">  <h1 className="erText">No Category Found!</h1> <Button color="primary" variant={"contained"}>Go Home</Button></div>
           </>
       
          
           }
           
           </>
           
           :  <><div className="notfound-wrapper">  <h1 className="erText">No Category Found!</h1> <Button color="primary" variant={"contained"}>Go Home</Button></div></>}
          </>
          
      }
    </div>
  )
}


const mapStateToProps = (store) => ({
  allProducts: store.allProducts,
  currentuser: store.currentuser,
});

// const mapDispatchToProps = (dispatch) => ({
//   get_All_Products: () => dispatch(get_All_Products()),
//   check_current_user: () => dispatch(check_current_user()),
// });

export default connect(mapStateToProps, null)(withRouter(Category));

