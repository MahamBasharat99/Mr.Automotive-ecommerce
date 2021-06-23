import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CompletedOrders from "./CompletedOrders";
import NewOrders from "./NewOrders";
import AllOrders from "./AllOrders";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {get_All_Orders} from "../../../store/action/action";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    indicator: {
        backgroundColor: '#ff5e14 !important',
      },
}));

const ManageOrders = (props) => {
    useEffect(() => {
        props.get_All_Orders();
    },[])
    return (
        <div>
            <SimpleTabs />
        </div>
    )
}
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
            <AppBar position="static" style={{backgroundColor: "#000"}}>
                <Tabs
                  
                  classes={{
                    indicator: classes.indicator
                  }}
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <Tab label="New Orders" {...a11yProps(0)} />
                    <Tab label="Completed Orders" {...a11yProps(1)} />
                    <Tab label="All Orders" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <NewOrders />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CompletedOrders />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AllOrders/>
            </TabPanel>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    get_All_Orders: () => dispatch(get_All_Orders()),
})

export default withRouter(connect(null, mapDispatchToProps)(ManageOrders));
