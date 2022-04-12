import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Notification = ({notification}) => {

    const nav = useNavigate()

    function checkNotify() {
        nav(`/forum/${notification.forumID}`)
    }

    return (
        <div className={"notification d-flex al-center j-center m5"}
             onClick={checkNotify}
             >
            <h3>
                <span style={{fontWeight: "bold", color:"#bb3f01"}}>{notification.commentAuthor}</span> left a comment on <span style={{fontWeight: "bold", color:"#bb3f01"}}>{notification.forumTitle}</span>
            </h3>
        </div>
    );
};

export default Notification;