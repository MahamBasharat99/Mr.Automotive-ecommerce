import React, { useEffect, useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { Store } from "@material-ui/icons";
import firebase from "../../config/firebase";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { BiLoader } from "react-icons/bi";
import { FaStore } from "react-icons/fa";
import { GiCartwheel } from "react-icons/gi";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { GrAruba } from "react-icons/gr";
import { SiMicrosoftaccess } from "react-icons/si";
import { FcTodoList } from "react-icons/fc";
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: "#ff5e14",
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
    '& .MuiListItemIcon-root ,  svg ': {
      minWidth: 'max-content !important',
      paddingLeft: "0",
      fontSize: "20px",
      marginRight: "7px"
    },
    // minWidth: "100%"
  },
}))(MenuItem);
function DropDownCate(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, [props.allProducts])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getCategories = () => {
    let cats = []
    firebase.database().ref('all_Products').on('child_added', (data) => {
      cats.push(data.val())
      setCategories(cats)
    });
  }

  return (
    <div>
      {props.Mobile ?
      <MenuItem component={Link} className={props.className} aria-controls="shop" aria-haspopup="true" onClick={(e)=> {handleClick(e)}}>
          <FaStore />
        <p>Shop</p>
      </MenuItem> 
      :
      <IconButton aria-controls="shop" aria-haspopup="true" onClick={handleClick} className={props.className}>
        <Store />
      </IconButton>}

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={ (e)=>{handleClose(e); props.handleMobileMenuClose &&  props.handleMobileMenuClose()}}
      >
        <StyledMenuItem component={Link} to={{ pathname: `/Shop/` }} onClick={ (e)=>{handleClose(e); props.handleMobileMenuClose &&  props.handleMobileMenuClose()}}>
          <ListItemIcon>
            <FaStore fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Shop" />
        </StyledMenuItem>
        {Object.keys(categories).length > 0 ?
          Object.keys(categories[0]).length > 0 && Object.keys(categories[0]).map((categoryName, ind) => {
            return (
              <StyledMenuItem component={Link} key={ind}
                to={{ pathname: `/Shop/${categoryName}` }}
                params={{ category: `${categoryName}` }} style={{ textDecoration: "none", color: "#000" }} onClick={ (e)=>{handleClose(e); props.handleMobileMenuClose &&  props.handleMobileMenuClose()}}>
                {categoryName === "Bearing" && <ListItemIcon>
                  <GiCartwheel fontSize="small" />
                </ListItemIcon>}
                {categoryName === "OtherItems" && <ListItemIcon>
                  <SiMicrosoftaccess fontSize="small" />
                </ListItemIcon>}
                {categoryName === "Seal" && <ListItemIcon>
                  <BiBriefcaseAlt2 fontSize="small" />
                </ListItemIcon>}
                {
                  categoryName == "Tubes" &&
                  <ListItemIcon>
                    <GrAruba fontSize="small" />
                  </ListItemIcon>
                }
                <ListItemText primary={categoryName} />
              </StyledMenuItem>

            )
          })
          :
          <StyledMenuItem onClick={ (e)=>{handleClose(e); props.handleMobileMenuClose &&  props.handleMobileMenuClose()}}>
            <ListItemIcon>
              <BiLoader fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Loading..." />
          </StyledMenuItem>

        }
      </StyledMenu>
    </div>
  );
};


const mapStateToProps = (store) => ({
  currentuser: store.currentuser,
  allProducts: store.allProducts,
});


export default connect(mapStateToProps, null)(withRouter(DropDownCate));
