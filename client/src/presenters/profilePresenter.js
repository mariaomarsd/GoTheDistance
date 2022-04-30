import React, { useState } from "react";

const ProfileView = require("../views/profileView.js").default;

function ProfilePresenter(props) {

    const [isVisible, setIsVisible] = useState();

    function setVisibleCB() {
        props.setVisible(3)
        setIsVisible(props.visible[3]);
    }
    return(
        <div className="profile-presenter">
            <div className="sidebar-titles" onClick={setVisibleCB}>
                PROFILE
            </div>
            <div>
                {isVisible && <ProfileView />}
            </div>
        </div>
    );
}

export default ProfilePresenter;
