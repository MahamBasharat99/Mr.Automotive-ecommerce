import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { get_All_Products, check_current_user } from "../store/action/action";
import Product from "../components/Products/Product";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../config/firebase";
import { Link } from "react-router-dom"
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconBreadcrumb from "../components/Breadcrumbs/IconBreadcrumb";
import GoBackBtn from "../components/Others/GoBackBtn";
import Loader from "../components/Others/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh"
  },
  image: {
    width: "100%",
  },
}));




function Shop(props) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState({})
  useEffect(() => {
    let dbRef = firebase.database().ref(`all_Products/`);

    dbRef.on('child_added', (data) => {
      // storeAllcategories.push(data.val())
      setCategoryList(data.val());

    });
  }, [])
  return (
    <div className={classes.root}>

      <div className="container-lg " style={{ margin: "30px auto" }}>
        <div className="row">
          <div className="col-md-6 col-sm-12 col-xs-12 d-flex align-items-center justify-content-start"><GoBackBtn home="/" /> <IconBreadcrumb Shop={"Shop"} AllProd={"All-Products"} /></div>
          <div className="col-md-6 col-sm-12 col-xs-12  p-5 d-flex align-items-center justify-content-end">

            <ButtonGroup variant="contained"color={"secondary"}>



              {Object.keys(categoryList).map((categoryName, ind) => {

                return (
                  <Button component={Link} key={ind}
                    to={{ pathname: `/Shop/${categoryName}` }}
                    params={{ category: `${categoryName}` }} style={{ textDecoration: "none", color: "#fff", backgroundColor: "#ff5e14"}}>{categoryName}</Button>

                )
              })}
            </ButtonGroup>
          </div>

          <div className="col-12">
            <h1 className="headingText">All Products</h1>
          </div>
        </div>
        <div className="row d-flex flex-wrap">

          {Object.entries(props.allProducts).length !== 0 ? (
            Object.entries(props.allProducts).map((v, i) => {
              return (

                Object.entries(v[1]).map((product, index) => {
                  return (
                    <div
                      style={{ margin: "10px auto" }}
                      className="cardsGrid"
                      key={index}
                    >
                      <Product product={product[1]} index={index} />
                    </div>
                  )
                })

              );
            })

          ) : (
            <div className="col-12 d-flex flex-column justify-content-center align-items-center text-center h-100">

              <Loader/> 
              </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => ({
  allProducts: store.allProducts,
  currentuser: store.currentuser,
});

const mapDispatchToProps = (dispatch) => ({
  get_All_Products: () => dispatch(get_All_Products()),
  check_current_user: () => dispatch(check_current_user()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
