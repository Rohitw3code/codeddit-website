import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "firebase/compat/firestore";
import firebase from "../../Firebase";
import UserContext from "../../context/user/UserContext";
import "firebase/compat/firestore";
import "./Nav.css"


export default function Nav(props) {

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

        firebase.firestore().collection("USERS").doc(user.uid).set(data);
        userState.updateUserSate(data);
        props.setLoginType(true);
    }

    const checkId = (user) => {
        firebase.firestore().collection("USERS").doc(user.uid).get().then((data) => {
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
        }).catch((error) => {
            alert("error");
            throw error;
        })
    }


    return (<>     <nav className="navbar navbar-expand-lg navbar-light bg-light py-4">
        <div className="container-fluid">
            <svg className="font-poppins hidden lg:flex"  width="205" height="40" viewBox="0 0 205 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.152 28.864C9.10667 28.864 8.21067 28.7787 7.464 28.608C6.71733 28.4587 6.09867 28.2027 5.608 27.84C5.11733 27.4773 4.75467 26.9973 4.52 26.4C4.28533 25.8027 4.168 25.0667 4.168 24.192C4.168 23.6373 4.17867 23.1467 4.2 22.72C4.24267 22.2933 4.28533 21.888 4.328 21.504C4.37067 21.12 4.40267 20.736 4.424 20.352C4.46667 19.9467 4.488 19.4987 4.488 19.008C4.488 18.7307 4.41333 18.464 4.264 18.208C4.136 17.9307 3.912 17.6853 3.592 17.472C3.272 17.2587 2.83467 17.088 2.28 16.96C1.72533 16.8107 1.032 16.7253 0.2 16.704V13.504C1.032 13.4827 1.72533 13.408 2.28 13.28C2.83467 13.1307 3.272 12.9493 3.592 12.736C3.912 12.5227 4.136 12.288 4.264 12.032C4.41333 11.7547 4.488 11.4773 4.488 11.2C4.488 10.7093 4.46667 10.272 4.424 9.888C4.40267 9.48267 4.37067 9.088 4.328 8.704C4.28533 8.32 4.24267 7.91467 4.2 7.488C4.17867 7.06133 4.168 6.57067 4.168 6.016C4.168 5.14133 4.28533 4.40533 4.52 3.808C4.75467 3.21067 5.11733 2.73067 5.608 2.368C6.09867 2.00533 6.71733 1.74933 7.464 1.6C8.21067 1.42933 9.10667 1.344 10.152 1.344H12.808V4.224H11.624C11.0053 4.224 10.504 4.256 10.12 4.32C9.736 4.36267 9.43733 4.45867 9.224 4.608C9.01067 4.736 8.86133 4.93867 8.776 5.216C8.69067 5.472 8.648 5.80267 8.648 6.208C8.648 7.01867 8.66933 7.81867 8.712 8.608C8.75467 9.39733 8.776 10.2613 8.776 11.2C8.776 12.48 8.50933 13.3973 7.976 13.952C7.464 14.4853 6.62133 14.848 5.448 15.04V15.168C6.62133 15.36 7.464 15.7333 7.976 16.288C8.50933 16.8213 8.776 17.728 8.776 19.008C8.776 19.9467 8.75467 20.8107 8.712 21.6C8.66933 22.3893 8.648 23.1893 8.648 24C8.648 24.4267 8.69067 24.768 8.776 25.024C8.86133 25.28 9.01067 25.472 9.224 25.6C9.43733 25.7493 9.736 25.8453 10.12 25.888C10.504 25.952 11.0053 25.984 11.624 25.984H12.808V28.864H10.152ZM102.538 24.384C101.62 24.384 100.863 24.0853 100.266 23.488C99.6682 22.8693 99.3695 22.0907 99.3695 21.152C99.3695 20.2133 99.6682 19.4453 100.266 18.848C100.863 18.2293 101.62 17.92 102.538 17.92C103.455 17.92 104.212 18.2293 104.81 18.848C105.407 19.4453 105.706 20.2133 105.706 21.152C105.706 22.0907 105.407 22.8693 104.81 23.488C104.212 24.0853 103.455 24.384 102.538 24.384ZM192.299 28.864V25.984H193.483C194.08 25.984 194.571 25.952 194.955 25.888C195.339 25.8453 195.638 25.7493 195.851 25.6C196.064 25.472 196.214 25.28 196.299 25.024C196.384 24.768 196.427 24.4267 196.427 24C196.427 23.1893 196.406 22.3893 196.363 21.6C196.342 20.8107 196.331 19.9467 196.331 19.008C196.331 17.728 196.587 16.8213 197.099 16.288C197.632 15.7333 198.486 15.36 199.659 15.168V15.04C198.486 14.848 197.632 14.4853 197.099 13.952C196.587 13.3973 196.331 12.48 196.331 11.2C196.331 10.2613 196.342 9.39733 196.363 8.608C196.406 7.81867 196.427 7.01867 196.427 6.208C196.427 5.80267 196.384 5.472 196.299 5.216C196.214 4.93867 196.064 4.736 195.851 4.608C195.638 4.45867 195.339 4.36267 194.955 4.32C194.571 4.256 194.08 4.224 193.483 4.224H192.299V1.344H194.955C197.024 1.344 198.539 1.68533 199.499 2.368C200.459 3.05066 200.939 4.26667 200.939 6.016C200.939 6.57067 200.918 7.06133 200.875 7.488C200.854 7.91467 200.811 8.32 200.747 8.704C200.704 9.088 200.662 9.48267 200.619 9.888C200.598 10.272 200.587 10.7093 200.587 11.2C200.587 11.4773 200.651 11.7547 200.779 12.032C200.928 12.288 201.163 12.5227 201.483 12.736C201.824 12.9493 202.272 13.1307 202.827 13.28C203.382 13.408 204.075 13.4827 204.907 13.504V16.704C204.075 16.7253 203.382 16.8107 202.827 16.96C202.272 17.088 201.824 17.2587 201.483 17.472C201.163 17.6853 200.928 17.9307 200.779 18.208C200.651 18.464 200.587 18.7307 200.587 19.008C200.587 19.4987 200.598 19.9467 200.619 20.352C200.662 20.736 200.704 21.12 200.747 21.504C200.811 21.888 200.854 22.2933 200.875 22.72C200.918 23.1467 200.939 23.6373 200.939 24.192C200.939 25.0667 200.822 25.8027 200.587 26.4C200.352 26.9973 199.99 27.4773 199.499 27.84C199.008 28.2027 198.39 28.4587 197.643 28.608C196.896 28.7787 196 28.864 194.955 28.864H192.299Z" fill="#407AFF" />
                <path d="M27.5155 24.384C26.2142 24.384 24.9875 24.1493 23.8355 23.68C22.7048 23.2107 21.7128 22.5173 20.8595 21.6C20.0062 20.6827 19.3342 19.552 18.8435 18.208C18.3528 16.864 18.1075 15.328 18.1075 13.6C18.1075 11.8933 18.3528 10.368 18.8435 9.024C19.3342 7.65867 20.0062 6.50667 20.8595 5.568C21.7342 4.62933 22.7582 3.91467 23.9315 3.424C25.1048 2.93333 26.3848 2.688 27.7715 2.688C29.0728 2.688 30.2248 2.95467 31.2275 3.488C32.2515 4.02133 33.0942 4.62933 33.7555 5.312L31.7075 7.616C31.1742 7.104 30.5875 6.69867 29.9475 6.4C29.3075 6.08 28.5822 5.92 27.7715 5.92C26.8968 5.92 26.0968 6.10133 25.3715 6.464C24.6675 6.80533 24.0595 7.30667 23.5475 7.968C23.0355 8.608 22.6302 9.39733 22.3315 10.336C22.0542 11.2747 21.9155 12.3307 21.9155 13.504C21.9155 14.6987 22.0542 15.776 22.3315 16.736C22.6302 17.6747 23.0355 18.4747 23.5475 19.136C24.0595 19.776 24.6782 20.2773 25.4035 20.64C26.1502 20.9813 26.9715 21.152 27.8675 21.152C28.7208 21.152 29.4888 20.9707 30.1715 20.608C30.8755 20.2453 31.5262 19.7333 32.1235 19.072L34.1715 21.344C33.3395 22.3253 32.3688 23.0827 31.2595 23.616C30.1715 24.128 28.9235 24.384 27.5155 24.384ZM44.975 24.384C43.951 24.384 42.959 24.2027 41.999 23.84C41.039 23.4773 40.1963 22.944 39.471 22.24C38.7457 21.536 38.159 20.672 37.711 19.648C37.2843 18.624 37.071 17.4613 37.071 16.16C37.071 14.8587 37.2843 13.696 37.711 12.672C38.159 11.648 38.7457 10.784 39.471 10.08C40.1963 9.376 41.039 8.84267 41.999 8.48C42.959 8.096 43.951 7.904 44.975 7.904C45.999 7.904 46.991 8.096 47.951 8.48C48.911 8.84267 49.7537 9.376 50.479 10.08C51.2043 10.784 51.7803 11.648 52.207 12.672C52.655 13.696 52.879 14.8587 52.879 16.16C52.879 17.4613 52.655 18.624 52.207 19.648C51.7803 20.672 51.2043 21.536 50.479 22.24C49.7537 22.944 48.911 23.4773 47.951 23.84C46.991 24.2027 45.999 24.384 44.975 24.384ZM44.975 21.376C46.255 21.376 47.2577 20.9067 47.983 19.968C48.7083 19.008 49.071 17.7387 49.071 16.16C49.071 14.56 48.7083 13.2907 47.983 12.352C47.2577 11.392 46.255 10.912 44.975 10.912C43.695 10.912 42.6923 11.392 41.967 12.352C41.2417 13.2907 40.879 14.56 40.879 16.16C40.879 17.7387 41.2417 19.008 41.967 19.968C42.6923 20.9067 43.695 21.376 44.975 21.376ZM62.9785 24.384C61.9758 24.384 61.0585 24.2027 60.2265 23.84C59.3945 23.456 58.6798 22.912 58.0825 22.208C57.5065 21.504 57.0585 20.6507 56.7385 19.648C56.4185 18.624 56.2585 17.4613 56.2585 16.16C56.2585 14.88 56.4505 13.728 56.8345 12.704C57.2185 11.68 57.7305 10.816 58.3705 10.112C59.0318 9.408 59.7785 8.864 60.6105 8.48C61.4425 8.096 62.3065 7.904 63.2025 7.904C64.0985 7.904 64.8878 8.064 65.5705 8.384C66.2532 8.704 66.9038 9.16267 67.5225 9.76H67.6185L67.4265 7.104V1.408H71.1385V24H68.0985L67.8105 22.176H67.7145C67.0958 22.7947 66.3705 23.3173 65.5385 23.744C64.7278 24.1707 63.8745 24.384 62.9785 24.384ZM63.8745 21.344C65.1758 21.344 66.3598 20.7147 67.4265 19.456V12.384C66.8718 11.8507 66.3172 11.4773 65.7625 11.264C65.2078 11.0507 64.6425 10.944 64.0665 10.944C63.5118 10.944 62.9892 11.0613 62.4985 11.296C62.0292 11.5307 61.6132 11.872 61.2505 12.32C60.8878 12.7467 60.5998 13.28 60.3865 13.92C60.1732 14.56 60.0665 15.296 60.0665 16.128C60.0665 17.8347 60.3972 19.136 61.0585 20.032C61.7198 20.9067 62.6585 21.344 63.8745 21.344ZM84.31 24.384C83.1153 24.384 81.9953 24.2027 80.95 23.84C79.9047 23.456 78.9873 22.912 78.198 22.208C77.43 21.504 76.822 20.64 76.374 19.616C75.926 18.592 75.702 17.4293 75.702 16.128C75.702 14.848 75.926 13.7067 76.374 12.704C76.822 11.68 77.4193 10.816 78.166 10.112C78.934 9.38667 79.798 8.84267 80.758 8.48C81.7393 8.096 82.7633 7.904 83.83 7.904C85.0033 7.904 86.038 8.096 86.934 8.48C87.83 8.84267 88.5873 9.35467 89.206 10.016C89.8247 10.656 90.294 11.4347 90.614 12.352C90.934 13.2693 91.094 14.272 91.094 15.36C91.094 15.7227 91.0727 16.0747 91.03 16.416C91.0087 16.736 90.9767 17.0027 90.934 17.216H79.382C79.5953 18.688 80.182 19.776 81.142 20.48C82.102 21.184 83.318 21.536 84.79 21.536C85.622 21.536 86.39 21.4187 87.094 21.184C87.798 20.9493 88.502 20.6293 89.206 20.224L90.454 22.528C89.622 23.0827 88.6727 23.5307 87.606 23.872C86.5607 24.2133 85.462 24.384 84.31 24.384ZM83.926 10.752C82.838 10.752 81.878 11.072 81.046 11.712C80.2353 12.352 79.7127 13.312 79.478 14.592H87.83C87.702 13.312 87.2967 12.352 86.614 11.712C85.9527 11.072 85.0567 10.752 83.926 10.752ZM120.541 24.384C119.538 24.384 118.621 24.2027 117.789 23.84C116.957 23.456 116.242 22.912 115.645 22.208C115.069 21.504 114.621 20.6507 114.301 19.648C113.981 18.624 113.821 17.4613 113.821 16.16C113.821 14.88 114.013 13.728 114.397 12.704C114.781 11.68 115.293 10.816 115.933 10.112C116.594 9.408 117.341 8.864 118.173 8.48C119.005 8.096 119.869 7.904 120.765 7.904C121.661 7.904 122.45 8.064 123.133 8.384C123.816 8.704 124.466 9.16267 125.085 9.76H125.181L124.989 7.104V1.408H128.701V24H125.661L125.373 22.176H125.277C124.658 22.7947 123.933 23.3173 123.101 23.744C122.29 24.1707 121.437 24.384 120.541 24.384ZM121.437 21.344C122.738 21.344 123.922 20.7147 124.989 19.456V12.384C124.434 11.8507 123.88 11.4773 123.325 11.264C122.77 11.0507 122.205 10.944 121.629 10.944C121.074 10.944 120.552 11.0613 120.061 11.296C119.592 11.5307 119.176 11.872 118.813 12.32C118.45 12.7467 118.162 13.28 117.949 13.92C117.736 14.56 117.629 15.296 117.629 16.128C117.629 17.8347 117.96 19.136 118.621 20.032C119.282 20.9067 120.221 21.344 121.437 21.344ZM139.729 24.384C138.726 24.384 137.809 24.2027 136.977 23.84C136.145 23.456 135.43 22.912 134.833 22.208C134.257 21.504 133.809 20.6507 133.489 19.648C133.169 18.624 133.009 17.4613 133.009 16.16C133.009 14.88 133.201 13.728 133.585 12.704C133.969 11.68 134.481 10.816 135.121 10.112C135.782 9.408 136.529 8.864 137.361 8.48C138.193 8.096 139.057 7.904 139.953 7.904C140.849 7.904 141.638 8.064 142.321 8.384C143.003 8.704 143.654 9.16267 144.273 9.76H144.369L144.177 7.104V1.408H147.889V24H144.849L144.561 22.176H144.465C143.846 22.7947 143.121 23.3173 142.289 23.744C141.478 24.1707 140.625 24.384 139.729 24.384ZM140.625 21.344C141.926 21.344 143.11 20.7147 144.177 19.456V12.384C143.622 11.8507 143.067 11.4773 142.513 11.264C141.958 11.0507 141.393 10.944 140.817 10.944C140.262 10.944 139.739 11.0613 139.249 11.296C138.779 11.5307 138.363 11.872 138.001 12.32C137.638 12.7467 137.35 13.28 137.137 13.92C136.923 14.56 136.817 15.296 136.817 16.128C136.817 17.8347 137.147 19.136 137.809 20.032C138.47 20.9067 139.409 21.344 140.625 21.344ZM160.004 24V11.2H153.188V8.288H163.684V24H160.004ZM161.604 5.408C160.857 5.408 160.228 5.184 159.716 4.736C159.225 4.288 158.98 3.69067 158.98 2.944C158.98 2.19733 159.225 1.6 159.716 1.152C160.228 0.682665 160.857 0.447998 161.604 0.447998C162.351 0.447998 162.969 0.682665 163.46 1.152C163.972 1.6 164.228 2.19733 164.228 2.944C164.228 3.69067 163.972 4.288 163.46 4.736C162.969 5.184 162.351 5.408 161.604 5.408ZM182.2 24.384C181.005 24.384 179.992 24.224 179.16 23.904C178.349 23.584 177.688 23.136 177.176 22.56C176.685 21.9627 176.322 21.248 176.088 20.416C175.874 19.584 175.768 18.6667 175.768 17.664V11.2H171.576V8.448L175.928 8.288L176.408 3.36H179.448V8.288H186.616V11.2H179.448V17.664C179.448 18.9653 179.714 19.9253 180.248 20.544C180.802 21.1413 181.752 21.44 183.096 21.44C183.757 21.44 184.365 21.3867 184.92 21.28C185.474 21.152 186.008 20.992 186.52 20.8L187.224 23.488C186.52 23.7227 185.762 23.9253 184.952 24.096C184.141 24.288 183.224 24.384 182.2 24.384Z" fill="#2E3647" />
            </svg>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navTitle navbar-nav me-auto mb-2 mb-lg-0" >


                    <li className="navTitle nav-item">
                        <Link to="/" className="nav-link active h4 " >Home</Link>
                    </li>
                    <li className="navTitle nav-item">
                        <Link to="/about" className="nav-link h4">About</Link>
                    </li>


                </ul>
                <form className="d-flex">
                    <button  className="btn btn-outline-primary" onClick={signInWithGoogle} type="button">Sign Up</button>
                </form>
            </div>
        </div>
    </nav>
    </>)

}
