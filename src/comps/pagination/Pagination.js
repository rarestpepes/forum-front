import React, {useContext, useState} from 'react';
import MyContext from "../../context/MyContext";

const Pagination = ({forumCount}) => {

    const {getCurrentPage, setCurrentPage} = useContext(MyContext)

    let pageCount = []

    for (let i = 1; i <= Math.ceil(forumCount/10); i++) {
        pageCount.push(i)
    }



    return (
        <div className={"d-flex w100 j-center pagination"}>
            {pageCount.map((x,i) =>
                <div key={i}
                     onClick={() => setCurrentPage(x)}
                     style={{background: getCurrentPage === x && "grey"}}>{x}</div>)}
        </div>
    );
};

export default Pagination;