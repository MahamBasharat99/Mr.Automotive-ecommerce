import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import MultipleLoginForms from "./MulipleLoginForms";

export default function FormModel(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleClickOpen}
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        style={{ margin: "15px 2px auto 0" }}
      >
        {props.name}
      </Button>
      {/* <Button color="inherit">Login</Button> */}
      <MultipleLoginForms
        open={open}
        onClose={handleClose}
        againopen={handleClickOpen}
        closemsg={props.closemsg}
        showmsg={props.showmsg}
      />
    </div>
  );
}
