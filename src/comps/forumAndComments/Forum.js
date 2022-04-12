import React, {useContext, useEffect, useRef, useState} from 'react';
import http from "../plugins/http";
import {useParams} from "react-router-dom";
import MyContext from "../../context/MyContext";

const Forum = () => {
    const {getUser, getComments, setComments, getForum, setForum} = useContext(MyContext)
    const {id} = useParams()

    const commentRef = useRef()

    useEffect(() => {
        http.get("getsingleforum/" + id).then(res => {
            setComments(res.comments)
            setForum(res.forum)
        })
    },[])

    function comment() {

        const commentObj = {
            commentFrom: getUser.username,
            commentOn: getForum._id,
            comment: commentRef.current.value
        }
        http.post(commentObj, "comment").then(res => {
            setComments([...getComments, res.commentNew])
        })
    }

    return (
        <div className={"d-flex column al-center minH100"}>
            {getForum &&
                <div className={"mt86 w80"}>

                    <div className={"forum-author-profile"}>
                        <h1>{getForum.theme}</h1>
                        <h2>{getForum.author}</h2>
                        <div>{new Date(getForum.timestamp).toLocaleString("lt-LT")}
                        </div>
                    </div>


                    <div>
                        {getComments &&
                        getComments.map((x, i) =>
                            <div style={{border: "2px solid"}} key={i} className={"d-flex m10"}>
                                <div className={"commenter-profile d-flex column"}>
                                    <div style={{backgroundImage: `url(${x.commentFrom.profileImage})`}} className={"image"}/>
                                    <div className={"commenter-username"}>{x.commentFrom.username}</div>
                                </div>
                                <div className={"d-flex column w100"}>
                                    <div className={"commenter-timestamp"}>
                                        {new Date(x.timestamp).toLocaleString("lt-LT")}
                                    </div>
                                    <div style={{whiteSpace:"pre-wrap"}} key={i} dangerouslySetInnerHTML={{__html: x.comment}} className={"comment-text"}/>

                                </div>
                            </div>
                            )}
                        {getUser &&
                        <div className={"m10"}>
                            <textarea type="text" ref={commentRef} style={{whiteSpace:"pre-wrap"}} className={"comment-input d-flex column"}/>
                            <button onClick={comment} className={"costume-btn w100"}>Comment</button>
                        </div>
                        }
                    </div>

                </div>
            }

        </div>
    );
};

export default Forum;