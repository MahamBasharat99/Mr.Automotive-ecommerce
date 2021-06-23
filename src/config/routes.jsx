import React, { useEffect } from "react";
import Home from "../container/Home";
import Shop from "../container/Shop";
import Contact from "../container/Contact";
import AdminDashboard from "../container/AdminDashboard";
import Notfound404 from "../container/Notfound404";
import MyCart from "../container/MyCart";
import Checkout from "../container/Checkout";
import About from "../container/About";
import Category from "../container/category";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ProductDetails from "../container/ProductDetails";
import { connect } from "react-redux";
import { get_All_Products, check_current_user,get_All_Orders } from "../store/action/action";
import  PopUpChatBox from "../components/Others/popUpChatBox";
import  GoToTOp from "../components/Others/GoToTOp";

const AppRouter = (props) => {
  useEffect(() => {
    props.get_All_Products();
    props.check_current_user();
    props.get_All_Orders();
  }, []);
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Home" exact component={Home} />
        <Route path="/Shop" exact component={Shop} />
        <Route path="/Contact" exact component={Contact} />
        <Route path="/AdminDashboard" exact component={AdminDashboard} />
        <Route path="/shop/:category" exact  component={ Category} />
        <Route path="/shop/:category/:key"  exact component={ ProductDetails} />
        <Route path="/MyCart" exact component={MyCart} />
        <Route path="/Checkout" exact component={Checkout} />
        <Route path="/About" exact component={About} />
        <Route path="/404" component={Notfound404} />
        <Redirect from="*" to="/404" />
      </Switch>
     <PopUpChatBox/>
     <GoToTOp/>
      <Footer />
    </>
  );
};

const mapStateToProps = (store) => ({
  allProducts: store.allProducts,
  currentuser: store.currentuser,
});

const mapDispatchToProps = (dispatch) => ({
  get_All_Products: () => dispatch(get_All_Products()),
  check_current_user: () => dispatch(check_current_user()),
  get_All_Orders: () => dispatch(get_All_Orders()),
});

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter));
