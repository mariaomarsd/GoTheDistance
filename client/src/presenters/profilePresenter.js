import { getAuth, signOut } from "firebase/auth";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebaseConfig";

const ProfileView = require("../views/profileView.js").default;

firebase.initializeApp(firebaseConfig);
const auth = getAuth();

function ProfilePresenter(props) {

    function signoutCB() {
        signOut(auth)
            .then(props.logout)
            .catch((error) => {console.log("error", error.message)});
    }

    return(
        <div className="user-container">
            <ProfileView 
                signout = {signoutCB}
                loggedInUser={props.loggedIn}
                user={props.userName}
            />
        </div>
    );
}

export default ProfilePresenter;
