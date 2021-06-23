import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StarRating from "../Others/StarRating";
import { withRouter } from "react-router-dom";
import firebase from "../../config/firebase";
import { connect } from "react-redux";
import MultipleLoginForms from "../loginForm/MulipleLoginForms"
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flex: 1,
    },
    indicator: {
        backgroundColor: 'white !important',
      },
}));

function ProductDetailTabs(props) {


    let prodKey = props.match.params.key;
    let prodCate = props.match.params.category;
    let db = firebase.database();
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [othersRev, setOtherRevs] = useState(true);
    const [showRevForm, setReviewForm] = useState(true);
    const [revForm, setRevFormData] = useState({
        revName: "",
        revEmail: "",
        detailRev: "",
        quality: "",
        Experience: ""
    });

    useEffect(() => {
        chkOldRev();
    }, [props.currentuser])

    const chkOldRev = () => {
        if (Object.keys(props.currentuser).length > 0) {
            db.ref(`all_Products/categories/${prodCate}`).child(prodKey).get().then((data) => {
                if (data.exists()) {
                    if (data.val().prod.reviews) {
                    
                        if (Object.keys(data.val().prod.reviews).length > 0) {
                            setOtherRevs(data.val().prod.reviews)
                           
                            db.ref(`all_Products/categories/${prodCate}/${prodKey}/prod/reviews/`).child(props.currentuser.userUid).get().then((ex) => {
                                if (ex.exists()) {
                                    setReviewForm(false)
                                } else {
                                    setReviewForm(true)
                                }
                            })

                        }
                    } else {
                        setReviewForm(true)
                    }

                } else {
                    setReviewForm(true)
                }
            })
            setRevFormData({
                ...revForm,
                revName: props.currentuser.userName,
                revEmail: props.currentuser.userEmail
            });
        } else {
            setReviewForm(true);
            setRevFormData({
                revName: "",
                revEmail: "",
                detailRev: "",
                quality: "",
                Experience: ""
            });

            db.ref(`all_Products/categories/${prodCate}`).child(prodKey).get().then((data) => {
                if (data.exists()) {
                    if (data.val().prod.reviews) {
                    
                        if (Object.keys(data.val().prod.reviews).length > 0) {
                            setOtherRevs(data.val().prod.reviews)

                        }}}});
        }
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    
    const submitRevForm = (e) => {
        e.preventDefault();
        var dt = new Date();
        var h = dt.getHours(),
            m = dt.getMinutes();
        var time;
        if (h === 12) {
            time = h + ":" + m + " PM";
        } else {
            time = h > 12 ? h - 12 + ":" + m + " PM" : h + ":" + m + " AM";
        }
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        if (Object.keys(props.currentuser).length > 0) {
            if (showRevForm) {
                db.ref(`all_Products/categories/${prodCate}/${prodKey}/prod/reviews`).child(props.currentuser.userUid).set({
                    revName: revForm.revName,
                    revEmail: revForm.revEmail,
                    detailRev: revForm.detailRev,
                    quality: revForm.quality,
                    Experience: revForm.Experience,
                    uid: props.currentuser.userUid,
                    img: props.currentuser.userProfile,
                    curtDate: today
                }).then((data) => {
                    chkOldRev();
                    alert("Your Review has been posted successfully!")
                    setRevFormData({
                        revName: "",
                        revEmail: "",
                        detailRev: "",
                        quality: "",
                        Experience: ""
                    });

                })
            }
        } else {
            openLoginForm();
        }

    };

    const openLoginForm = () => {
        open ? setOpen(false) : setOpen(true);
    };
    const customIcons = {
        1: {
          icon: <SentimentVeryDissatisfiedIcon />,
          label: 'Very Dissatisfied',
        },
        2: {
          icon: <SentimentDissatisfiedIcon />,
          label: 'Dissatisfied',
        },
        3: {
          icon: <SentimentSatisfiedIcon />,
          label: 'Neutral',
        },
        4: {
          icon: <SentimentSatisfiedAltIcon />,
          label: 'Satisfied',
        },
        5: {
          icon: <SentimentVerySatisfiedIcon />,
          label: 'Very Satisfied',
        },
    };
      
    function IconContainer(props) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
    }
      
    return (
        <div className={classes.root} style={{marginBottom: "35px"}}>
            <MultipleLoginForms
                open={open}
                onClose={openLoginForm}
                againopen={openLoginForm}
            />
            <AppBar position="static"style={{ backgroundColor: "#ff5e14"}}>
                <Tabs
                  
                
                    value={value}
                    onChange={handleChange}
                    indicatorColor="#000"
                
                    textColor={"#fff"}
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    centered
                    classes={{
                        indicator: classes.indicator
                      }}
                >
                    <Tab label="DETAILS" {...a11yProps(0)} />
                    <Tab label="INFORMATION" {...a11yProps(1)} />
                    <Tab label="REVIEWS" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel style={{ maxHeight: "100vh", overflowY: "scroll"}} value={value} index={0} dir={theme.direction}>
                    <div className="col-md-6">
                        <h5>{props.details.title}</h5>
                        <p className="mb-2 text-muted text-uppercase small">{props.details.category}</p>

                        <p><span className="mr-1"><strong>RS {props.details.price}</strong></span></p>
                        <p className="pt-1">{props.details.description}</p>
                     
                        <hr />

                    </div>

                </TabPanel>
                <TabPanel style={{ maxHeight: "100vh", overflowY: "scroll"}} value={value} index={1} dir={theme.direction}>
                    <div className="table-responsive">
                        <table className="table table-sm table-borderless mb-0">
                            <tbody>
                                <tr>
                                    <th className="pl-0 w-25" scope="row"><strong>Brand</strong></th>
                                    <td>{props.details.brand}</td>
                                </tr>
                                <tr>
                                    <th className="pl-0 w-25" scope="row"><strong>Condition</strong></th>
                                    <td>{props.details.condition}</td>
                                </tr>
                                <tr>
                                    <th className="pl-0 w-25" scope="row"><strong>Stock</strong></th>
                                    <td>{props.details.stock}</td>
                                </tr>
                                <tr>
                                    <th className="pl-0 w-25" scope="row"><strong>Delivery</strong></th>
                                    <td>All over the Pakistan</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                <TabPanel style={{ maxHeight: "100vh", overflowY: "scroll"}} value={value} index={2} dir={theme.direction}>
                    {showRevForm &&

                        <div className="table-responsive">
                            <h1>Add a review</h1>
                            <p>Your email address will not be published.</p>
                            <br />
                            <form onSubmit={(e) => submitRevForm(e)}>
                                <div className="form-group">
                                    <label for="review">Your Review </label>
                                    <StarRating setRevFormData={setRevFormData} rev={revForm} />

                                </div>
                                <div className="form-group">
                                    <label for="detailRev">Describe in detail </label>
                                    <textarea
                                        onChange={(e) => {
                                            setRevFormData({
                                                ...revForm,
                                                [e.target.name]: e.target.value
                                            })
                                        }}
                                        value={revForm.detailRev}
                                        className="form-control" id="detailRev" rows="4" name="detailRev" required></textarea>

                                </div>
                                <div className="form-group">
                                    <label for="revEmail">Email</label>
                                    <input type="email" className="form-control" id="revEmail"
                                        name="revEmail"
                                        placeholder="Enter email"
                                        onChange={(e) => {
                                            setRevFormData({
                                                ...revForm,
                                                [e.target.name]: e.target.value
                                            })
                                        }}
                                        value={revForm.revEmail}
                                        required
                                    />

                                </div>
                                <div className="form-group">
                                    <label for="revName">Name</label>
                                    <input type="text" className="form-control" id="revName" placeholder="Enter Name"
                                        name="revName"
                                        onChange={(e) => {
                                            setRevFormData({
                                                ...revForm,
                                                [e.target.name]: e.target.value
                                            })
                                        }}
                                        value={revForm.revName}
                                        required
                                    />

                                </div>
                                <div className="form-group">
                                    
                                    <Button type="submit" variant="contained" color="primary" >
                                        Post
                                    </Button>
                                </div>

                            </form>
                           
                        </div>
                    }

                    <>
                    <div className="container-lg">
                        {Object.values(othersRev).length > 0 && <h3>All Reviews</h3>}
                    
                    {Object.values(othersRev).map((v, i) => {
                           return(
                            <div key={i}className="user-prod-review-wrap">

                     
                      
                            <div className="row">
                                <div className="col-6 justify-content-start d-flex ">
                                <Box component="fieldset" mb={0} borderColor="transparent">
               <Typography component="legend">Experience </Typography>
               <Typography component="legend">{customIcons[v.Experience ? v.Experience : 5 ].label}</Typography>
               <Rating name="read-only" value={v.Experience} readOnly  IconContainerComponent={IconContainer}/>
             </Box>
                                </div>
                                <div className="col-6 justify-content-end d-flex">
                                <Box component="fieldset" mb={1} borderColor="transparent">
               <Typography component="legend">Quality</Typography>
               <Rating  precision={0.5} name="read-only" value={v.quality} readOnly />
             </Box>
                                </div>
  
                                <div className="col-12">
                                    <Typography component="h4" variant="h5">
                                    {
                                        v.img ?  <img
                                        src={v.img}
                                        alt="USER profile image"
                                        className="Menu-profileimg"
                                     
                                      />
                                      :     <AccountCircle/>
                                    }
                               
                                      {v.revName}<CheckCircleIcon style={{color: "green", fontSize: "16px", marginLeft: "7px"}}/>
                                      {props.currentuser.userUid === v.uid &&
                                      <><DonutLargeIcon style={{color: "ff923c",fontSize: "16px"}}/> <span  style={{color: "ff923c",fontSize: "14px"}}>my</span></>}
                                      
                                    </Typography>
                                    <Typography component="p" variant="p">
                                    {v.detailRev}
                                    </Typography>
                                </div>
                                <div className="col-12 d-flex  justify-content-end  ">
                                    <Typography component="span" variant="span">
                                       {v.curtDate}
                                    </Typography>
                                    
                                </div>
                            </div>
                         
                                   
                          
                           </div>
       
                           )  
                        })}
                </div>
                    </>

                </TabPanel>
            </SwipeableViews>
            
        </div>
    );
}
const mapStateToProps = (store) => ({
    allProducts: store.allProducts,
    currentuser: store.currentuser,
});
export default withRouter(connect(mapStateToProps, null)(ProductDetailTabs));