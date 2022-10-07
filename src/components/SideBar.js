import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { tagsURL } from "../utils/Constant";
import Loader from "./Lodder";

function SideBar(props) {
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        getAllTags();
    },[])

    function getAllTags() {
        fetch(tagsURL).then((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json();
        }
        ).then((data) => setAllTags(data.tags));
    }

    if(!allTags.length) {
        return(
            <div className="bg-gray-200 ml-5 py-3 px-3 w-1/4">
                <Loader/>
            </div>
        )
    }
    return(
        <div className="bg-gray-200 ml-5 py-3 px-3 w-1/4">
            <h6>Popular Tags</h6>
            <ul className="flex flex-wrap gap-2 mt-2">
                {
                    allTags.map(tag => (
                        <button className= "bg-gray-400 px-2 rounded-3xl font-semibold" key={tag} type="button" onClick={() => props.addTag(tag)}><NavLink to={`/#${tag}`}>{tag}</NavLink></button>
                    ))
                }
            </ul>
        </div>
    )

}

export default SideBar;