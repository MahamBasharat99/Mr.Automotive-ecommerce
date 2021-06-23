import ClearIcon from "@material-ui/icons/Clear";
import React, {  useState, forwardRef } from "react";
import IconButton from "@material-ui/core/IconButton"
import firebase from "../../../config/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DoneAllIcon from "@material-ui/icons/DoneAll";


function PostNewProd(props) {
  const [openOkMsg,setopenOkMsg] = useState(false);
  const [prodData, setProdData] = useState({
    title: "",
    description: "",
    price: "",
    productImgs: {
      img1: {},
      img2: {},
      img3: {},
    },
    condition: "",
    brand: "",
    category: "",
    stock: 1
  });
  const [categories, setCategories] = useState([
    "Seal",
    "Spring",
    "Cables",
    "Tubes",
    "Bearing",
    "OtherItems"
  ])
  var ImgName,
    reader,
    files = [];

  function selectImg(e, imgno) {
    e.preventDefault();
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      files = e.target.files;
      var name = "img" + imgno;
      let old = prodData.productImgs;
      setProdData({
        ...prodData,
        productImgs: { ...old, [name]: files[0] },
      });

      reader = new FileReader();
      reader.onload = function () {
        document.getElementById(`productImg${imgno}`).src = reader.result;
      };
      reader.readAsDataURL(files[0]);
    };
    input.click();
  }

  function removeImg(imgno) {
    document.getElementById(`productImg${imgno}`).src = "";
    let old = prodData.productImgs;
    let name = "img" + imgno;
    setProdData({
      ...prodData,
      productImgs: { ...old, [name]: {} },
    });
  }

  function uploadImg(file, i) {
    
    let loadingDiv = document.getElementById("uploadingloaderwrapper");
    return new Promise((resolve, reject) => {
      let task;
      var storageRef = firebase.storage().ref("store-images/" + file[i].name);
      task = storageRef.put(file[i]);

      task.on(
        "state_changed",
        function progress(snapshot) {
          var percentage = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          loadingDiv.innerHTML = `<h1>Loading... <br/> ${percentage}%</h1>`;

          // use the percentage as you wish, to show progress of an upload for example
        }, // use the function below for error handling
        function (error) {
          console.log(error);
          alert(error.message);
        },
        function complete() {
          //This function executes after a successful upload
          task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            resolve(downloadURL);
            loadingDiv.innerHTML = "";
            // loadingDiv.innerHTML = "";
           
            return downloadURL
          });
        }
      );
    });
  }
  // New Ad post function with Image
  async function uploadNewProduct(e) {
    e.preventDefault();
   
    let k = [];
    let imgUrls = [];
    for (var i = 0; i < 3; i++) {
      k.push(Object.entries(prodData.productImgs)[i][1]);
      let c = k[i];
      let d =[];

      if(c.name){
        imgUrls.push(await  uploadImg(k, i)) 
     
      }

     if(i === 2){/////////////////////////////////////////////////////////

        // getting currenty data
        var date = new Date();
        var month = [];
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "Aug";
        month[8] = "Sepr";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        var n = month[date.getMonth()];
        var todayDate = date.getDate();
        var currentYear = date.getFullYear();
        var postdate = todayDate + " " + n + " " + currentYear;

        // uploading to Database

//here if no brand is introduce then it include to otheritems
        if (prodData.category.trim().length === 0) {
          let key = firebase.database().ref(`all_Products/categories/${categories[5]}`).push().key;
          let prod = {
            key: key,
            title: prodData.title,
            description: prodData.description,
            price: prodData.price,
            imgs: imgUrls,
            postdate: postdate,
            condition: prodData.condition.trim().length === 0 ? "Not Defined": prodData.condition,
            brand: prodData.brand.trim().length === 0 ? "No Brand" : prodData.brand,
            category: "OtherItems",
          };
          firebase.database().ref(`all_Products/categories/${categories[5]}`).child(key).set({ prod });
          setProdData({
            ...prodData,
            title: "",
            description: "",
            price: "",
            condition: "",
            brand: "",
            productImgs: {
              img1: {},
              img2: {},
              img3: {},
            },
           

          });
          showOkMsgDialog()
          // Specific category item is saved
        } else {
          let key = firebase.database().ref(`all_Products/categories/${prodData.category}`).push().key;
          let prod = {
            key: key,
            title: prodData.title,
            description: prodData.description,
            price: prodData.price,
            imgs: imgUrls,
            postdate: postdate,
            condition: prodData.condition.trim().length === 0 ? "Not Defined": prodData.condition,
             brand: prodData.brand.trim().length === 0 ? "No Brand" : prodData.brand,
            category: prodData.category,
          };
          firebase.database().ref(`all_Products/categories/${prodData.category}`).child(key).set({ prod });
          setProdData({
            ...prodData,
            title: "",
            description: "",
            price: "",
            condition: "",
            brand: "",
            productImgs: {
              img1: {},
              img2: {},
              img3: {},
            },
       
          });
          
          showOkMsgDialog()
        }

      }

      
    }
  }
  
  const handleOkMsgopen = () => {
    setopenOkMsg(true);
  };

  const handleOkMsgClose = () => {
    setopenOkMsg(false);
  };

  function showOkMsgDialog (){
    handleOkMsgopen();
    setTimeout(()=>{
      handleOkMsgClose()
    },3000)
  }
  return (
    <div>
 
      <div id="uploadingloaderwrapper"></div>
      <div className="">
        <div className="my_row">
          <div className="post_container">
            <div className="post_top">
              <h2>ADD NEW PRODUCT</h2>
            </div>
            <div className="post_body">
              <form
                action=""
                onSubmit={(e) => uploadNewProduct(e)}
                method="POST"
              >
                <div className="post_detailBox">
                  <br></br>
                  <h3>INCLUDE SOME DETAILS</h3>
                </div>
                <div className="post_detailBox">
                  <label htmlFor="title">Product title *</label>
                  <input
                    name="title"
                    value={prodData.title}
                    onChange={(e) =>
                      setProdData({ ...prodData, title: e.target.value })
                    }
                    type="text"
                    placeholder="Enter Title"
                  />
                  <span>
                    Mention the key features of your item (e.g. brand, model,
                    age, type)7 / 70
                  </span>
                </div>
                <div className="post_detailBox ">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    name="description"
                    value={prodData.description}
                    onChange={(e) =>
                      setProdData({ ...prodData, description: e.target.value })
                    }
                    type="text"
                    placeholder="Enter Short Description"
                  />
                </div>
                <div className="post_detailBox">


                  <label htmlFor="price" >
                    Make (comapny or Brand name)*  <br/><br/>
                    <input className="data-list-for-brand" list="brands"  placeholder="Select Brand " onChange={(e) =>setProdData({ ...prodData, brand: e.target.value })}/>
                  {/* ///list define datalist */}
                  </label>
                  <datalist id="brands" >
                    <option value="No Brand"></option>
                    <option value="Panther"></option>
                    <option value="Service"></option>
                    <option value="Super Star"></option>
                    <option value="Honda"></option>
                    <option value="CD 70"></option>
                  </datalist>
                </div>
                <div className="post_detailBox postsecDivider">

                  <label htmlFor="condition">Condition * (New or Used)</label>


                  <div className="form-check form-check-inline mt-3">
                    <input
                      name="condition"
                      value="New"
                      id="New"
                      onChange={(e) =>
                        setProdData({ ...prodData, condition: e.target.value })
                      }
                      type="radio"
                      placeholder="Enter condition"
                      className="form-check-input"
                    />
                    <label htmlFor="New" className="form-check-label">New</label>



                    <input
                      name="condition"
                      value="Used"
                      id="Used"
                      onChange={(e) =>
                        setProdData({ ...prodData, condition: e.target.value })
                      }
                      type="radio"
                      placeholder="Enter condition"
                      className="form-check-input ml-2"
                    /><label htmlFor="Used" className="form-check-label ">Used</label>
                  </div>
                </div>

                <div className="post_detailBox">
                  <h3>SELECT A CATEGORY</h3>
                </div>
                <div className="post_detailBox form-group  postsecDivider">
                  <label htmlFor="price">Categories*</label>
                  <select className="form-control" onChange={(e) =>
                    setProdData({ ...prodData, category: e.target.value })} >
                    {categories.map((category, index) => {
                      return (
                        <option value={category} key={index}> {category} </option>
                      )
                    })}

                  </select>
                </div>

                <div className="post_detailBox">
                  <h3>SET  PRICE</h3>
                </div>
                <div className="post_detailBox postsecDivider">

                  <div className="input-group mb-2 " style={{ width: "95%", }}>
                    <div className="input-group-prepend" >
                      <div class="input-group-text" style={{ borderColor: "#00a49f", background: "#00a49f", color: "#fff", fontWeight: "800" }}>RS</div>
                    </div>
                    <input className="form-control m-0 "
                      name="price"
                      value={prodData.price}
                      onChange={(e) =>
                        setProdData({ ...prodData, price: e.target.value })
                      }
                      type="number"
                      placeholder="Price"
                      min="1"
                      style={{
                        borderColor: "#00a49f", boxShadow: "none"
                      }}
                    />
                  </div>
                </div>
                <div className="post_detailBox">
                  <h3>Add  Stock</h3>
                </div>
                <div className="post_detailBox postsecDivider">

                  <div className="input-group mb-2 " style={{ width: "95%", }}>
                    <div className="input-group-prepend" >
                      <div class="input-group-text" style={{ borderColor: "#ff5e14", background: "#ff5e14", color: "#fff", fontWeight: "800" }}>Qtn</div>
                    </div>
                    <input className="form-control m-0 "
                      name="stock"
                      value={prodData.stock}
                      onChange={(e) =>
                        setProdData({ ...prodData, stock: e.target.value })
                      }
                      type="number"
                      placeholder="Stock"
                      min="1"
                      style={{
                        borderColor: "#ff5e14", boxShadow: "none"
                      }}
                    />
                  </div>
                </div>

                <div className="post_detailBox">
                  <h3>UPLOAD PRODUCT IMAGES (required)</h3>
                </div>
                <div className="post_detailBox postsecDivider prodImgwrapper">
                  <div className="SelectprodImgWrapper">
                    <button
                      className="imgSelbtn"
                      onClick={(e) => selectImg(e, 1)}
                    >
                      {prodData.productImgs.img1.name ? (
                        <img
                          id="productImg1"
                          className="formProdimg"
                          alt="product img"
                        />
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

                    {prodData.productImgs.img1.name ? (
                      <ClearIcon
                        onClick={() => removeImg(1)}
                        className="removeimg"
                      />
                    ) : null}
                  </div>
                  <div className="SelectprodImgWrapper">
                    <button
                      className="imgSelbtn"
                      onClick={(e) => selectImg(e, 2)}
                    >
                      {prodData.productImgs.img2.name ? (
                        <img
                          id="productImg2"
                          className="formProdimg"
                          alt="product img"
                        />
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
                    {prodData.productImgs.img2.name ? (
                      <ClearIcon
                        onClick={() => removeImg(2)}
                        className="removeimg"
                      />
                    ) : null}
                  </div>
                  <div className="SelectprodImgWrapper">
                    <button
                      className="imgSelbtn"
                      onClick={(e) => selectImg(e, 3)}
                    >
                      {prodData.productImgs.img3.name ? (
                        <img
                          id="productImg3"
                          className="formProdimg"
                          alt="product img"
                        />
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
                    {prodData.productImgs.img3.name ? (
                      <ClearIcon
                        onClick={() => removeImg(3)}
                        className="removeimg"
                      />
                    ) : null}
                  </div>
                </div>

                <div className="post_detailBox ">
                  {prodData.price &&
                    prodData.description &&
                    prodData.title &&
                    prodData.productImgs.img1 ? (
                    <button className="postBtn">
                      Post Now
                      {/* <span id="Upprogress"></span> */}
                    </button>
                  ) : (
                    <button className="postBtnnot">Post Now</button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog open={openOkMsg} Close={handleOkMsgClose} />
    </div>
  );
}
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
/////Click on add product msg is shown
const ConfirmDialog = (props) => {
  const {open, Close} = props

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={Close}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
       
        <DialogTitle id="alert-dialog-slide-title">{"Hurry !"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Product Added to the Shop Successfully !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
          <IconButton
            color="primary"
            onClick={props.Close}
          >
            <DoneAllIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};


export default PostNewProd;
