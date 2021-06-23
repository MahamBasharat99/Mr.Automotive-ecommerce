import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Emailsignup } from "../../store/action/action";
import { connect } from "react-redux";

function SignupForm(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };
  const [loginfields, setloginfields] = useState(false);

  const [formDetails, setFormDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const signupNewUser = (e) => {
    e.preventDefault();
    props.signUp(formDetails.email, formDetails.password, formDetails.userName);
  };

  const handleFormFields = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });

    if (
      formDetails.email !== "" &&
      formDetails.password !== "" &&
      formDetails.userName !== ""
    ) {
      setloginfields(true);
    } else {
      setloginfields(false);
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
            setFormDetails({ userName: "", email: "", password: "" });
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
            <h2>SignUp With your Email</h2>
          </div>
          <div className="loginField">
            <form onSubmit={signupNewUser}>
              <div className="loginInput">
                <div className="logintextField" style={{ width: "100%" }}>
                  <input
                    onChange={(e) => handleFormFields(e)}
                    type="text"
                    name="userName"
                    autoComplete="off"
                    placeholder="UserName"
                    value={formDetails.userName}
                  />
                </div>
              </div>
              <br />
              <div className="loginInput">
                <div className="logintextField" style={{ width: "100%" }}>
                  <input
                    onChange={(e) => handleFormFields(e)}
                    type="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Email"
                    value={formDetails.email}
                  />
                </div>
              </div>
              <br />
              <div className="loginInput">
                <div className="logintextField" style={{ width: "100%" }}>
                  <input
                    onChange={(e) => handleFormFields(e)}
                    type="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Password"
                    value={formDetails.password}
                  />
                </div>
              </div>
              <p className="validationmsg">{loginfields.errormsg}</p>
              <div className="loginSubmitBtn">
                {loginfields === true ? (
                  <button onClick={signupNewUser} type="submit">
                    Sign Up
                  </button>
                ) : (
                  <button disabled type="submit" className="disabledbtn">
                    Sign Up
                  </button>
                )}
              </div>
              <p>
                <span>
                  We won't reveal your email to anyone else nor use it to send
                  you spam
                </span>
              </p>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signUp: (email, password, userName) =>
    dispatch(Emailsignup(email, password, userName)),
});

export default connect(null, mapDispatchToProps)(SignupForm);
