import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function AddressForm(props) {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="userName"
            name="userName"
            label="User Name"
            fullWidth
            autoComplete="off"
            onChange={(e)=>{props.fillForm(e)}}
            value={props.formData.userName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="off"
            onChange={(e)=>{props.fillForm(e)}}
            value={props.formData.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={(e)=>{props.fillForm(e)}}
            value={props.formData.address1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2 (optional)"
            fullWidth
            autoComplete="shipping address-line2"
            onChange={(e)=>{props.fillForm(e)}}
            value={props.formData.address2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={(e)=>{props.fillForm(e)}}
            value={props.formData.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            onChange={(e)=>{props.fillForm(e)}}
            value={props.formData.state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            onChange={(e)=>{props.fillForm(e)}}
            value={props.formData.zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            defaultValue={props.formData.country}
            readOnly={true}
            disabled={true}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
