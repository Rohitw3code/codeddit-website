import React from 'react'
import {
    Link
} from "react-router-dom";

export default function NavBar(props) {
    return (
        <div>


            <nav className="navbar navbar-light bg-light">
                <form className="container-fluid justify-content-start">
                    <Link to="/" className="btn btn-outline-success me-2" type="button">Posts</Link>
                    <Link to="/WritePost" className="btn btn-sm btn-outline-secondary" type="button">Write Post</Link>
                    <Link to="/Login" className="btn btn-sm btn-outline-secondary mx-5" type="button">Login/Sigin-Up</Link>


                    <div className="badge bg-primary text-wrap" style={{ marginRight: "20px", marginLeft: "30%" }}>{props.userName}</div>
                    <img src={props.userImage} width="50px" height="50px" style={{ borderRadius: "100px", borderColor: "#50BFE6", borderWidth: "2px", borderStyle: "solid" }} />

                </form>
            </nav>
        </div>
    )
}
