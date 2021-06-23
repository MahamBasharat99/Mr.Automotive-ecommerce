import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {FcPackage,FcList, FcShop} from "react-icons/fc";
import {Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
    cursor: "pointer"
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));



const IconBreadcrumb = (props) => {
  const classes = useStyles();
  return (
   <>
  
    <Breadcrumbs aria-label="breadcrumb" style={{zIndex: "999999 !important" }}>
      {props.Shop &&
      <Link color="inherit"   className={classes.link} to={{ pathname: "/Shop"}}>
        <FcShop className={classes.icon} />
        {props.Shop}
        
      </Link>
      }
       {props.AllProd &&
      <Link
        color="inherit"
        to={{ pathname:"/Shop"}}
        className={classes.link}
      >
        <FcList className={classes.icon} />
        {props.AllProd}
      </Link>
      }
       {props.cate &&
      <Link
        color="inherit"
        to={{ pathname: `/Shop/${props.cate}` }}
        params={{ category: `${props.cate}` }}
        className={classes.link}
      >
        <FcList className={classes.icon} />
        {props.cate}
      </Link>
      }
       {props.item &&
      <Link
        color="inherit"
        to={{ pathname: `/Shop/${props.cate}/${props.item}` }}
        params={{ category: `${props.item}` ,id:props.item}}
        className={classes.link}
      >
        <FcPackage className={classes.icon} />
        {props.item}
      </Link>
      }
     
    </Breadcrumbs>
    </>
  );
}

export default IconBreadcrumb;