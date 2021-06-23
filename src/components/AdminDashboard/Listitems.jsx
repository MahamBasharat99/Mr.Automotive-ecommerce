import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ListAltIcon from "@material-ui/icons/ListAlt";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Divider from "@material-ui/core/Divider";
import { MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PageviewIcon from "@material-ui/icons/Pageview";
import {MdContactPhone} from "react-icons/md";
import {GrMail} from "react-icons/gr";

import { AccountBoxOutlined, ChatSharp } from "@material-ui/icons";
import { FaBoxOpen } from "react-icons/fa";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

}));
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function Listitems(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [selected, setSelected] = React.useState({ selected: null });

  const updateSelect = (selectedIndex) => {
    setSelected({ selected: selectedIndex });
  };
  return (
    <div>
      <Tabs 
      
        orientation="vertical"
        variant="scrollable"
        value={props.value}
        onChange={props.handleChange}
        aria-label="Vertical tabs example"
        variant="fullWidth"
        indicatorColor="secondary"
        TabIndicatorProps={{style: {background:'#ff5e14'}}}
        textColor="primary"
      >
        <Tab
          className="sidebarTabs"
          icon={<DashboardIcon />}
          label={props.ckopn ? "Dashboard" : ""}
          style={{ textDecoration: "none", color: "#fff" }}
          
        />
        <Tab
          style={{ textDecoration: "none", color: "#fff" }}
          className="sidebarTabs"
          icon={<AccountBoxOutlined />}
          label={props.ckopn ? "products" : ""}
        />
        <Tab
          style={{ textDecoration: "none", color: "#fff" }}
          className="sidebarTabs"
          icon={<PeopleIcon />}
          label={props.ckopn ? "users" : ""}
        />
        <Tab
          style={{ textDecoration: "none", color: "#fff" }}
          className="sidebarTabs"
          icon={<FaBoxOpen />}
          label={props.ckopn ? "Orders" : ""}
        />
        <Tab
          style={{ textDecoration: "none", color: "#fff" }}
          className="sidebarTabs"
          icon={<MdContactPhone />}
          label={props.ckopn ? "Contact" : ""}
        />
        <Tab
          style={{ textDecoration: "none", color: "#fff" }}
          className="sidebarTabs"
          icon={<ChatSharp />}
          label={props.ckopn ? "Queries" : ""}
        />
        <Tab
          style={{ textDecoration: "none", color: "#fff" }}
          className="sidebarTabs"
          icon={<GrMail />}
          label={props.ckopn ? "NewsLetter" : ""}
        />
      </Tabs>
      <Divider />
      <List>
        <MenuItem
          style={{ textDecoration: "none", color: "#fff" }}
          component={Link}
          to="/"
          button
          onClick={() => updateSelect(0)}
          selected={selected.selected === 0}
          className="sidebarTabs"
        >
          <ListItemIcon style={{ textDecoration: "none", color: "#fff" }}>
            <PageviewIcon />
          </ListItemIcon>
          <ListItemText>View Web</ListItemText>
        </MenuItem>

      </List>
    </div>
  );
}
