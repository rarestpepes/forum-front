import React, {useContext, useEffect, useRef, useState} from 'react';
import http from "../plugins/http";
import MyContext from "../../context/MyContext";
import SingleForum from "../forumAndComments/SingleForum";
import Notification from "./Notification";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const {getUser, setUser} = useContext(MyContext)

    const [getImgInput, setImgInput] = useState(false)
    const [getBtmDisplay, setBtmDisplay] = useState(1)

    const [getUserForums, setUserForums] = useState([])
    const [getNotifications, setNotifications] = useState([])

    const nav = useNavigate()

    const imgUrlRef = useRef()

    useEffect(() => {
        http.get("userprofile").then(res => {
            setUser(res.user)
            setUserForums(res.userForums)
            setNotifications(res.notifications)
        })
    }, [])

    function changeProfileImg(e) {
        e.preventDefault()
        const imgUrl = {
            profileImage: imgUrlRef.current.value
        }
        http.post(imgUrl, "changeimg").then(res => {
            setUser(res.user)
        })
    }

    return (
        <div className={"minH100"}>
            {getUser &&
            <div className={"d-flex mt86 p30 profile-container "}>
                <div className={"profileImg mr50 grow1 d-flex column al-center"}>
                    <div className={"profileImg"} style={{backgroundImage: `url(${getUser.profileImage})`}}
                         onClick={() => setImgInput(!getImgInput)}/>
                    {getImgInput &&
                    <form onSubmit={changeProfileImg} className={"d-flex w100"}>
                        <input type="text" placeholder={"image url"} ref={imgUrlRef} className={"w100"}/>
                        <button type={"submit"} className={"costume-btn"}>Submit</button>
                    </form>
                    }
                </div>
                <div className={"d-flex grow2 h100 column j-sp-btw"}>
                    <div className={"username-text"}>{getUser.username}</div>
                    <div className={"commentcount-text"}>You joined {new Date(getUser.createdTimestamp).toLocaleString("lt-LT")}</div>
                    <div className={"commentcount-text"}>You commented {getUser.commentCounter} times</div>
                    <div className={"d-flex j-sp-btw w100"}>
                        <div className={"grow1 "}>
                            <div onClick={() => setBtmDisplay(1)} className={"costume-btn"}>Your created forums</div>
                        </div>
                        <div  className={"grow1"}>
                            <div onClick={() => setBtmDisplay(2)}  className={"costume-btn"}>Notifications</div>
                        </div>
                    </div>

                </div>

            </div>
            }
            <div className={"d-flex al-center j-sp-btw column p30 "}>
                {}
                {getBtmDisplay === 1 && getUserForums.map((x, i) => <SingleForum forums={x} key={i}/>)}
                {getBtmDisplay === 2 && getNotifications.map((x, i) => <Notification notification={x} key={i}/>)}
            </div>
        </div>
    );
};

export default Profile;