import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/header.css";
import FormModel from "../../components/loginForm/FormModel";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { connect } from "react-redux";
import firebase from "../../config/firebase";
import defaultuserimg from "../../assets/images/no-image.jpg";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingBasket from "@material-ui/icons/ShoppingBasketOutlined";
import MoreIcon from "@material-ui/icons/MoreVert";
import {ArrowBackRounded, GroupWork } from "@material-ui/icons";
import PermPhoneMsgIcon from "@material-ui/icons/PermPhoneMsg";
import OurLogo from "../../assets/images/webRelated/gears1.png";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Store } from "@material-ui/icons";
import {FaExchangeAlt} from "react-icons/fa"
import DropDownCate from "../Others/dropDowncate"
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  inputRoot: {
    color: "inherit",
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },deskMenu:{
    color: "#ff5e14 !important",
    width: "60px",
    height: "60px",
    borderRadius: "50%",

  },
    menuItem:{
      padding: "15px",
      "& $p":{
        paddingLeft:"10px",
      },
      "&:hover":{textDecoration: "none",color:"#ff5e14"}
    },
  sectionMobile: {
    display: "flex",
    background:"#fff",
    color: "#ff5e14", 
    cursor: "pointer",
    textAlign:"center",
    "& $button":{
      padding: "8px !important"
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    anchorBtnc: {
      textDecoration: "none",
      color: "#fff !important",
      "&:hover": {
        textDecoration: "none",
       color: "secondary !important"
      },
    },
    closeIcon: {
      position: "absolute !important",
      right: 0,
      top: 0,
    },

  



  },
}));

