import React, { useEffect, useState,forwardRef, useRef } from 'react'
import firebase from "../../../config/firebase";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles"; import RefreshRounded from "@material-ui/icons/RefreshRounded"; 
import Loader2 from "../../Others/Loader2";
import  IconButton  from '@material-ui/core/IconButton';
import {FaArrowDown, FaArrowLeft, FaPaperPlane, FaTrashAlt} from "react-icons/fa"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../../assets/css/chat.css";
import unknownImg from "../../../assets/images/unkownUser.png";
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "lef",
        color: theme.palette.text.secondary,
        minHeight: "180px",
        "&:hover": {
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

const Queries = (props) => {
    const [chatUsersKeys,setAllChatUsersKeys] = useState();
    const [chatUser,setChatUser] = useState();
    const [chatTab,setOpenChatTab] = useState(false);
    const [showloader,setShowloader] = useState(true);
    const [chatUserKey,setChatUserKey] = useState();
    const [userMeta,setUserMeta] = useState();
    const [msg,setMsg] = useState();


    useEffect(() => {
        getData()
    }, []);

    function getData(){
        firebase.database().ref('quickHelp').once('value').then((data)=>{
            if(data.exists()){
                setAllChatUsersKeys(Object.keys(data.val()))
            }else{
                setShowloader(false);
            }
        })
    }

    const openChat = (id) =>{
        setOpenChatTab(true);
        setChatUserKey(id)
        getOldChats(id);
    }

    const getOldChats = (id) =>{
        // db.ref('quickHelp').child(id).get().then((oldData)=>{
        //     if(oldData.exists()){
        //         setChatUser(Object.values(oldData.val()))
        //     }
        // })
        let ct = [];
        db.ref('quickHelp').child(id).on('child_added', (data)=>{
          ct.push(data.val())
          setChatUser(ct)
        })
        db.ref('users').child(id).get().then((userMeta)=>{
            if(userMeta.exists()){
                setUserMeta(userMeta.val());
                bringDownToChats()
            }
        })
     
    }
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

    const sendMsg = (e) => {
        e.preventDefault();
        if(msg){
          if(chatUserKey){
            db.ref('quickHelp').child(chatUserKey).push({
                message: {
                    msg,
                    sentTime: time,
                    curtDate: today
                },
                senderDetails: {
                    sentBy: "Help & Support",
                    senderEmail: "",
                    uid: "",
                },
                userMsg: false
            }).then(()=>{
                setMsg("");
                bringDownToChats();
            })
        }
        }else{
          alert("Msg field is empty !")
        }
    }

    const chatScreen = useRef();
    const btm = useRef();
  
    const bringDownToChats = (params) => {
      if (params === 1) {
        chatScreen.current.scrollTop =
          chatScreen.current.clientHeight + chatScreen.current.scrollHeight;
      } else {
        setTimeout(() => {
          if (chatScreen.current !== undefined && chatScreen.current !== null) {
            chatScreen.current.scrollTop =
              chatScreen.current.clientHeight + chatScreen.current.scrollHeight;
          }
        }, 250);
      }
    };
    const showGoToBottom = () => {
      const height = chatScreen.current.scrollHeight;
      const top = chatScreen.current.scrollTop;
      const client = chatScreen.current.clientHeight;
  
      // console.log(height - top, "===", client);
      if (height - top > client + 150) {
        btm.current.classList.add("show-btmc");
      } else {
        btm.current.classList.remove("show-btmc");
      }
    };
    return (
        <div>
            {chatTab ?
            <div className="chat-screen">
              <div className="chat-screen-top">
                <div className="other-user-meta">
                <IconButton color="secondary" onClick={()=> setOpenChatTab(false)}><FaArrowLeft/></IconButton>
                {userMeta ? 
                userMeta.userProfile ?
                <img
                src={userMeta.userProfile}
                alt={userMeta.userName}
              />
                : <img src={unknownImg} alt="unkown user" />
                  : <img src={unknownImg} alt="unkown user" />
                }

                  <h3>
                    {userMeta ? userMeta.userName
                      ? userMeta.userName
                      : userMeta.userEmail ? userMeta.userEmail : "Unkown User" : null}
                  </h3>
                </div>
                <div>
                  <button className="delAll-btn">
                    {/* <FaTrashAlt/> */}
                    <ConfirmDialog  id={chatUserKey} getAgainChats={getData}/>
                  </button>
                </div>
              </div>
              <div className="chat-board">
                <div
                  className="btmCt"
                ref={btm}
                  onClick={() => bringDownToChats(1)}
                >
                <FaArrowDown/>
                </div>
                <ul ref={chatScreen} onScroll={showGoToBottom}>
                {chatUser &&
                    chatUser.length !== 0 ?
                    chatUser.map((data,i)=>{
                          
                          return(
                            data && 
                          data.userMsg ? 
                          <li className="other">
                              {data.message.msg}
                          </li>
                              :
                          <li className="me">
                                  {data.message.msg}
                          </li>
                          )
                    })                  
                     :
                     <>
                    <h3>Type a message and </h3>
                     <br />
                     <h2>
                       Start conversation with
                       <span>{userMeta && userMeta.userName ? userMeta.userName : "No Name (name is not set)"}</span>
                     </h2>
                    </>
                    }
                </ul>
                <div className="send-chat-area">
                  <form onSubmit={(e)=> sendMsg(e)}>
                    <div className="send-msg-field">
                      <input
                        type="text"
                        name="msg"
                        id="message"
                        placeholder="Type a message..."
                        autoComplete="off"
                        contenteditable="true"
                        onChange={(e)=> setMsg(e.target.value)} value={msg}
                      />
                      <button  type="submit" className="send-msg-btn">
                       <FaPaperPlane/>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
        </div>
           : <CustomizedTables loader={showloader} userKeys={chatUsersKeys} openChatTab={openChat} getData={getData}/>}
        </div>
    )
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

    const chatWithUser = (id) => {
        props.openChatTab(id);
    }

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
                            <StyledTableCell>Chat User</StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                            <StyledTableCell>Chat</StyledTableCell>
                            <StyledTableCell>Remove</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.userKeys ?
                            <>
                                {props.userKeys.map((ct, i) => {
                                    return (
                                        <StyledTableRow key={i}>
                                            <StyledTableCell component="th" scope="row">
                                                {ct}
                                            </StyledTableCell>
                                            <StyledTableCell align="left"></StyledTableCell>
                                            <StyledTableCell align="left"></StyledTableCell>
                                            <StyledTableCell align="left">
                                                <IconButton color="primary" onClick={()=> chatWithUser(ct)}>
                                                    <FaPaperPlane/>
                                                </IconButton>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                            <ConfirmDialog  id={ct} getAgainChats={props.getData}/>
                                            </StyledTableCell>
                                           
                                        </StyledTableRow>
                                    );
                                })}
                            </>
                            : props.loader ? 
                                <Loader2 />
                                : <h3>No chats Found!</h3>
                            
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}


const ConfirmDialog = (props) => {
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const deleteUser = (id) => {
      if (id) {
        db.ref('quickHelp')
          .child(id)
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              handleClose();
              db.ref('quickHelp').child(id).remove();
              props.getAgainChats();
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
          <FaTrashAlt />
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
              Are you sure you want to delete this Chat?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <IconButton color="primary" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => deleteUser(props.id)}
            >
              <DoneAllIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      </>
    );
  };


const mapStateToProps = (store) => ({
    allProducts: store.allProducts,
    currentuser: store.currentuser,
});

export default connect(mapStateToProps, null)(Queries);
