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
import EditRounded from "@material-ui/icons/EditRounded";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import RefreshRounded from "@material-ui/icons/RefreshRounded";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ClearIcon from "@material-ui/icons/Clear";
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
import placeholderImg from "../../../assets/images/placeholderImg.jpg"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  ///pallette is a built in class in which we change
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
}));

const db = firebase.database();
const dbProductsRef = db.ref("all_Products/categories");

const UsersManage = (props) => {

  let [allProducts, setallProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  function getAllProducts() {
    let allData = [];
    dbProductsRef.on('child_added', data => {
      allData.push(data.val());
      setallProducts(allData)
    })
    return allProducts
  }
  return (
    <React.Fragment>
      {allProducts.length !== 0 ? (
        <React.Fragment>
          <CustomizedTables
          //here we call customized table where we use three major functions
            allProducts={allProducts}
            getagainAllprods={getAllProducts}
          />
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

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
        <Typography color="primary" style={{ padding: "10px", float: "right" }} variant="h6">Refresh
         <IconButton color="primary" onClick={() => props.getagainAllprods()}>
            <RefreshRounded />
          </IconButton>
        </Typography>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="left">Category</StyledTableCell>
              <StyledTableCell align="left">Brand</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(props.allProducts).map((v, i) => {
              return (
                Object.values(v).map((vs, is) => {
                  let product = vs.prod;
                  return (
                    <StyledTableRow key={i}>

                      <StyledTableCell align="left">
                      {product.imgs &&
                      product.imgs.length != 0 ?
                        <CardMedia
                          className={classes.media}
                        
                          image={product.imgs[0] ? product.imgs[0] : product.imgs[1] ? product.imgs[1] : product.imgs[2]}
                        />:  <CardMedia
                        className={classes.media}
                      
                        image={placeholderImg}
                      />}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {product.title}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.price}
                      </StyledTableCell>
                      <StyledTableCell align="left">{product.category}</StyledTableCell>
                      <StyledTableCell align="left">{product.brand}</StyledTableCell>
                      <StyledTableCell align="center">
                        <UpdateForm
                          ky={product.key}
                          cat={product.category}
                          getagainAllprods={props.getagainAllprods} chkAg={props.getagainAllprods}/>
                        <ConfirmDialog ky={product.key} cat={product.category} getagainAllprods={props.getagainAllprods}/>
                        <FullScreenUserDetails ky={product.key} cat={product.category}/>
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                })
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const UpdateForm = (props) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updDetails, setupdDetails] = useState({
    brand: "",
    category: "",
    condition: "",
    description: "",
    imgs: [],
    key: "",
    postdate: "",
    price: "",
    title: "",
    stock: 15
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.chkAg();
  };

  const handleUserUpdDetails = (event) => {
    setupdDetails({
      ...updDetails,
      [event.target.name]: event.target.value,
    });
  };

  const updateProductrDetails = () => {
    if (props.cat, props.ky) {
      dbProductsRef
        .child(props.cat)
        .child(props.ky)
        .get()
        //get()is used to enter the desired pos
        .then((snapshot) => {
          if (snapshot.exists()) {
            dbProductsRef.child(props.cat).child(props.ky).child('prod').update(updDetails).then(() => {
              handleClose();
              alert("Updated Product successfully!");
            });
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("This Product is not Exist");
    }
  };

  function getPreviousData(cate, ky) {
    if (cate && ky) {
      dbProductsRef
        .child(cate)
        .child(ky)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setupdDetails(snapshot.val().prod);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
    }
  }

  var files = [];

  function selectImg(e, imgno) {
    e.preventDefault();
    var input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      files = e.target.files;
      upDateProdImage(files[0].name, files[0], imgno)
    };
    input.click();
  }

  const upDateProdImage = (name, img, imgno) => {
    var uploadTask = firebase
      .storage()
      .ref("store-images/" + name)
      .put(img);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setLoading(true);
      },
      function (error) {
        setLoading(false);
        alert("Error occurred while Saving Images!");
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
          setLoading(false);
          if (props.cat && props.ky) {
            setLoading(true);
            dbProductsRef
              .child(props.cat)
              .child(props.ky)
              .get()
              .then((snapshot) => {
                if (snapshot.exists()) {
                  let arr = []
                  let img1 = snapshot.val().prod.imgs ? snapshot.val().prod.imgs[0] : '';
                  let img2 = snapshot.val().prod.imgs ? snapshot.val().prod.imgs[1] : '';
                  let img3 = snapshot.val().prod.imgs ? snapshot.val().prod.imgs[2] : '';
                  if (imgno === 1) {
                    img1 = url
                  }
                  if (imgno === 2) {
                    img2 = url
                  }
                  if (imgno === 3) {
                    img3 = url
                  }
                  arr.push(img1, img2, img3)
                  dbProductsRef
                    .child(props.cat)
                    .child(props.ky).child('prod').child('imgs').update(arr).then(() => {
                      getPreviousData(props.cat, props.ky);
                      setLoading(false);
                      alert("Image Updated Successfully!")
                    })
                }
              })
              .catch((error) => {
                console.error(error);
                alert(error.message);
                setLoading(false);
              });
          }
        });
      }
    );
  };

  function removeImg(imgno) {

    if (props.cat && props.ky) {
      dbProductsRef
        .child(props.cat)
        .child(props.ky)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            let arr = []
            let img1 = snapshot.val().prod.imgs[0];
            let img2 = snapshot.val().prod.imgs[1];
            let img3 = snapshot.val().prod.imgs[2];
            if (imgno === 1) {
              img1 = ""
            }
            if (imgno === 2) {
              img2 = ""
            }
            if (imgno === 3) {
              img3 = ""
            }
            arr.push(img1, img2, img3)
            dbProductsRef
              .child(props.cat)
              .child(props.ky).child('prod').child('imgs').update(arr).then(() => {
                getPreviousData(props.cat, props.ky);
                alert("Image deleted Successfully!")
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
          getPreviousData(props.cat, props.ky);
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
              Product Details
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="UserupdateFormAdmin">
          {loading ? <Loader /> : <>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  name="title"
                  label="Title"
                  fullWidth
                  autoComplete="off"
                  value={updDetails.title}
                  onChange={(e) => handleUserUpdDetails(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  name="description"
                  label="Description"
                  multiline
                  rows={2}
                  rowsMax={4}
                  fullWidth
                  autoComplete="off"
                  value={updDetails.description}
                  onChange={(e) => handleUserUpdDetails(e)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  name="category"
                  label="Category"
                  fullWidth
                  autoComplete="off"
                  value={updDetails.category}
                  onChange={(e) => handleUserUpdDetails(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="brand"
                  label="Brand"
                  fullWidth
                  autoComplete="off"
                  value={updDetails.brand}
                  onChange={(e) => handleUserUpdDetails(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="price"
                  label="Price"
                  fullWidth
                  autoComplete="off"
                  value={updDetails.price}
                  onChange={(e) => handleUserUpdDetails(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="stock"
                  label="Stock"
                  fullWidth
                  autoComplete="off"
                  value={updDetails.stock}
                  onChange={(e) => handleUserUpdDetails(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="condition"
                  label="Condition"
                  fullWidth
                  autoComplete="off"
                  value={updDetails.condition}
                  onChange={(e) => handleUserUpdDetails(e)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <div className="SelectprodImgWrapper" style={{ margin: "7px auto !important", width: "100% !important" }}>
                  <button
                    className="imgSelbtn"
                    onClick={(e) => selectImg(e, 1)}
                  >
                    {updDetails.imgs &&
                    updDetails.imgs.length ? (
                      updDetails.imgs[0] ?
                        <img
                          id="productImg1"
                          className="formProdimg"
                          alt="product img"
                          src={updDetails.imgs[0]}
                        />
                        :
                        <>
                          <svg
                            width="36px"
                            height="36px"
                            viewBox="0 0 1024 1024"
                            data-aut-id="icon"
                            fill="#002f34"
                          >
                            <path d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                          </svg>
                          <span>Add Photo</span>
                        </>
                    ) : (
                      <>
                        <svg
                          width="36px"
                          height="36px"
                          viewBox="0 0 1024 1024"
                          data-aut-id="icon"
                          fill="#002f34"
                        >
                          <path d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                        </svg>
                        <span>Add Photo</span>
                      </>
                    )}
                  </button>

                  {updDetails.imgs &&
                  updDetails.imgs.length ? (
                    updDetails.imgs[0] ? (
                      <ClearIcon
                        onClick={() => removeImg(1)}
                        className="removeimg"
                      />
                    ) : null
                  ) : null}
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <div className="SelectprodImgWrapper" style={{ margin: "7px auto !important", width: "100% !important" }}>
                  <button
                    className="imgSelbtn"
                    onClick={(e) => selectImg(e, 2)}
                  >
                    {updDetails.imgs &&
                    updDetails.imgs.length ? (
                      updDetails.imgs[1] ?
                        <img
                          id="productImg2"
                          className="formProdimg"
                          alt="product img"
                          src={updDetails.imgs[1]}
                        />
                        : <>
                          <svg
                            width="36px"
                            height="36px"
                            viewBox="0 0 1024 1024"
                            data-aut-id="icon"
                            fill="#002f34"
                          >
                            <path d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                          </svg>
                          <span>Add Photo</span>
                        </>
                    ) : (
                      <>
                        <svg
                          width="36px"
                          height="36px"
                          viewBox="0 0 1024 1024"
                          data-aut-id="icon"
                          fill="#002f34"
                        >
                          <path d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                        </svg>
                        <span>Add Photo</span>
                      </>
                    )}
                  </button>

                  {updDetails.imgs &&
                  updDetails.imgs.length ? (
                    updDetails.imgs[1] ? (
                      <ClearIcon
                        onClick={() => removeImg(2)}
                        className="removeimg"
                      />
                    ) : null
                  ) : null}

                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <div className="SelectprodImgWrapper" style={{ margin: "7px auto !important", width: "100% !important" }}>
                  <button
                    className="imgSelbtn"
                    onClick={(e) => selectImg(e, 3)}
                  >
                    {updDetails.imgs &&
                    updDetails.imgs.length ? (
                      updDetails.imgs[2] ? (
                        <img
                          id="productImg3"
                          className="formProdimg"
                          alt="product img"
                          src={updDetails.imgs[2]}
                        />

                      )
                        :
                        <>
                          <svg
                            width="36px"
                            height="36px"
                            viewBox="0 0 1024 1024"
                            data-aut-id="icon"
                            fill="#002f34"
                          >
                            <path d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                          </svg>
                          <span>Add Photo</span>
                        </>

                    )
                      : (
                        <>
                          <svg
                            width="36px"
                            height="36px"
                            viewBox="0 0 1024 1024"
                            data-aut-id="icon"
                            fill="#002f34"
                          >
                            <path d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                          </svg>
                          <span>Add Photo</span>
                        </>

                      )}
                  </button>
                  {updDetails.imgs &&
                  updDetails.imgs.length ? (
                    updDetails.imgs[2] ? (
                      <ClearIcon
                        onClick={() => removeImg(3)}
                        className="removeimg"
                      />
                    ) : null
                  ) : null}
                </div>
              </Grid>
            </Grid>

            <Button
              style={{ marginTop: "10px", marginLeft: "7px", backgroundColor: "#ff5e14", color: "#fff" }}
              variant="contained"
              onClick={updateProductrDetails}
            >
              Update
            <DoneAllIcon color="#fff" />
            </Button>
          </>
          }
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
  const deleteProd = () => {
    if (props.cat, props.ky) {
      dbProductsRef
        .child(props.cat)
        .child(props.ky)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            handleClose();
            dbProductsRef.child(props.cat).child(props.ky).remove();
            props.getagainAllprods();
            alert("Product Deleted successfully!");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("This Product is not Exist");
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
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton color="primary" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={deleteProd}
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
  const [updDetails, setupdDetails] = useState({
    brand: "",
    category: "",
    condition: "",
    description: "",
    imgs: [],
    key: "",
    postdate: "",
    price: "",
    title: "",
    stock: 0
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function getPreviousData() {
    if (props.cat && props.ky) {
      dbProductsRef
        .child(props.cat)
        .child(props.ky)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setupdDetails(snapshot.val().prod);
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
              Product Details
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="UserupdateFormAdmin" style={{ minWidth: "400px" }}>
          <List>
            <ListItem>
              <CardMedia
                image={updDetails.imgs[0] ? updDetails.imgs[0] : updDetails.imgs[1] ? updDetails.imgs[1] : updDetails.imgs[2]}
                style={{
                  marginBottom: "10px",
                  borderRadius: "none",
                  marginRight: "18px",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%"
                  
                }}
                component={"image"}
              />
              <ListItemText
                primary={updDetails.title}
                secondary="Title"
              />
            </ListItem>
            <Divider />

            <ListItem>
              <ListItemText
                primary={updDetails.category}
                secondary="Category"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={updDetails.description} secondary="Description" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={updDetails.price} secondary="Price" />
            </ListItem>
            <ListItem>
              <ListItemText primary={updDetails.stock} secondary="Stock" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={updDetails.brand} secondary="Brand" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={updDetails.condition}
                secondary="Condition"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={updDetails.postdate}
                secondary="PostDate"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={updDetails.key} secondary="Id" />
            </ListItem>
          </List>
         
        </div>
      </Dialog>
    </>
  );
}

function Loader() {
  return (
    <div style={{ margin: "15px auto", width: "100%" }}>
      <div class="loader" style={{ margin: "15px auto" }}></div>
      <h4 style={{ margin: " 0 auto", textAlign: "center" }}>Loading...</h4>
    </div>
  );
}

const mapStateToProps = (store) => ({
  currentuser: store.currentuser,
  all_Products: store.allProducts,
});

export default connect(mapStateToProps, null)(withRouter(UsersManage));
