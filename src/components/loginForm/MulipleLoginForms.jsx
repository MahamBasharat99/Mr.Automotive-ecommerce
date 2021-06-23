import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

import Dialog from "@material-ui/core/Dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import User from "../../assets/images/user.png";
import Heart from "../../assets/images/heart.png";
import Guitar from "../../assets/images/piano.png";
import "swiper/swiper.scss";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import SignupForm from "./Signup";
import EmailLogin from "./EmailLogin";
import { facebooklogin, googleLogin } from "../../store/action/action";
import { connect } from "react-redux";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function MultipleLoginForms(props) {
  const [loginWiEma, setloginWiEma] = useState(false);
  const [signupForm, setsignupForm] = useState(false);
  const { onClose, open } = props;


  const handleClose = () => {
    onClose();
  };

  const CloseEmaLog = () => {
    setloginWiEma(false);
  };

  const openEmailbox = () => {
    handleClose();
    setloginWiEma(true);
  };

  const goBack = () => {
    CloseEmaLog();
    CloseSignupForm();
    props.againopen();
  };
  const CloseSignupForm = () => {
    setsignupForm(false);
  };

  const openSignupForm = () => {
    setsignupForm(true);
    handleClose();
  };

  const faceBookLogin = () => {
    console.log("pressed fb login");
    // facebooklogin();
    props.fbLogin();
  };

  return (
    <>
      <Dialog className="loginForm" onClose={handleClose} open={open}>
        <CloseIcon onClick={handleClose} className="loginClosebtn" />
        <div className="loginSlider">
          <Swiper slidesPerView={1} navigation pagination={{ clickable: true }}>
            <SwiperSlide>
              <img src={Guitar} alt="OLX" />
              <br />
              <p>Help make MR Automotive safer place to buy</p>
            </SwiperSlide>
            <SwiperSlide>
              <img src={Heart} alt="OLX" />
              <br />
              <p>Contact and close deals faster</p>
            </SwiperSlide>
            <SwiperSlide>
              <img src={User} alt="OLX" />
              <br />
              <p>Save all your favorite items in one place</p>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="loginMethods">
          <ul>
            <li onClick={openEmailbox}>
              <p>continue Width Email</p>
            </li>
            <li onClick={faceBookLogin}>
              <p>continue Width Facebook</p>
            </li>
            <li onClick={() => props.googleLogin()}>
              <p>continue Width Google</p>
            </li>
          </ul>
        </div>
        <div className="loginformBottom">
          <p>
            Not haven't an account? &nbsp;
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={openSignupForm}
            >
              Create Now!
            </Button>
          </p>
          <span>We won't share your personal details with anyone</span>
          <p>
            <span>If you continue, you are accepting </span>
            <a
              href="https://www.termsandcondiitionssample.com/live.php?token=HvfeZckAuE6ufoeevCxoj5WBhJ4x5nBH"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>MR AutoMotive Terms and Conditions and Privacy Policy</span>
            </a>
          </p>
        </div>
      </Dialog>
      <EmailLogin
        showmsg={props.showmsg}
        closemsg={props.closemsg}
        open={loginWiEma}
        onClose={CloseEmaLog}
        goBack={goBack}
      />

      <SignupForm
        showmsg={props.showmsg}
        closemsg={props.closemsg}
        open={signupForm}
        onClose={CloseSignupForm}
        goBack={goBack}
      />
    </>
  );
}
const mapStateToProps = (store) => ({
  allProducts: store.allProducts,
  currentuser: store.currentuser,
});

const mapDispatchToProps = (dispatch) => ({
  fbLogin: () => dispatch(facebooklogin()),
  googleLogin: () => dispatch(googleLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MultipleLoginForms);
