import React, {useContext, useEffect, useState} from 'react';
import http from "../plugins/http";
import MyContext from "../../context/MyContext";
import SingleForum from "./SingleForum";
import Pagination from "../pagination/Pagination";

const Main = () => {
    const {getAllForums, setAllForums, getCurrentPage, getForumCount, setForumCount} = useContext(MyContext)




    useEffect(() => {
        http.get("getAllForums/"+getCurrentPage).then(res => {
            setAllForums(res.allForums)
            setForumCount(res.forumCount)
        })
    }, [getCurrentPage])

    return (
        <div className={"minH100 d-flex column al-center"}>
            <div className={"mt86"}>
                {getForumCount > 10 && <Pagination forumCount={getForumCount}/>}
                {getAllForums.map((x, i) => (
                    <SingleForum forums={x} key={i}/>
                ))}
            </div>

        </div>
    );
};

export default Main;