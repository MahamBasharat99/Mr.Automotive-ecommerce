import React, { useEffect, useState, forwardRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import firebase from "../../../config/firebase";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CardMedia } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditRounded from "@material-ui/icons/EditRounded";
import PageviewIcon from "@material-ui/icons/Pageview";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import RefreshRounded from "@material-ui/icons/RefreshRounded";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { PeopleOutline, PeopleRounded } from "@material-ui/icons";
import defaultimg from '../../../assets/images/no-image.jpg'

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
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const db = firebase.database();
const dbUserRef = db.ref("users");

const UsersManage = (props) => {
  const classes = useStyles();
  let [allUsers, setallUsers] = useState([]);
  let [u, setU] = useState({
    fbu:0,
    gu:0,
    eu:0,
  });
  let [emailusers, setEmailusers] = useState(0);
  let [googleUsers, setGoogleusers] = useState(0);
  let [facebookUsers, setFacebookusers] = useState(0);
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    getSigninMethod();
  }, [allUsers]);

  function getSigninMethod() {
    setTimeout(() => {
      if (allUsers.length !== 0) {
        let gog =0;
        let em =0;
        let fb =0;
        // console.log(allUsers);
        for (let i = 0; i < allUsers.length; i++) {
          let signM = allUsers[i].signMethod;
          if(signM === "Email"){
            em++;
            setEmailusers(em);
          }else if(signM === "Google"){
            gog++;
            setGoogleusers(gog);
          }else if("Facebook"){
            fb++;
            setFacebookusers(fb);
          }
         
        }
      }
    }, 500);
  }

  function getAllUsers() {
    let allData = [];
    setEmailusers(0);
    setGoogleusers(0);
    setFacebookusers(0);
    dbUserRef.on("child_added", (data) => {
      allData.push(data.val());
    });
    setTimeout(() => {
      setallUsers(allData);
    }, 300);
  }

  function preventDefault(event) {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      {allUsers.length !== 0 ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Paper className={classes.paper} style={{ margin: "15px auto" }}>
                <PeopleRounded fontSize={"28px"} />
                <Typography
                  style={{ margin: "8px 0" }}
                  component="h2"
                  variant="h4"
                >
                  Total Users
                </Typography>
                <Typography component="p" variant="h4">
                  {allUsers.length}
                </Typography>
                <Typography
                  color="textSecondary"
                  className={classes.depositContext}
                >
                  {days[new Date().getDay()]}: &nbsp;
                  {new Date().getDate()}/{month[new Date().getMonth() + 1]}/
                  {new Date().getFullYear()}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Paper className={classes.paper} style={{ margin: "15px auto" }}>
                <FcGoogle style={{ marginTop: "5px" }} fontSize={"28px"} />
                <Typography
                  style={{ margin: "8px 0" }}
                  component="h2"
                  variant="h4"
                >
                  Google Users
                </Typography>
                <Typography component="p" variant="h4">
                  {googleUsers}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Paper className={classes.paper} style={{ margin: "15px auto" }}>
                <FaFacebook style={{ marginTop: "5px",color: "#1877f2" }} fontSize={"28px"} />
                <Typography
                  style={{ margin: "8px 0" }}
                  component="h2"
                  variant="h4"
                >
                  Facebook Users
                </Typography>
                <Typography component="p" variant="h4">
                  {facebookUsers}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Paper className={classes.paper} style={{ margin: "15px auto" }}>
                <EmailOutlinedIcon
                  style={{ marginTop: "5px", color:"#EA4335" }}
                  fontSize={"28px"}
                />
                <Typography
                  style={{ margin: "8px 0" }}
                  component="h2"
                  variant="h4"
                >
                  Email Users
                </Typography>
                <Typography component="p" variant="h4">
                  {emailusers}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <CustomizedTables
            allUsers={allUsers}
            getagainAllusers={getAllUsers}
          />
        </>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};
function Loader() {
  return (
    <div style={{ margin: "15px auto", width: "100%" }}>
      <div className="loader" style={{ margin: "15px auto" }}></div>
      <h4 style={{ margin: " 0 auto", textAlign: "center" }}>Loading...</h4>
    </div>
  );
}
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function CustomizedTables(props) {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper} className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">
               
                <IconButton
                  color="secondary"
                  onClick={() => props.getagainAllusers()}
                  style={{textAlign: "left",padding:"0 !important"}}
                >
                  <RefreshRounded />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="left">Profile</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Phone</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.allUsers.map((user, i) => (
               <>
              {user.admin  ? null : 
             
                <StyledTableRow key={i}>
                  {/* <StyledTableCell align="left"></StyledTableCell> */}
                  <StyledTableCell align="left">
                    {user.signMethod === "Email" && (
                      <EmailOutlinedIcon  style={{color:"#EA4335" }}fontSize="18px" />
                    )}
                    {user.signMethod === "Facebook" && (
                      <>
                        <FaFacebook color={'1877f2'} fontSize="18px" />
                      </>
                    )}
                    {user.signMethod === "Google" && (
                      <>
                        <FcGoogle fontSize="18px" />
                      </>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {user.userProfile !== "" ?
                    <CardMedia
                      className={classes.media}
                      image={user.userProfile}
                    />
                    :  <CardMedia
                    className={classes.media}
                    image={defaultimg}
                  />}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {user.userName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {user.userEmail}
                  </StyledTableCell>
                  <StyledTableCell align="left">{user.phone}</StyledTableCell>
                  <StyledTableCell align="left">{user.address}</StyledTableCell>
                  <StyledTableCell align="center">
                    <FullScreenUserDetails
                      updUser={user.userUid}
                      getagainAllusers={props.getagainAllusers}
                    />
                    <UpdateForm
                      updUser={user.userUid}
                      getagainAllusers={props.getagainAllusers}
                    />

                    <ConfirmDialog
                      delUser={user.userUid}
                      getagainAllusers={props.getagainAllusers}
                    />
                  </StyledTableCell>{" "}
                </StyledTableRow>
                }
                </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteUser = (delUser) => {
    if (delUser) {
      dbUserRef
        .child(delUser)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            handleClose();
            dbUserRef.child(delUser).remove();
            props.getagainAllusers();
            alert("Deleted successfully!");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("This user is not Exist");
    }
  };
  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        aria-label="delete"
        color="secondary"
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Alert !"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton color="primary" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => deleteUser(props.delUser)}
          >
            <DoneAllIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

const UpdateForm = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [updDetails, setupdDetails] = useState({
    userName: "",
    address: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserUpdDetails = (event) => {
    setupdDetails({
      ...updDetails,
      [event.target.name]: event.target.value,
    });

    return true;
  };
  const updateUserDetails = (updUser) => {
    if (updUser) {
      dbUserRef
        .child(updUser)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            dbUserRef.child(updUser).update({
              userName: updDetails.userName,
              address: updDetails.address,
              phone: updDetails.phone,
            });
            handleClose();

            props.getagainAllusers();
            alert("Updated User successfully!");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("This user is not Exist");
    }
  };

  function getPreviousData(updUser) {
    if (updUser) {
      dbUserRef
        .child(updUser)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setupdDetails(snapshot.val());
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
        onClick={() => {
          handleClickOpen();
          getPreviousData(props.updUser);
        }}
        aria-label="update"
        color="primary"
      >
        <EditRounded />
      </IconButton>
      {/* //view */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        {" "}
        <AppBar className={classes.appBar}>
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
              User Details
            </Typography>
          </Toolbar>
        </AppBar>
        {/* //update */}
        <div className="UserupdateFormAdmin">
          <Typography variant="h6" gutterBottom>
            User Meta Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                // id="userName"
                name="userName"
                label="userName"
                fullWidth
                autoComplete="user-name"
                value={updDetails.userName}
                onChange={(e) => handleUserUpdDetails(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                // id="Phone"
                name="phone"
                label="Phone"
                fullWidth
                autoComplete="Phone"
                value={updDetails.phone}
                onChange={(e) => handleUserUpdDetails(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                // id="Address"
                name="address"
                label="Address"
                fullWidth
                autoComplete="shipping address"
                value={updDetails.address}
                onChange={(e) => handleUserUpdDetails(e)}
              />
            </Grid>
          </Grid>
          <p
            style={{ margin: "5px  0" }}
            id="updErrMsg"
            style={{ color: "red" }}
          ></p>
          <Button
            style={{ marginTop: "10px", marginLeft: "7px" }}
            variant="contained"
            color="secondary"
            onClick={() => updateUserDetails(props.updUser)}
          >
            Update
            <DoneAllIcon color="#fff" />
          </Button>
        </div>
      </Dialog>
    </>
  );
};

function FullScreenUserDetails(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [updDetails, setupdDetails] = useState({
    userName: "",
    address: "",
    phone: "",
    userUid: "",
    admin: false,
    userEmail: "",
    userProfile: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function getPreviousData(updUser) {
    if (updUser) {
      dbUserRef
        .child(updUser)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setupdDetails(snapshot.val());
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
        onClick={() => {
          handleClickOpen();
          getPreviousData(props.updUser);
        }}
        aria-label="View"
      >
        <PageviewIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
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
              User Details
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="UserupdateFormAdmin" style={{ minWidth: "400px" }}>
          <List>
            <ListItem>
              <CardMedia
                image={updDetails.userProfile}
                className={classes.media}
                style={{
                  marginBottom: "10px",
                  borderRadius: "none",
                  marginRight: "18px",
                }}
              />
              <ListItemText
                primary={updDetails.userName}
                secondary="UserName"
              />
            </ListItem>
            <Divider />

            <ListItem>
              <ListItemText
                primary={updDetails.userName}
                secondary="UserName"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={updDetails.userEmail} secondary="Email" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={updDetails.phone} secondary="Phone" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={updDetails.address} secondary="Address" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={updDetails.admin ? "Yes" : "No"}
                secondary="Adminl"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={updDetails.userUid} secondary="UserUid" />
            </ListItem>
          </List>
          <Box pt={4}>
            <Copyright />
          </Box>
        </div>
      </Dialog>
    </>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mrautomotive-dd1f6.web.app/">
        MR AutoMotive
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
const mapStateToProps = (store) => ({
  currentuser: store.currentuser,
  allProducts: store.allProducts,
});

export default connect(mapStateToProps, null)(withRouter(UsersManage));
