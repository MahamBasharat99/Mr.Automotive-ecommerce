import React, { useState, useEffect, forwardRef } from 'react';
import firebase from "../../../config/firebase";
import { withRouter,Link } from "react-router-dom";
import { connect } from "react-redux";
import { check_current_user, get_All_Products, get_All_Orders } from "../../../store/action/action";
import Loader from "../../Others/Loader2";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton } from "@material-ui/core";
import EditRounded from "@material-ui/icons/EditRounded";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import RefreshRounded from "@material-ui/icons/RefreshRounded";
import Grid from "@material-ui/core/Grid";
import InputLabel from '@material-ui/core/InputLabel';

import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PageviewIcon from "@material-ui/icons/Pageview";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: "100%",
    },
    container: {
        maxHeight: 800,
        width: "100%",
    },
    media: {
        height: "50px",
        width: "50px",
        borderRadius: "50%",
        zIndex: -1
    },
    appBar: {
        position: "relative",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#1dbf73",
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

const db = firebase.database();
const dbOrderRef = db.ref("orders");
const dbUserRef = db.ref("users");


const CompletedOrders = (props) => {
    const classes = useStyles();
    const [allOrders, setAllOrders] = useState();
    useEffect(() => {
        getAndSetAllORders();

    }, [props.allOrders]);
// sa/
    const getAndSetAllORders = () => {
        let completed = []
        if (props.allOrders) {
            if (props.allOrders.length !== 0) {
                props.allOrders.forEach((com) => {
                   Object.values(com).forEach((data) => {
                    if(data.otherDetails.orderStatus == "completed"){
                      completed.push(data);
                      setAllOrders(completed);
                      }
                   });
                  }
                )  
            }
        } else {
            props.get_All_Orders();
        }
    }
    return (
        <div>
            {allOrders ?
                <TableContainer component={Paper} className={classes.container}>
                    <Typography color="primary" style={{ padding: "10px", float: "right" }} variant="h6">Refresh
                        <IconButton color="primary" onClick={() => props.get_All_Orders()}>
                            <RefreshRounded />
                        </IconButton>
                    </Typography>
                    <Table stickyHeader className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell>Order Date</StyledTableCell>
                                <StyledTableCell align="left">Price</StyledTableCell>
                                <StyledTableCell align="left">Status</StyledTableCell>
                                <StyledTableCell align="left">Items</StyledTableCell>
                                <StyledTableCell align="left">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allOrders  ?
                              allOrders.length > 0 &&
                              allOrders.map((order,key)=>{
                                return(
                                              <>
                                                  <StyledTableRow key={key}>
                                                      <StyledTableCell align="left">
                                                          {order.orderId}
                                                      </StyledTableCell>
                                                      <StyledTableCell component="th" scope="row">
                                                          {order.otherDetails.orderPlacingDate}
                                                      </StyledTableCell>
                                                      <StyledTableCell align="left">
                                                          {order.TotalOrderPrice}
                                                      </StyledTableCell>
                                                      <StyledTableCell align="left">{order.otherDetails.orderStatus}</StyledTableCell>
                                                      <StyledTableCell align="left">{order.productList.length}</StyledTableCell>
                                                      <StyledTableCell align="center">
                                                          <UpdateForm userId={order.userID} orderId={order.orderId} 
                                                          getAgainOrders={props.get_All_Orders}
                                                          />
                                                          <ConfirmDialog userId={order.userID} orderId={order.orderId} 
                                                          getAgainOrders={props.get_All_Orders}/>
                                                          <FullScreenUserDetails
                                                          userId={order.userID} orderId={order.orderId} 
                                                          getAgainOrders={props.get_All_Orders}
                                                          />
                                                      </StyledTableCell>
                                                  </StyledTableRow>
                                              </>
                                              
                                )
                            })
                            
                                : <h3>No orders Found!</h3>
                                }
                        </TableBody>
                    </Table>
                </TableContainer>
                : <Loader />}
        </div>
    )
}

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateForm = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [viewOrderDetails, setViewOrderDetails] = useState({
        status: "",
        address: "",
        price: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOrderUpdDetails = (event) => {
        setViewOrderDetails({
            ...viewOrderDetails,
            [event.target.name]: event.target.value,
        });
    };
    const updateUserDetails = (userId, orderId) => {
        if (userId, orderId) {
            dbOrderRef
                .child(userId)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        dbOrderRef.child(userId).child(orderId).update({"TotalOrderPrice": viewOrderDetails.price})
                        dbOrderRef.child(userId).child(orderId).child('otherDetails').update({"orderStatus":viewOrderDetails.status})
                        dbOrderRef.child(userId).child(orderId).child('userDetails').update({"address1":viewOrderDetails.address})

                        dbUserRef.child(userId).child("orders").child(orderId).update({"TotalOrderPrice": viewOrderDetails.price})
                        dbUserRef.child(userId).child("orders").child(orderId).child('otherDetails').update({"orderStatus":viewOrderDetails.status})
                        dbUserRef.child(userId).child("orders").child(orderId).child('userDetails').update({"address1":viewOrderDetails.address})
                        handleClose();
                        props.getAgainOrders();
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert(error.message);
                });
        }
    };

    function getPreviousData(userId, orderId) {
        if (userId, orderId) {
            dbOrderRef
                .child(userId)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        dbOrderRef.child(userId).child(orderId).get().then((data) => {
                            if (data.exists()) {
                                let prevData = data.val();
                                console.log(prevData);
                                setViewOrderDetails({
                                    price: prevData.TotalOrderPrice,
                                    address: prevData.userDetails.address1,
                                    status: prevData.otherDetails.orderStatus
                                })
                            }
                        })
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
                    getPreviousData(props.userId, props.orderId);
                }}
                aria-label="update"
                color="primary"
            >
                <EditRounded />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
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
                            Order Details
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="UserupdateFormAdmin">
                    <Typography variant="h6" gutterBottom>
                        Update Order Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                        <InputLabel id="order-status">Status</InputLabel>
              <Select
   
              name="status"
              fullWidth
              autoComplete="off"

          value={viewOrderDetails.status}
          onChange={(e) => handleOrderUpdDetails(e)}
        >
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="processing...">Processing</MenuItem>
        </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="price"
                                label="Price"
                                fullWidth
                                autoComplete="off"
                                value={viewOrderDetails.price}
                                onChange={(e) => handleOrderUpdDetails(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                name="address"
                                label="Shipping Address"
                                fullWidth
                                autoComplete="off"
                                value={viewOrderDetails.address}
                                onChange={(e) => handleOrderUpdDetails(e)}
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
                        onClick={() => updateUserDetails(props.userId, props.orderId)}
                    >
                        Update
                        <DoneAllIcon color="#fff" />
                    </Button>
                </div>
            </Dialog>
        </>
    );
};