const Header = (props) => {
  var user = firebase.auth().currentUser;

  const [successMsg, setsuccessMsg] = useState(false);
  const [open, setOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  let cartQtn = []
  useEffect(()=>{
    setOpen(false);
    handleMenuClose();
  },[props.currentuser])
  const handleClickOpen = () => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const showLoginSucces = () => {
    setsuccessMsg(true);
  };

  const closeLoginSucces = () => {
    setsuccessMsg(false);
  };

  const signOut = () => {
    handleClickOpen();

    console.log("log out");
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("successfully signout");
        setUserProfile(false);
        handleMenuClose();
        // setAdmin(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(0);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";


  const renderMenu = (
    <Menu
    className={classes.mobilMenu}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
     
    >

      <UserprofileDropDown  logout={signOut} close={handleMenuClose} />
    </Menu>
  );



  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <HighlightOffIcon
        style={{
          position: "absolute",
          right: "5px",
          top: "5px",
          outline: "none",
          cursor: "pointer",
          background:"primary"
        }}
        onClick={() => handleMobileMenuClose()}
      />
      {user ? (
        props.currentuser.admin ? (

          <MenuItem className={classes.menuItem}
            style={{ marginTop: "23px" }}
            component={Link}
            to="/AdminDashboard"
            onClick={handleMobileMenuClose}
          >
           
              <DashboardIcon />
          
            <p>Dashboard</p>
          </MenuItem>

        ) : null
      ) : null}

      <MenuItem  className={classes.menuItem}
        style={{
          marginTop: user ? (props.currentuser.admin ? null : "23px") : "23px",
        }}
        component={Link}
        to="/Home"
        onClick={handleMobileMenuClose}
      >
     
          <HomeIcon />
      
        <p>Home</p>
      </MenuItem>

       <DropDownCate Mobile="mobile"  className={classes.menuItem} handleMobileMenuClose={handleMobileMenuClose}/>

      <MenuItem className={classes.menuItem} component={Link} to="/About" onClick={handleMobileMenuClose}>
      
          <GroupWork />
   
        <p>About</p>
      </MenuItem>

      <MenuItem className={classes.menuItem} component={Link} to="/Contact" onClick={handleMobileMenuClose}>
    
          <PermPhoneMsgIcon />
     
        <p>Contact</p>
      </MenuItem>

      {user ? (

        <div>

          <MenuItem className={classes.menuItem}  
            component={Link}
            to="/MyCart"
            onClick={handleMobileMenuClose}
          >
             {props.currentuser.cartItems &&
                        Object.keys(props.currentuser.cartItems).length > 0 &&
                         Object.values(props.currentuser.cartItems).map((v,i)=>{
                          cartQtn.push(v.qtn)
                        
                        })}
              <Badge  badgeContent={cartQtn.reduce((a, b) => a + b, 0)} color="secondary">
                <ShoppingBasket />
              </Badge>
            <p>Cart</p>
          </MenuItem>
          <MenuItem className={classes.menuItem}  onClick={handleProfileMenuOpen}>
              <AccountCircle />
            <p>My Account</p>
          </MenuItem>
        </div>
      ) : (
        <FormModel
          name="Login"
          cs="header-show-login-btn"
          showmsg={showLoginSucces}
          closemsg={closeLoginSucces}
        />
      )}
    </Menu>
  );

  return (
    <>
      {props.location.pathname &&
        props.history.location.pathname !== "/AdminDashboard" ? (
        <>

          <div className={classes.grow}>
            <AppBar position="static" style={
              {backgroundColor:'#fff' }}>

          
              <Toolbar>
                <Link to="/">
                <img src={OurLogo} alt="" className="webLogo" />
                </Link>
                 
            
             

                <div className={classes.grow} />
                <div className={classes.sectionDesktop}  style={{position: "relative"}}>
                  {user ? (
                    props.currentuser.admin ? (
                      <>
                      
                          <IconButton   to="/AdminDashboard" component={Link}     className={classes.deskMenu}  color='primary'>
                            <DashboardIcon />
                          </IconButton>
                      
                      </>
                    ) : null
                  ) : null}

                
                    <IconButton       className={classes.deskMenu} component={Link}  to="/Home"  color='primary'>
                      <HomeIcon />
                    </IconButton>
               

                  
                    <DropDownCate className={classes.deskMenu}/>
                   
          
                  <IconButton
                     color='primary'
                    component={Link}
                    to="/About"
                    className={classes.deskMenu}
                  >
                    <GroupWork />
                  </IconButton>

                  <IconButton
                     
                     className={classes.deskMenu}
                     color='primary'
                    component={Link}
                    to="/Contact"
                  
                  >
                    <PermPhoneMsgIcon />
                  </IconButton>

                  {user ? (
                    <>
                          
                      <IconButton id="ct-btn"
                             className={classes.deskMenu}
                         color='primary'
                  
                        component={Link}
                        to="/MyCart"
                       
                      >
                        {/* {props.currentuser.cartItems &&
                        Object.keys(props.currentuser.cartItems).length > 0 &&
                         Object.values(props.currentuser.cartItems).map((v,i)=>{
                          cartQtn.push(v.qtn)
                        
                        })} */}
                        <Badge  badgeContent={cartQtn.reduce((a, b) => a + b, 0)} color="secondary">
                          <ShoppingBasket />
                        </Badge>
                      </IconButton>
                      <IconButton     className={classes.deskMenu}
                         color='primary'
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                       
                      >
                        {props.currentuser.userProfile ? (
                          <>

                            <img
                              src={props.currentuser.userProfile}
                              alt="USER profile image"
                              className="Menu-profileimg"
                           
                            />
                          
                          </>
                        ) : (
                          <AccountCircle />
                        )}
            
                      </IconButton>
                    </>
                  ) : (
                    <FormModel
                      name="Login"
                      cs="header-show-login-btn"
                      showmsg={showLoginSucces}
                      closemsg={closeLoginSucces}
                    />
                  )}
                </div>

                <div className={classes.sectionMobile}>
                  <IconButton
                  
      
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
                {successMsg ? (
                  <SuccessfullMsg close={closeLoginSucces} />
                ) : null}
              </Toolbar>
           
            </AppBar>
           

            
          </div>
        </>
      ) : null}

{renderMobileMenu}
                          {renderMenu}   
    </>
  );
};

function SuccessfullMsg(props) {
  return (
    <div className="successmsgbox">
      <p>Login successfully!</p>
      <CloseIcon
        onClick={props.close}
        style={{ marginLeft: "5px", paddingLeft: "5px", cursor: "pointer" }}
      />
    </div>
  );
}

const UserprofileDropDown = React.forwardRef((props, ref) => {
  var user = firebase.auth().currentUser;

  const [userimg, setuserimg] = useState({
    saved: false,
    userimage: "",
    imgname: "",
  });
  const [editForm, setEditForm] = useState(false);
  const [useMetaDetails, setUserMetaDetails] = useState({
    userName: "   s   ",
    address: "  ",
    phone: "    ",
  });

  useState(() => {
    getPreviousData();
  }, []);

  const getuserimg = () => {
    var ImgName,
      reader,
      files = [];

    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      files = e.target.files;
      ImgName = e.target.files[0].name;
      setuserimg({
        saved: true,
        userimage: files[0],
        imgname: ImgName,
      });
      reader = new FileReader();
      reader.onload = function () {
        document.getElementById("userimg").src = reader.result;
      };
      reader.readAsDataURL(files[0]);
    };
    input.click();
    //
  };

  const cancelImgChg = () => {
    document.getElementById("userimg").src = user.photoURL;
    setuserimg({
      saved: false,
      userimage: "",
      imgname: "",
    });
  };

  const saveuserimage = () => {
    var uploadTask = firebase
      .storage()
      .ref("usersImages/" + userimg.imgname)
      .put(userimg.userimage);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        document.getElementById("imgupploadingprogress").innerHTML =
          progress + " %";
      },
      function (error) {
        alert("Error occurred while Saving Images!");
      },
      function () {
        //uploading to Database
        setuserimg({ saved: false, userimage: "", imgname: "" });
        uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
          user
            .updateProfile({ photoURL: url })
            .then(function () {
              document.getElementById("imgupploadingprogress").innerHTML = "";
              alert("Image Changed Successfully!");
              firebase
                .database()
                .ref("users")
                .child(user.uid)
                .update({ userProfile: url });
            })
            .catch(function (error) {
              alert("Image Changed Failed!");
            });
        });
      }
    );
  };

  const setEditUserForm = () => {
    if (editForm) {
      setEditForm(false);
      setUserMetaDetails({
        userName: "",
        address: "",
        phone: "",
      });
    } else {
      setEditForm(true);
      getPreviousData();
    }
  };
  const handleUserFormDetails = (event) => {
    setUserMetaDetails({
      ...useMetaDetails,
      [event.target.name]: event.target.value,
    });

    return true;
  };

  function getPreviousData() {
    let dbRef = firebase.database().ref("users");
    if (user) {
      dbRef
        .child(user.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserMetaDetails(snapshot.val());
          }
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
    }
  }

  const changeUSerData = (e) => {
    e.preventDefault();
    let [na, ad, ph] = [
      useMetaDetails.userName.trim(),
      useMetaDetails.address.trim(),
      useMetaDetails.phone.trim(),
    ];
    let [uName, addr, phone] = [
      na.split(" ").join("a"),
      ad.split(" ").join(""),
      ph.split(" ").join(""),
    ];

    if (uName.length >= 3 && addr.length >= 10 && phone.length >= 11) {
      firebase.database().ref("users").child(user.uid).update({
        userName: useMetaDetails.userName,
        address: useMetaDetails.address,
        phone: useMetaDetails.phone,
      });
      user
        .updateProfile({
          displayName: useMetaDetails.userName,
        })
        .then(function () {
          console.log("successfully updated!");

        })
        .catch(function (error) {
          alert(error.message);
        });

      var errMsg = document.getElementById("updErrMsg");
      errMsg.innerHTML = "";
      setEditUserForm();
      getPreviousData();
      alert("updated Profile!");
    } else {
      var errMsg = document.getElementById("updErrMsg");
      errMsg.innerHTML =
        "Please Fill the form correctly username length must be above then 3 characters and address 10 and phone 11";
    }
  };


  return (
    <>
      
        <div className="user_about_details_popup">
          <div className="user_about_pop_top">
            <div className="user_about_pop_closeicon">
              <HighlightOffIcon
                onClick={() => {
                  props.close();
                  setEditForm(false);
                }}
              />
            </div>

            <figure>
              {user ? (
                user.photoURL ? (
                  <>
                  <img
                    style={{ fontSize: "14px" }}
                    onClick={getuserimg}
                    title="Upload image"
                    id="userimg"
                    src={user.photoURL}
                    alt={user.displayName}
                  />
                    <IconButton onClick={getuserimg}><FaExchangeAlt  style={{fonSize: "10px !important"}} /></IconButton>
                  </>
                ) : (
                  <>
                  <img
                    style={{ fontSize: "14px" }}
                    onClick={getuserimg}
                    title="Upload image"
                    id="userimg"
                    src={defaultuserimg}
                    alt={user.displayName}
                  />
                    <IconButton onClick={getuserimg}><FaExchangeAlt  style={{fonSize: "10px"}} /></IconButton>
                  </>
                )
              ) : null}
              {userimg.saved === true ? (
                <>
                  <span
                    color={"green"}
                    onClick={saveuserimage}
                    style={{
                      display: "block",
                      marginTop: "10px",
                      fontSize: "12px",
                      color: "green",
                      cursor: "pointer",
                    }}
                  >
                    save profile
                  </span>
                  <CloseIcon onClick={cancelImgChg} />
                </>
              ) : null}
              <span
                style={{
                  display: "block",
                  marginTop: "10px",
                  fontSize: "12px",
                  color: "green",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "center",
                }}
                id="imgupploadingprogress"
              ></span>
            </figure>

            <div className="userMeta">
              <span>Hello</span>
              {user ? <h3> {user.displayName} </h3> : <h3>Unkown user</h3>}
              <button onClick={setEditUserForm}>
                <EditOutlinedIcon fontSize="small" />
                {editForm ? "Cancel" : "Edit profile"}
              </button>
            </div>
            <p> MR AUTOMOTIVE is built on trust.</p>
          </div>

          <div
            style={{
              fontSize: "12px",
              lineHeight: "18p",
              padding: "10px 12px",
            }}
          >
            <div>
              {editForm ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    Shipping address
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="userName"
                        name="userName"
                        label="userName"
                        fullWidth
                        autoComplete="user-name"
                        value={useMetaDetails.userName}
                        onChange={handleUserFormDetails}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="Phone"
                        name="phone"
                        label="Phone"
                        fullWidth
                        autoComplete="Phone"
                        value={useMetaDetails.phone}
                        onChange={handleUserFormDetails}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="Address"
                        name="address"
                        label="Address"
                        fullWidth
                        autoComplete="shipping address"
                        value={useMetaDetails.address}
                        onChange={handleUserFormDetails}
                      />
                    </Grid>
                  </Grid>
                  <>
                    <p
                      style={{ margin: "5px  0" }}
                      id="updErrMsg"
                      style={{ color: "red" }}
                    ></p>
                    <Button
                      style={{ marginTop: "5px" }}
                      variant="contained"
                      color="secondary"
                      onClick={changeUSerData}
                    >
                      Update
                    </Button>
  
                </>
              </>
              ) : null}
            </div>
          </div>
    
            <Button   style={{ marginTop: "15px", marginLeft: "12px" }}  variant="contained"
                      color="primary"
              onClick={() => {
                props.logout();
                setUserMetaDetails({ userName: "", address: "", phone: "" });
              }}
            >
              <ArrowBackRounded style={{marginRight: "5px"}}/>
               Logout
            </Button>
         
        </div>
  
    </>
  );
});

const mapStateToProps = (store) => ({
  currentuser: store.currentuser,
});

export default connect(mapStateToProps, null)(withRouter(Header));
