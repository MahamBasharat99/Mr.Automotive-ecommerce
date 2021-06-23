import React, { useState } from 'react';
import { FaChevronUp } from "react-icons/fa"
import { withRouter } from 'react-router';

const GoToTOp = (props) => {
    const [show, setShow] = useState(false);
    const classes = {
        GotoTop: {
            position: "fixed",
            bottom: "15px",
            right: "25px",
            textAlign: "center", borderRadius: "50%", width: "50px", height: "50px", color: "#fff", backgroundColor: "#ff5e14",
            border: "none", ouline: "none",
            zIndex: 9999
        }
    }

    function changeContactBg() {
        if (window.scrollY > window.innerHeight) {
            setShow(true);
        } else {
            setShow(false);
        }

    }
    window.addEventListener('scroll', changeContactBg);
    return (
        <div>{
            props.location.pathname === "/AdminDashboard" ? null :
                <>
                    {show &&
                        <button className="anima" onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            });
                        }} style={classes.GotoTop}><FaChevronUp /></button>
                    }
                </>
        }
        </div>
    )
}

export default withRouter(GoToTOp)
