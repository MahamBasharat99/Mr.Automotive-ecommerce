import React from "react";
import { connect } from "react-redux";
import { get_All_Products, check_current_user } from "../store/action/action";
import { makeStyles } from "@material-ui/core/styles";
import Product from "../components/Products/Product";
import HeroSlider from "../components/HeroSlider/HEroSlider";
import br1 from "../assets/images/brands/brand1.png"
import br2 from "../assets/images/brands/brand2.png"
import br3 from "../assets/images/brands/brand3.png"
import br4 from "../assets/images/brands/brand4.png"
import Loader from "../components/Others/Loader";
// import Range from "../components/Others/range";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh"
  },
  image: {
    width: "100%",
  },
}));
function Home(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <HeroSlider />
      </div>
      {/* <Range/> */}
    
      <div className="container-lg " style={{ margin: "10px auto" }}>
       <div className="row" style={{margin: "0"}}>
         <div className="col-12">
         <h1 className="headingText">All Products</h1>
         </div>
    
    
      </div>
        <div className="row">

       
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
      <section>
        <div className="client-section">
            <div data-aos="zoom-in" data-aos-duration="1000" className="client-img-box"><img src={br1} alt=""/></div>
            <div data-aos="zoom-out" data-aos-duration="1200" className="client-img-box"><img src={br2} alt=""/></div>
            <div data-aos="zoom-in" data-aos-duration="1400" className="client-img-box"><img src={br3} alt=""/></div>
            <div data-aos="zoom-out" data-aos-duration="1600" className="client-img-box"><img src={br4} alt=""/></div>
        </div>
    </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
