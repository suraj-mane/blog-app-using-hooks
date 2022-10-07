import { useEffect, useState } from "react";
import { useParams,useHistory } from "react-router-dom";
import { articlesURL,localStoragKey } from "../utils/Constant";

function NewPost() {
    const { slug } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [body, setBody] = useState("");
    const [tag, setTag] = useState("");
    const storageKey = localStoragKey;
    const history = useHistory();
    
    useEffect(() => {
        getArticle()
    },[]);
    
    function getArticle() {
        let URL = articlesURL + `/${slug}`;
        fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            setTitle(data.article.title);
            setDescription(data.article.description);
            setBody(data.article.body);
            setTag(data.article.tagList)
        })
    }
    
    function addArticle(event) {
        event.preventDefault();
        let tagList = tag.split(" ");
        let URL;
        let method;
        if(slug){
            method="PUT",
            URL = articlesURL + `/${slug}`;
        } else {
            method = "POST",
            URL = articlesURL
        }

        if(storageKey) {
            fetch(URL, {
                method,
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Token ${storageKey}`,
                },
                body:JSON.stringify({ article:{title,description,body,tagList} })
                })
                .then((res) => res.json())
                .then((article) => { history.push(`/article/${article.article.slug}`);  
            })
        }
    }

    return (
        <div className="w-10/12 mt-10 mx-auto">
            <form className="text-right" >
                <input  className="border-2 w-full rounded py-2 pl-10" name="title" placeholder="Article Title" type="text"   value={title} onChange={ (event) => setTitle(event.target.value) } />
                <input className="border-2 w-full rounded py-2 pl-10 my-3" name="description" placeholder="What's this article about?" type="text" value={description} onChange={ (event) => setDescription(event.target.value) } />
                <textarea className="border-2 w-full rounded py-2 pl-10 my-3" cols="50" name="body" placeholder="Write you article(in markdown)" rows="4" type="text" value={body} onChange={ (event) => setBody(event.target.value) }/>
                <input className="border-2 w-full rounded py-2 pl-10 my-3" name="tag" placeholder="Enter tags" type="text" value={tag} onChange={ (event) => setTag(event.target.value) }/>
                <button className="bg-green-500 px-10 py-3 rounded text-gray-50 font-semibold" type="submit" onClick={addArticle}>Publish Article</button>
            </form>
        </div>
    )
}

export default NewPost;