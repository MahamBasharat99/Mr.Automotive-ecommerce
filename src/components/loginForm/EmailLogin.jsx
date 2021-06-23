import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import firebase from "../../config/firebase";
import { check_current_user } from "../../store/action/action";
import { connect } from "react-redux";
function EmailLogin(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const [loginDetails, setloginDetails] = useState([]);

  const [loginfields, setloginfields] = useState(false);

  function login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(loginDetails.email, loginDetails.password)
      .then(function (result) {
        // console.log(result);
        let dbUser = firebase.database().ref("users");
        dbUser
          .child(result.user.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              setloginDetails([]);
              setloginfields([]);
              handleClose();
              if(props.showmsg){
                props.showmsg();
              }
            
              hidemsg();
              props.check_current_user();
            } else {
              result.user
                .delete()
                .then(function () {
                  // User deleted.
                  setloginDetails([]);
                  setloginfields([]);
                  handleClose();

                  props.check_current_user();
                  alert("your Account is Deleted");
                })
                .catch(function (error) {
                  // An error happened.
                  alert(error.message);
                });
            }
          })
          .catch((error) => {
            console.error(error);
            alert(error.message);
          });
      })
      .catch(function (error) {
        props.closemsg();
        setloginfields({ errormsg: error.message });
      });

    function hidemsg() {
      setTimeout(function () {
        if(props.closemsg){
          props.closemsg();
        }
     
      }, 2500);
    }
  }

  function setvalue(e) {
    setloginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    if (
      loginDetails.email !== undefined &&
      loginDetails.password !== undefined &&
      loginDetails.password !== ""
    ) {
      setloginfields(true);
    } else {
      setloginfields(false);
    }
  }
  const forgotPassword = () => {
    var auth = firebase.auth();
    var emailAddress = prompt("Enter your Email address");

    if (emailAddress) {
      auth
        .sendPasswordResetEmail(emailAddress)
        .then(function () {
          // Email sent.
          alert("reset Email has been sended to your provided Email");
        })
        .catch(function (error) {
          // An error happened.
          console.log(error);
        });
    } else {
      alert("something Went Wrong! ");
    }
  };
  return (
    <>
      <Dialog
        style={{ zIndex: "999999 !important" }}
        className="loginForm"
        onClose={handleClose}
        open={open}
      >
        <ArrowBackIcon
          onClick={() => {
            props.goBack();
          }}
          className="loginBackbtn"
        />
        <CloseIcon onClick={handleClose} className="loginClosebtn" />
        <div className="loginPhonem">
          <div className="loginMethodLogo">
            {/* <svg width="60px" height="60px" viewBox="0 0 1024 1024">
              <path
                fill="#002f34"
                d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"
              ></path>
            </svg> */}

            <h4>Welcome to Mr.Automotive</h4>
            <h2>Enter your Email</h2>
          </div>
          <div className="loginField">
            <div className="loginInput">
              <div className="logintextField" style={{ width: "100%" }}>
                <input
                  onChange={(e) => setvalue(e)}
                  type="email"
                  name="email"
                  autoComplete="off"
                  placeholder="Email"
                />
              </div>
            </div>
            <br />
            <div className="loginInput">
              <div className="logintextField" style={{ width: "100%" }}>
                <input
                  onChange={(e) => setvalue(e)}
                  type="password"
                  name="password"
                  autoComplete="off"
                  placeholder="password"
                />
              </div>
            </div>
            <p className="validationmsg">{loginfields.errormsg}</p>
            <div className="loginSubmitBtn">
              {loginfields === true ? (
                <button onClick={login}>Login</button>
              ) : (
                <button className="disabledbtn">Login</button>
              )}
            </div>
            <p>
              <button onClick={forgotPassword}>Forgot Password ?</button>
              <span>
                We won't reveal your email to anyone else nor use it to send you
                spam
              </span>
            </p>
          </div>
        </div>
      </Dialog>
    </>
  );
}

const mapStateToProps = (store) => ({
  currentuser: store.currentuser,
});
const mapDispatchToProps = (dispatch) => ({
  // get_All_Products: () => dispatch(get_All_Products()),
  check_current_user: () => dispatch(check_current_user()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailLogin);
