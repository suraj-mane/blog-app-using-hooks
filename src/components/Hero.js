import { useEffect, useState } from "react";
import {ArticlesURL,localStoragKey} from "../utils/Constant";
import Banner from "./Banner";
import Post from "./Post";
import FeedNav from "./FeedNav";
import SideBar from "./SideBar";
import Loader from "./Lodder";
import Pagination from "./Pagination";


function Hero() {
    const [ articles, setArticles ] = useState([]);
    const [error, setError] = useState("");
    const [activeTag, setActiveTag] = useState("");
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
       fetchData();
    },[activeTag,activePage]);

    function fetchData() {
        let limit = 10;
        let offset = (activePage - 1) * limit;
        
        fetch(ArticlesURL + `?offset=${offset}&limit=${limit}` + ( activeTag && `&tag=${activeTag}`),{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Token ${localStoragKey}`,
            }
        })
        .then((res) => res.json())
        .then((data) => setArticles(data))
    }

    function emptyTag() {
        setActiveTag("");
    }

    function addTag(tag) {
        setActiveTag(tag);
    }

    function updateActivePage(index) {
        setActivePage(index);
        fetchData();
    }

    function handleClickToggle(slug,favorited) {
        let method = "";
        if(favorited === true ) {
            method = "DELETE";
        } else {
            method = "POST";
        }

        fetch(ArticlesURL + `/${slug}/favorite`, {
            method,
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Token ${localStoragKey}`,
            }
        })
        .then((res) => {
            if(res.ok){
                fetchData();
            }
        })
    }

    if(articles.articles) {
        return (
            <div>
                <Banner/>
                <FeedNav activeTag={activeTag} emptyTag={emptyTag}/>
                <div className="w-10/12 mx-auto flex">
                    <div className="w-3/4 h-fit">
                        {
                            articles.articles.map((article) =>(
                               <Post key={article.slug}  {...article} handleClickToggle={handleClickToggle} />
                            ))
                        }
                        <Pagination articles={articles} updateActivePage={updateActivePage} activePage={activePage} />
                    </div>
                    <SideBar addTag={addTag}/>
                </div>
            </div>  
         )
    }

    return (
        <div className="text-gray-900">
            <Loader/>
        </div>
    )
}

export default Hero;