import React from 'react';
import {IconButton} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {withRouter} from "react-router-dom";

const GoBackBtn = (props) => {
    const {home, shop, shopCate, shopCateItm} = props;
    return (
        <div>
            {home &&
            <IconButton color="primary" onClick={()=> props.history.push("/Home")}><ArrowBackIcon/></IconButton>  
            }
            {shop &&
            <IconButton color="primary" onClick={()=> props.history.push("/Shop")}><ArrowBackIcon/></IconButton>  
            }
          {shopCateItm && 
            <IconButton color="primary" onClick={()=> props.history.push(`/Shop/${shopCateItm}`)}><ArrowBackIcon/></IconButton>  
            }
        </div>
    )
}

export default withRouter(GoBackBtn);

