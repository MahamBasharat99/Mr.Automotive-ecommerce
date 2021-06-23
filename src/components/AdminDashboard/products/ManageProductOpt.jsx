import React,{useEffect,useState} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EditProd from "./EditProd";
import PostNewProd from "./postNewProd";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    backgroundColor: '#ff5e14 !important',
  },
}));

const ManageProductOpt = () => {
  return (
    <>
      <SimpleTabs />
    </>
  );
};

export default ManageProductOpt;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
;

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        {/* ///////////////////////////////////////// */}
        <Tabs
          style={{backgroundColor: "#000"}}
        classes={{
          indicator: classes.indicator
        }}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Add New" {...a11yProps(0)} />
          <Tab label="Update Product" {...a11yProps(1)} />
         
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PostNewProd />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EditProd />
      </TabPanel>
    </div>
  );
}
