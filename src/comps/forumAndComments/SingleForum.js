import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AiFillHeart} from "react-icons/ai"

const SingleForum = ({forums}) => {
    const nav = useNavigate()


    const [color, setColor] = useState(true)
    const [getFavorites, setFavorites] = useState(
        JSON.parse(localStorage.favorites).find((x) => x === forums._id),
    );

    function addToFavorites(forumID) {
        let favorites = JSON.parse(localStorage.favorites)
        setFavorites(!getFavorites);
        if (!getFavorites) {
            favorites.push(forumID);
        } else {
            favorites = favorites.filter((x) => x !== forumID);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    return (
        <div className={"single-forum d-flex al-center j-sp-btw p10 m5"}>
            <div onClick={() => addToFavorites(forums._id)} style={{color: getFavorites ? "red": "black", fontSize: "30px", cursor: "pointer"}}><AiFillHeart/></div>
            <h2 onClick={() => nav(`/forum/${forums._id}`)}>Theme: {forums.theme}</h2>
            <h2>Replies: {forums.commentsCount}</h2>
            <div style={{background: "#333333"}} className={"p10"}>
                <h3>By {forums.author}</h3>
                <h3>Created in {new Date(forums.timestamp).toLocaleString("lt-LT")}</h3>
            </div>
        </div>
    );
};

export default SingleForum;