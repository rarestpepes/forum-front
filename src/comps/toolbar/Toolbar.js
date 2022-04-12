import React, {useContext, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import http from "../plugins/http";
import MyContext from "../../context/MyContext";
import {MdLogout,MdArrowDropDown,MdArrowDropUp,MdLogin} from "react-icons/md"
import {AiFillHeart} from "react-icons/ai"
import {FaUserAlt} from "react-icons/fa"


const Toolbar = () => {
    const [getNewForumInput, setNewForumInput] = useState(false)
    const {getUser, setUser, getAllForums, setAllForums, setCurrentPage, getForumCount, setForumCount} = useContext(MyContext)
    const nav = useNavigate()

    const newForumRef = useRef()

    function logout() {
        http.get("logout").then(res => {
            if (res.success) {
                setUser(null)
                nav("/")
            }
        })
    }

    function postNewForum() {
        const obj = {
            newForumTheme: newForumRef.current.value
        }
        http.post(obj, "postForum").then(res => {
            if (res.success) {
                setCurrentPage(1)
                setForumCount(getForumCount + 1)
                setAllForums([res.forum, ...getAllForums])
                setNewForumInput(!getNewForumInput)
                nav("/")
            }
            else {
                nav("/login")
            }
        })

    }

    return (
        <div className={"toolbar position-absolute top0"}>
            <div className={"d-flex j-sp-btw p20 al-center "}>
                <div onClick={() => nav("/")} className={"logo"}>4Um</div>
                <div className={"d-flex"}>
                    {getUser ?
                        <button onClick={() => nav("/profile")}>Profile <FaUserAlt/></button>:
                        <button onClick={() => nav("/login")}>Login <MdLogin/></button>
                    }
                    {getUser && <button onClick={() => setNewForumInput(!getNewForumInput)}>Create new Forum{getNewForumInput ? <MdArrowDropUp/>:<MdArrowDropDown/>}</button>}
                    <button onClick={() => nav("/favorites")}>Favorites <AiFillHeart/></button>
                    {getUser && <button onClick={logout}>Logout <MdLogout/></button>}
                </div>


            </div>
            {getNewForumInput &&
            <div className={"newForumInput w100 d-flex"}>
                <input type="text" ref={newForumRef} placeholder="Create new forum"/>
                <button onClick={postNewForum}>POST</button>
            </div>
            }
        </div>
    );
};

export default Toolbar;