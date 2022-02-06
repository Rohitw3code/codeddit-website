import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "firebase/compat/firestore";
import firebase from "../../Firebase";
import UserContext from "../../context/user/UserContext";
import "firebase/compat/firestore";
import "./NavHome.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const NavHome = () => {
    const userState = useContext(UserContext);


    return (
        <>     <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">


                <div class="hstack gap-3">
                    <img src={userState.state.UserImageUrl} className="mx-4" width="50px" height="50px" style={{ borderRadius: "100px", borderColor: "#50BFE6", borderWidth: "2px", borderStyle: "solid" }} />
                    <div className="xpDiv">{userState.state.UserCurrentXp} XP</div>
                </div>


                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-4">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active mr-10" aria-current="page" >Main</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/articles" className="nav-link">Articles</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/courses" className="nav-link">Courses</Link>
                        </li>


                    </ul>
                    <form className="d-flex">
                        <button className="btn btn-outline-success mx-4" type="button">Log Out</button>
                    </form>
                </div>
            </div>
        </nav>
        </>
    );
}


export default NavHome;