import React, { useContext, useRef } from "react";
import "firebase/compat/firestore";
import firebase from "../../Firebase"
import UserContext from "../../context/user/UserContext";
import { NavBar } from "../NavBar";
import Hero from "../Hero";
import { Route, Router, Switch } from "react-router-dom";
import LandingHome from "./LandingHome";
import About from "./About";

export default function Landing(props) {


    const auth = firebase.auth();

    if (auth.currentUser != null) {
        props.setLoginType(true);
    }

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const userState = useContext(UserContext);
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
        userState.updateUserSate(data.data());
        props.setLoginType(true);
    }

    const checkId = (user) => {
        firebase.firestore().collection("users").doc(user.uid).get().then((data) => {
            if (data.data() != null) {
                userState.updateUserSate(data.data());
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
        }).catch((error) => { throw error; })
    }

    return (
        <div className="flex flex-col w-full h-full px-6 md:px-24">
            {/* <NavBar setLoginType={props.setLoginType} /> */}


            <div className="flex justify-between items-center w-full h-full flex-col xl:flex-row mt-16 my-8 xl:my-0 gap-8 xl:gap-6 2xl:gap-8">
                <div className="flex flex-col items-center xl:items-start">
                    <h1 className="font-poppins text-black xl:whitespace-nowrap text-center xl:text-left font-bold tracking-wider text-4xl md:text-5xl 2xl:text-6xl">
                        The ultimate <br className="hidden xl:inline" />community <br className="hidden xl:inline" />for <span className="text-blue-700">programmers</span>.
                    </h1>
                    <p className="font-code text-black text-center xl:text-left text-base md:text-lg 2xl:text-xl my-10">Codeddit is the largest programmer community. Feel free to ask any programming related doubt directly to experts.</p>
                    <button className="font-poppins w-min whitespace-nowrap text-white bg-blue-700 tracking-widest px-16 py-5 rounded-lg text-md 2xl:text-lg" onClick={signInWithGoogle}>Join Us Today</button>
                </div>
                <div className="relative z-10 w-full flex justify-end">
                    <svg style={{ zIndex: -1 }} className="hidden xl:block absolute -top-16 -right-16" width="278" height="221" viewBox="0 0 278 221" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M80.216 220.912C71.8533 220.912 64.6853 220.229 58.712 218.864C52.7387 217.669 47.7893 215.621 43.864 212.72C39.9387 209.819 37.0373 205.979 35.16 201.2C33.2827 196.421 32.344 190.533 32.344 183.536C32.344 179.099 32.4293 175.173 32.6 171.76C32.9413 168.347 33.2827 165.104 33.624 162.032C33.9653 158.96 34.2213 155.888 34.392 152.816C34.7333 149.573 34.904 145.989 34.904 142.064C34.904 139.845 34.3067 137.712 33.112 135.664C32.088 133.445 30.296 131.483 27.736 129.776C25.176 128.069 21.6773 126.704 17.24 125.68C12.8027 124.485 7.256 123.803 0.6 123.632V98.032C7.256 97.8613 12.8027 97.264 17.24 96.24C21.6773 95.0453 25.176 93.5947 27.736 91.888C30.296 90.1813 32.088 88.304 33.112 86.256C34.3067 84.0373 34.904 81.8187 34.904 79.6C34.904 75.6747 34.7333 72.176 34.392 69.104C34.2213 65.8613 33.9653 62.704 33.624 59.632C33.2827 56.56 32.9413 53.3173 32.6 49.904C32.4293 46.4907 32.344 42.5653 32.344 38.128C32.344 31.1307 33.2827 25.2427 35.16 20.464C37.0373 15.6853 39.9387 11.8453 43.864 8.94398C47.7893 6.04266 52.7387 3.99466 58.712 2.79999C64.6853 1.43466 71.8533 0.751999 80.216 0.751999H101.464V23.792H91.992C87.0427 23.792 83.032 24.048 79.96 24.56C76.888 24.9013 74.4987 25.6693 72.792 26.864C71.0853 27.888 69.8907 29.5093 69.208 31.728C68.5253 33.776 68.184 36.4213 68.184 39.664C68.184 46.1493 68.3547 52.5493 68.696 58.864C69.0373 65.1787 69.208 72.0907 69.208 79.6C69.208 89.84 67.0747 97.1787 62.808 101.616C58.712 105.883 51.9707 108.784 42.584 110.32V111.344C51.9707 112.88 58.712 115.867 62.808 120.304C67.0747 124.571 69.208 131.824 69.208 142.064C69.208 149.573 69.0373 156.485 68.696 162.8C68.3547 169.115 68.184 175.515 68.184 182C68.184 185.413 68.5253 188.144 69.208 190.192C69.8907 192.24 71.0853 193.776 72.792 194.8C74.4987 195.995 76.888 196.763 79.96 197.104C83.032 197.616 87.0427 197.872 91.992 197.872H101.464V220.912H80.216ZM176.372 220.912V197.872H185.844C190.623 197.872 194.548 197.616 197.62 197.104C200.692 196.763 203.081 195.995 204.788 194.8C206.495 193.776 207.689 192.24 208.372 190.192C209.055 188.144 209.396 185.413 209.396 182C209.396 175.515 209.225 169.115 208.884 162.8C208.713 156.485 208.628 149.573 208.628 142.064C208.628 131.824 210.676 124.571 214.772 120.304C219.039 115.867 225.865 112.88 235.252 111.344V110.32C225.865 108.784 219.039 105.883 214.772 101.616C210.676 97.1787 208.628 89.84 208.628 79.6C208.628 72.0907 208.713 65.1787 208.884 58.864C209.225 52.5493 209.396 46.1493 209.396 39.664C209.396 36.4213 209.055 33.776 208.372 31.728C207.689 29.5093 206.495 27.888 204.788 26.864C203.081 25.6693 200.692 24.9013 197.62 24.56C194.548 24.048 190.623 23.792 185.844 23.792H176.372V0.751999H197.62C214.175 0.751999 226.292 3.48266 233.972 8.94398C241.652 14.4053 245.492 24.1333 245.492 38.128C245.492 42.5653 245.321 46.4907 244.98 49.904C244.809 53.3173 244.468 56.56 243.956 59.632C243.615 62.704 243.273 65.8613 242.932 69.104C242.761 72.176 242.676 75.6747 242.676 79.6C242.676 81.8187 243.188 84.0373 244.212 86.256C245.407 88.304 247.284 90.1813 249.844 91.888C252.575 93.5947 256.159 95.0453 260.596 96.24C265.033 97.264 270.58 97.8613 277.236 98.032V123.632C270.58 123.803 265.033 124.485 260.596 125.68C256.159 126.704 252.575 128.069 249.844 129.776C247.284 131.483 245.407 133.445 244.212 135.664C243.188 137.712 242.676 139.845 242.676 142.064C242.676 145.989 242.761 149.573 242.932 152.816C243.273 155.888 243.615 158.96 243.956 162.032C244.468 165.104 244.809 168.347 244.98 171.76C245.321 175.173 245.492 179.099 245.492 183.536C245.492 190.533 244.553 196.421 242.676 201.2C240.799 205.979 237.897 209.819 233.972 212.72C230.047 215.621 225.097 217.669 219.124 218.864C213.151 220.229 205.983 220.912 197.62 220.912H176.372Z" fill="#A8C2FF" />
                    </svg>
                    <Hero />
                </div>
            </div>
            <p className="font-code text-blue-400 text-sm text-center mb-4">Copyright © Codeddit.com. All Rights Reserved.</p>
        </div >
    )
}
