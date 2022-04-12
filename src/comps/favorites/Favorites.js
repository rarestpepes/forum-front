import React, {useContext, useEffect, useState} from 'react';
import http from "../plugins/http";
import SingleForum from "../forumAndComments/SingleForum";

const Favorites = () => {
    const [favoritesAll, setFavoritesAll] = useState([])
    const favoriteArray = JSON.parse(localStorage.favorites)

    useEffect(() => {
        http.post({favoriteArray}, 'getFavoriteForums').then(res => {
            const favoriteForums = res.getFavoriteForums
            const realFavorites = favoriteForums.map(x => x._id)
            localStorage.setItem("favorites", JSON.stringify(realFavorites));
            setFavoritesAll(favoriteForums)
        })
    }, [localStorage.favorites])
    return (
        <div className={"vh100 d-flex column al-center mt86"}>
            {favoritesAll && favoritesAll.map((x ,i) =>
                <SingleForum forums={x} key={i}/>)}
        </div>
    );
};

export default Favorites;