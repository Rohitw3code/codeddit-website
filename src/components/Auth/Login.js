import React, { useRef } from "react";
import firebase from 'firebase/compat/app';
// import { GoogleAuthProvider } from "@firebase/auth";
// import firebase from "../Firebase";
import auth from "firebase/compat/auth";
import "firebase/compat/firestore";
import { useHistory } from "react-router-dom";

export default function Login(props) {
    const ref = useRef(null);
    React.useEffect(() => {
        import("@lottiefiles/lottie-player");
    });

    // give it some time to authanticate

    const history = useHistory();
    const auth = firebase.auth();
    const googleProvider = new firebase.auth.GoogleAuthProvider()

    const createAccount = (user) => {
        const data = {
            name: user.displayName,
            email: user.email,
            id: user.uid,
            createdDate: user.metadata.creationTime,
            photoURL: user.photoURL,
            lastLoginAt: user.metadata.lastLoginAt

        }
        firebase.firestore().collection("users").doc(user.uid).set(data);
        props.showAlert("Account Created Successfully", "success");
        console.log("Account created");
    }

    const checkId = (user) => {
        console.log("checking");
        firebase.firestore().collection("users").doc(user.uid).get().then((data) => {
            console.log(data);
            if (data.data() != null) {
                props.showAlert("You are Logged-In", "info");
                history.push("/");
            }
            else {
                createAccount(user);
                history.push("/");
            }
        })

    }

    const signInWithGoogle = () => {

        auth.signInWithPopup(googleProvider).then((res) => {
            checkId(res.user);

        }).catch((error) => {
            console.log(error.message)
        })



    }


    return (
        <>
            <div className="container">
                <lottie-player
                    id="firstLottie"
                    ref={ref}
                    autoplay
                    loop
                    mode="normal"
                    src="https://assets7.lottiefiles.com/packages/lf20_q5pk6p1k.json"
                    style={{ width: "100%", height: "300px", marginTop: "100px" }}
                />

                <button to="/" type="button" className="btn btn-secondary" onClick={signInWithGoogle} style={{ align: "right" }}>Sign-Up</button>


            </div>

        </>
    );
}
