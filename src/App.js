import './App.css';
import Toolbar from "./comps/toolbar/Toolbar";
import LoginPage from "./comps/auth/Login";
import RegisterPage from "./comps/auth/Register";
import ProfilePage from "./pages/ProfilePage";
import MainPage from "./pages/MainPage";
import ForumPage from "./pages/ForumPage";
import FavoritePage from "./pages/FavoritePage";

import MyContext from "./context/MyContext";

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from "react";


function App() {
    const [getUser, setUser] = useState()
    const [getAllForums, setAllForums] = useState([])
    const [getComments, setComments] = useState([])
    const [getCurrentPage, setCurrentPage] = useState(1)
    const [getForumCount,setForumCount] = useState(0)

    const [getForum, setForum] = useState(null)

    if (!localStorage.getItem('favorites')) localStorage.setItem('favorites', JSON.stringify([]));

    return (
        <div className="App">
            <MyContext.Provider value={{
                getUser,
                setUser,
                getAllForums,
                setAllForums,
                getComments,
                setComments,
                getForum,
                setForum,
                getCurrentPage,
                setCurrentPage,
                getForumCount,
                setForumCount
            }}>
                <BrowserRouter>
                    <Toolbar/>
                    <Routes>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                        <Route path="/forum/:id" element={<ForumPage/>}/>
                        <Route path="/favorites" element={<FavoritePage/>}/>
                    </Routes>
                </BrowserRouter>
            </MyContext.Provider>
        </div>
    );
}

export default App;
