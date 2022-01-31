import React, { useContext, useRef } from "react";
import { useState } from "react";
import auth from "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "../Firebase"
import userContext from "../context/userContext";
import NavBar from "./NavBar/NavBar";




export default function Auth(props) {
    const [sign, setSign] = useState(false)

    const ref = useRef(null);

    React.useEffect(() => {
        import("@lottiefiles/lottie-player");
    });

    const auth = firebase.auth();

    if (auth.currentUser != null) {
        props.setLoginType(true);
    }

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const userState = useContext(userContext);

    const createAccount = (user) => {
        var d = new Date();
        var joinDate = d.getTime();
        const data = {
            UserName: user.displayName,
            UserEmail: user.email,
            UserId: user.uid,
            UserJoinDate: joinDate,
            UserImageUrl: user.photoURL,
            UserQualification: "",
            UserPSNo: "",
            UserDescription: "",
            UserCurrentXp: 100,
            UserTotalXpEverEarned: 0,
            numFollower: 0,
            numFollowing: 0,
            lastLoginAt: user.metadata.lastLoginAt
        }

        firebase.firestore().collection("users").doc(user.uid).set(data);
        props.showAlert("Account Created Successfully", "success");
        userState.updateState({ "UserImageUrl": user.photoURL, "logged": true });
        console.log("Account created");
        props.setLoginType(true);
    }

    const checkId = (user) => {
        console.log("checking");
        firebase.firestore().collection("users").doc(user.uid).get().then((data) => {
            console.log(data);
            if (data.data() != null) {
                userState.updateState({ "UserImageUrl": user.photoURL, "logged": true });
                props.setLoginType(true);
            }
            else {
                createAccount(user);
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
            <NavBar setLoginType={props.setLoginType} />
            <div className="container">
                <div style={{ position: "static" }}>
                    <div>
                        <br />
                        <h1 style={{ width: "auto", textAlign: "center", marginTop: "100px", fontFamily: "monospace", fontSize: "50px", color: "#3e3e3e" }}>Welcome to Codedd!t </h1>
                        <br />
                        <p style={{ fontWeight: "bold", textAlign: "center" }} className="container">Codeddit is the largest programmer community , Feel Free To Ask you programming related doubt directly to any programming expert</p>

                        <center style={{ position: "initial" }}>
                            <lottie-player
                                id="login"
                                ref={ref}
                                mode="normal"
                                autoplay
                                loop
                                src="https://assets4.lottiefiles.com/packages/lf20_viAIVc.json"
                                onClick={() => signInWithGoogle()}
                                style={{
                                    width: "200px",
                                    height: "50px", marginTop: "10px", marginBottom: "10px",
                                    position: "initial"
                                }}
                            />
                        </center>


                        <lottie-player
                            id="main"
                            ref={ref}
                            mode="normal"
                            autoplay
                            loop
                            src="https://assets6.lottiefiles.com/packages/lf20_vo0a1yca.json"
                            style={{
                                height: "400px"
                            }}
                        />



                    </div>
                    <p>
                        Conveying meaning to assistive technologies
                        Using color to add meaning only provides a visual indication,
                        which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (e.g. the visible text), or is included through alternative means,
                        such as additional text hidden with the .visually-
                    </p>
                    <lottie-player
                        id="hello"
                        ref={ref}
                        mode="normal"
                        autoplay
                        loop
                        src="https://assets1.lottiefiles.com/packages/lf20_bXRG9q.json"
                        style={{ height: "300px" }}
                    />
                    {/* <img src={screenshot} style={{ height: "400px", width: "200px", margin: "0px 0px 0px 100px", top: "0px" }} /> */}
                </div>
            </div>

        </>
    )
}
