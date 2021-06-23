import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();

  let price =[];
  return (

    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {Object.values(props.cartData.prddd).map((product,i) => (
          <ListItem className={classes.listItem} key={i}>
            <ListItemText className="reviewDetailsItemList" primary={product.prod.title.slice(0, 20)} secondary={product.prod.category} />
            <ListItemText className="reviewDetailsItemList" primary={"Price"} secondary={product.prod.price} />
            <ListItemText className="reviewDetailsItemList" primary={"Quantity"} secondary={props.cartData.qtn[i]} />
            <ListItemText className="reviewDetailsItemList" style={{fontWeight: "900 !important"}} subtitle1 primary={"x"} secondary={""} />
            <Typography variant="subtitle1">{parseInt(product.prod.price) * props.cartData.qtn[i]}</Typography>
            <div style={{display: "none"}}> {price.push(parseInt(product.prod.price) * props.cartData.qtn[i])}</div>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText className="reviewDetailsItemList" primary="Total" />
         
          <Typography variant="subtitle1" className={classes.total}>
           {  price.length > 0 ?
                          price.reduce((a, b) => a + b, 0)


                          : " 00"}
          </Typography>
         
       
        </ListItem>
        <ListItem className={classes.listItem}> 
        <ListItemText className="reviewDetailsItemList" primary="Ship Fee" />    
        <Typography variant="subtitle1" className={classes.total}>
           50
          </Typography>
         
          </ListItem>
  
        <ListItem className={classes.listItem}> 
        <ListItemText className="reviewDetailsItemList" primary="Total Price" />    
        <Typography variant="subtitle1" className={classes.total}>
           RS : {  price.length > 0 ?
                          price.reduce((a, b) => a + b, 0) + 50


                          : " 00"}
                          
          </Typography></ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{props.formData.userName}</Typography>
          <Typography gutterBottom>{props.formData.address1}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
         
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card holder</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.formData.NameOnCard}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card number</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.formData.cardNumber}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom>Expiry date</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.formData.ExpiryDate}</Typography>
                </Grid>
              </React.Fragment>
            
           
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
