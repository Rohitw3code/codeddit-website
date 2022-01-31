import React, { useState, useContext } from 'react';
// import Delete from "../functions/Delete";
import "firebase/compat/firestore";
import firebase from "../Firebase";
import postContext from '../context/postContext';


export default function UpdatePost(props) {
    const item = useContext(postContext);

    const onTextNameChange = (event) => {
        setName(event.target.value);
    }

    const onTextStdChange = (event) => {
        setStd(event.target.value);
    }


    const updatePost = () => {
        firebase.firestore().collection("posts").doc(item.state.id).update({ "title": title, "description": desc });
        props.showAlert("Updated Successfully", "success");
    }
    const [title, setName] = useState(item.state.title);
    const [desc, setStd] = useState(item.state.description);


    return (
        <div>
            <h2>Update Post </h2>
            <div className="input-group my-5">
                <span className="input-group-text">First and last name</span>
                <input type="text" aria-label="First name" placeholder="Your name" value={title} onChange={onTextNameChange} className="form-control" />
            </div>

            <div className="input-group my-5">
                <span className="input-group-text">Standard</span>
                <input type="text" aria-label="First name" placeholder="Class" value={desc} onChange={onTextStdChange} className="form-control" />
            </div>

            <button type="button" onClick={updatePost} className="btn btn-success" >Upadte</button>


        </div>
    )
}
