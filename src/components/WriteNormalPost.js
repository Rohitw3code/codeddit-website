import React, { useState } from 'react'
import "firebase/compat/firestore";
import firebase from "../Firebase";
import { useHistory } from "react-router-dom";

export default function WriteNormalPost(props) {

    const authValue = firebase.auth().currentUser;
    const history = useHistory();

    let publisherId = "";
    if (authValue != null) {
        publisherId = authValue.uid;
    }
    else {
        history.push("/Login");
    }



    const newPost = () => {

        if (title.trim() !== "" || description.trim() !== "") {
            const userData = {
                publisherId: publisherId,
                title: title,
                description: description,
                time: firebase.firestore.FieldValue.serverTimestamp()
            }
            firebase.firestore().collection("posts").doc().set(userData);
            props.showAlert("Posted Successfully", "success");

        }

    }

    const onTextNameChange = (event) => {
        setName(event.target.value);
    }

    const onTextStdChange = (event) => {
        setStd(event.target.value);
    }

    const [title, setName] = useState("");
    const [description, setStd] = useState("");

    return (
        <div>
            <h2>Create New Post</h2>
            <div className="input-group my-5">
                <span className="input-group-text">Title</span>
                <input type="text" aria-label="title" placeholder="Write Title here....." value={title} onChange={onTextNameChange} className="form-control" />
            </div>

            <div className="input-group my-5">
                <span className="input-group-text">Description</span>
                <input type="text" aria-label="description" placeholder="description.." value={description} onChange={onTextStdChange} className="form-control" />
            </div>

            <button type="button" className="btn btn-success" onClick={newPost}>Post</button>


        </div>
    )
}
