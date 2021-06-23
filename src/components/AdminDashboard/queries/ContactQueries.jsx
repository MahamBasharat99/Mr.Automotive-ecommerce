import React, { useEffect, useState } from 'react'
import firebase from "../../../config/firebase";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles"; import RefreshRounded from "@material-ui/icons/RefreshRounded"; 
import Loader2 from "../../Others/Loader2";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "lef",
        color: theme.palette.text.secondary,
        minHeight: "180px",
        "&:hover": {
            boxShadow: "5px 5px 15px #00000053",
            transition: ".3s ease-in",

        }
    },
    table: {
        minWidth: 700,
    },
    container: {
        maxHeight: 800,
        width: "100%",
    },
    media: {
        height: "50px",
        width: "50px",
        borderRadius: "50%",
    },
    appBar: {
        position: "relative",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));


const ContactQueries = (props) => {
    const [contacts, setContacts] = useState()
    useEffect(() => {
        firebase.database().ref('contactQueires').on('child_added', (data) => {
            setContacts(Object.values(data.val()))
        })
    }, [])
    return (
        <div>
            <CustomizedTables contacts={contacts} />
        </div>
    )
}
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function CustomizedTables(props) {
    const classes = useStyles();

    return (
        <>
            <TableContainer component={Paper} className={classes.container}>
                <Table
                    stickyHeader
                    className={classes.table}
                    aria-label="customized table"
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell align="left">Message</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.contacts ?
                            <>
                                {props.contacts.map((ct, i) => {
                                    return (
                                        <StyledTableRow key={i}>
                                            <StyledTableCell component="th" scope="row">
                                                {ct.Name}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                {ct.email}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{ct.Message}</StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })}
                            </>
                            :
                            <Loader2 />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}



const mapStateToProps = (store) => ({
    allProducts: store.allProducts,
    currentuser: store.currentuser,
});

export default connect(mapStateToProps, null)(ContactQueries);
