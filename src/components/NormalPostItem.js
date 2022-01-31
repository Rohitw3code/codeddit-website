import React, { useContext } from 'react';
// import Delete from "../functions/Delete";
import "firebase/compat/firestore";
import firebase from "../Firebase";
import { Link } from 'react-router-dom';
import postContext from '../context/postContext';

export default function NormalPostItem(props) {
    const item = useContext(postContext);


    function toDateTime(secs) {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
    }

    const deletePost = () => {
        firebase.firestore().collection("users").doc(props.id).delete();
        props.showAlert("Post is deleted successfully", "danger");
    }

    const updateId = (value) => {
        item.updateState({ id: value.id, title: value.title, description: value.description });
    }




    return (
        <div className="container">

            <div className="card my-5">
                <div className="card-header">
                    <img src={props.data.userImage} width="30px" height="30px" style={{ borderRadius: "100px", borderColor: "#50BFE6", borderWidth: "2px", borderStyle: "solid", marginLeft: "10px", marginRight: "10px" }} />
                    Name : {props.data.userName}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.data.title}</h5>
                    <p className="card-text">{props.data.description}</p>
                    {/* <p className="card-text">{timeAgo.format(Date.now() - props.time, 'mini-now')}</p> */}
                    <a>{toDateTime(props.data.time.seconds).toDateString()}</a>
                    <button type="button" onClick={deletePost} className="btn btn-danger mx-5">delete</button>
                    <Link type="button" to="/updatePost" onClick={() => { updateId(props.data) }} className="btn btn-primary">update</Link>                </div>
            </div>
        </div >
    )
}