const ConfirmDialog = (props) => {
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const deleteOrder = (userId, orderId) => {
      if (userId, orderId) {
        dbOrderRef
          .child(userId)
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              handleClose();
              dbOrderRef.child(userId).child(orderId).remove();
              props.getAgainOrders();
              dbUserRef.child(userId).child("orders").child(orderId).remove();
              alert("Deleted successfully!");
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        alert("This Order is not Exist");
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
              Are you sure you want to delete this Order?
            </DialogContentText>
            <DialogContentText id="alert-dialog-slide-description">
              Please make sure thats are you confirm?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <IconButton color="primary" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => deleteOrder(props.userId, props.orderId)}
            >
              <DoneAllIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  

  function FullScreenUserDetails(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [viewOrderDetails, setViewOrderDetails] = useState();
    const [expanded, setExpanded] = React.useState('panel3');

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
           

    
    function getPreviousData(userId, orderId) {
        if (userId, orderId) {
           
            dbOrderRef
                .child(userId)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        dbOrderRef
                        .child(userId)
                        .child(orderId)
                        .get()
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                      setViewOrderDetails(snapshot.val());
                    }else{
                        alert("No order ID found for this Order")
                    }
                  })
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
            getPreviousData(props.userId, props.orderId);
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
                Order Details
              </Typography>
            </Toolbar>
          </AppBar>
          {viewOrderDetails ?
          <div className="UserupdateFormAdmin" style={{ minWidth: "400px" }}>
                     <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Order Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <List>
              <ListItem>
                {/* <CardMedia
                  image={viewOrderDetails.}
                  className={classes.media}
                  style={{
                    marginBottom: "10px",
                    borderRadius: "none",
                    marginRight: "18px",
                  }}
                /> */}
                <ListItemText
                  primary={viewOrderDetails.TotalOrderPrice}
                  secondary="Total Price"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={viewOrderDetails.shipFee}
                  secondary="Ship Fee"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.productList.length} secondary="Products" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.otherDetails.orderStatus} secondary="Order Status" />
              </ListItem>
              <Divider />
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.otherDetails.orderPlacingDate} secondary="Order Placing Date" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.otherDetails.orderPlacingTime} secondary="Order Placing Time" />
              </ListItem>
              <Divider />
 
     
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.userID} secondary="user id" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.orderId} secondary="Order id" />
              </ListItem>
            </List>
          
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>User Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <List>
              <ListItem>
                <ListItemText
                  primary={viewOrderDetails.userDetails.userName}
                  secondary="User name"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={viewOrderDetails.userDetails.NameOnCard}
                  secondary="Name on Card"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.userDetails.address1} secondary="Address 1" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.userDetails.address2} secondary="Address 2" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.userDetails.phone} secondary="Phone" />
              </ListItem>
              <Divider />
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.userDetails.CVV} secondary="CVV" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.userDetails.cardNumber} secondary="Card number" />
              </ListItem>
              <Divider />
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.userDetails.ExpiryDate} secondary="Expiry Date" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.userDetails.country} secondary="Country" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.userDetails.city} secondary="City" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.userDetails.state} secondary="State" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={viewOrderDetails.userDetails.zip} secondary="Zip / Postal" />
              </ListItem>
              <Divider />
            </List>
          
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Products  Lists</Typography>
        
        </AccordionSummary>
        <AccordionDetails style={{display: "block !important"}}>
          <div style={{display: "block", width: "100%"}}>

  
        <div className="cart_header" style={{width:"100%"}}>
                <p>Product</p>
                <p></p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
        
              </div>
            {viewOrderDetails.productList.map((item,key)=>{
              return(
                <div className="cart_details" key={key}>
                
                <div className="cart_img">
                 
                  <img src={item.imgs[0]} alt="" style={{  width: "30px",height: "30px", marginLeft: "0 !important"}}/>
                  <span className="cart_name">{item.title.slice(0, 8)}</span>
                </div>
                <div className="cart_price">{item.price}</div>
                <div className="cart_qtn">
                  <span className="qtn_box">{item.qtn}</span>
                </div>
                <div className="cart_item_total">
                  <span id="total_pr">
                  {parseInt(item.price * item.qtn)}
                  </span>
                </div>
                <Link style={{fontSize: "13px"}} to={{ pathname: `/Shop/${item.category}/${item.key}`  }}
        params={{ category: item.category, id: item.key }}>View</Link>
              </div>
              )
            })}
                    </div>
        </AccordionDetails>
      </Accordion>

    </div>
             
          
          </div>
            
        : <Loader />}
        </Dialog>
      </>
    );
  }

const mapStateToProps = (store) => ({
    allProducts: store.allProducts,
    currentuser: store.currentuser,
    allOrders: store.allOrders,
});

const mapDispatchToProps = (dispatch) => ({
    check_current_user: () => dispatch(check_current_user()),
    get_All_Products: () => dispatch(get_All_Products()),
    get_All_Orders: () => dispatch(get_All_Orders()),

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompletedOrders));

