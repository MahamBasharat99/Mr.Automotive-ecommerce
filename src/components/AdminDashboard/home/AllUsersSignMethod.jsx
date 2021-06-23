import React, { useEffect, useState } from "react";
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

function AllUsersSignMethod() {
  const classes = useStyles();
  let [allUsers, setallUsers] = useState([]);
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
    dbUserRef.on("child_added", (data) => {
      allData.push(data.val());
    });
    setTimeout(() => {
      setallUsers(allData);
    }, 300);
  }
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.paper} style={{ margin: "15px auto" }}>
          <PeopleRounded fontSize={"28px"} />
          <Typography style={{ margin: "8px 0" }} component="h2" variant="h4">
            Total Users
          </Typography>
          <Typography component="p" variant="h4">
            {allUsers.length}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            {days[new Date().getDay()]}: &nbsp;
            {new Date().getDate()}/{month[new Date().getMonth() + 1]}/
            {new Date().getFullYear()}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.paper} style={{ margin: "15px auto" }}>
          <FcGoogle style={{ marginTop: "5px",}} fontSize={"28px"} />
          <Typography style={{ margin: "8px 0" }} component="h2" variant="h4">
            Google Users
          </Typography>
          <Typography component="p" variant="h4">
            {googleUsers}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.paper} style={{ margin: "15px auto" }}>
          <FaFacebook style={{ marginTop: "5px",color: "#1877f2"  }} fontSize={"28px"} />
          <Typography style={{ margin: "8px 0" }} component="h2" variant="h4">
            Facebook Users
          </Typography>
          <Typography component="p" variant="h4">
            {facebookUsers}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.paper} style={{ margin: "15px auto" }}>
          <EmailOutlinedIcon style={{ marginTop: "5px", color:"#EA4335" }} fontSize={"28px"} />
          <Typography style={{ margin: "8px 0" }} component="h2" variant="h4">
            Email Users
          </Typography>
          <Typography component="p" variant="h4">
            {emailusers}
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}
export default AllUsersSignMethod;
