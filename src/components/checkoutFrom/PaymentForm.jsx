import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export default function PaymentForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
               required={true}
            id="cardName"
            label="Name on card"
            name="NameOnCard"
            fullWidth
            autoComplete="cc-name"
            onChange={(e)=>{props.fillForm(e)}}
            value={props.formData.NameOnCard}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required={true}
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            onChange={(e)=>{props.fillForm(e)}}
            value={props.formData.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required={true}
            id="expDate"
            name="ExpiryDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            onChange={(e)=>{props.fillForm(e)}}
            value={props.formData.ExpiryDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required={true}
            id="cvv"
            name="CVV"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            onChange={(e)=>{props.fillForm(e)}}
            value={props.formData.CVV}
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}
