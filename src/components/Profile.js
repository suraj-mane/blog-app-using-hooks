import { useState,useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { articlesURL } from "../utils/Constant";
import User from "../contextApi/User";
import Post from "./Post";
import ProfileBanner from "./ProfileBanner";
import Loader from "./Lodder";

function Profile() {
    const [articles, setArticles] = useState(null);
    const [activeTab, setActiveTab] = useState("author");
    const [Profile, setProfile] = useState(null);
    const {username} = useParams();
    const {user} = useContext(User);

    useEffect(() => {
        fetchProfile();
    },[activeTab])

    function fetchProfile() {
        let name = ""
        if(username){
            name = username;
        } else {
            name = user.username;
        }

        fetch(articlesURL + `/?${activeTab}=${name}`)
        .then((res) => res.json())
        .then((data) => setArticles(data.articles));
    }
    

    return(
        <div>
            <div className="bg-green-500">
            {
                articles !== null ? <ProfileBanner user={articles[0]}/> : ""
            }
            </div>
                <div className="w-3/4 mx-auto mt-5">
                    <ul className="flex border-b-2 gap-6 ">
                        <li className={activeTab === "author" ? "font-medium border-b-2 border-green-500 text-green-500":"font-medium text-gray-500"} onClick={() => setActiveTab('author')}>My Article</li>
                        <li className={activeTab === "favorited" ? "font-medium border-b-2 border-green-500 text-green-500":"font-medium text-gray-500"} onClick={() => setActiveTab('favorited')}>Favorited Article</li>
                    </ul>
                    {
                        articles === null ? <Loader/> : articles.map((article,index) => (
                            <Post key={index} {...article}/>
                        ))
                    }
                </div>
        </div>
    )
}

export default Profile;
