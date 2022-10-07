import { useEffect, useState } from "react";
import { useParams,NavLink,Link,useHistory } from "react-router-dom";
import { articlesURL,localStoragKey } from "../utils/Constant";
import { useContext } from "react";
import User from "../contextApi/User";
import Loader from "./Lodder";
import ShowComment from "./ShowComment";
import CreateComment from "./CreateComment";



function SingleArticle() {
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState(null);
    const [error,setError] = useState("");
    let {slug} = useParams();
    let {user} = useContext(User);
    let storagekey = localStoragKey;
    const history = useHistory();

    useEffect(() => {
        getArticle();
        fetchComment();
    },[comments])

    function getArticle() {
        const URL = `/${slug}`;
        fetch(articlesURL + URL).then((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json()
        }).then((data) => setArticle(data.article))
    }

    function fetchComment() {
        fetch(articlesURL + `/${slug}/comments`)
        .then((res) => res.json())
        .then((data) => setComments(data.comments));
    }

    function handleDelete() {
        event.preventDefault()
        const URL = `/${slug}`;
        fetch(articlesURL + URL,{
            method:"DELETE",
            headers:{
                Authorization: `Token ${storagekey}`,
            },
        })
        .then((res) => {
            history.push("/")
        })
        .catch((error) => setError("Something went wrong"));
    }

    if(article === null){
        return(
            <Loader/>
        )
    }
    return(
        <section>  
            <div className="bg-gray-700">
                <div className="py-10 container w-10/12 mx-auto">
                    {
                        error ? <p className="text-red-500 text-xl text-center">{error}</p> :" "
                    }
                     <h1 className="font-semibold text-6xl text-gray-50">{article.title}</h1>
                     <div className="flex mt-10">
                         <img className="rounded-full w-10 h-10" src={article.author.image || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Fcartoon-drawing-programmer_20243808.htm&psig=AOvVaw1VWVlsrCbUdxQ51QB7xPRa&ust=1665107981717000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMiQ3d_AyvoCFQAAAAAdAAAAABAE"} alt="author_name"/>
                         <div className="ml-2">
                            <h5 className="text-gray-50">{article.author.username}</h5>
                         </div>
                        {
                            user ? (
                                <div>
                                    <button className="border-2 border-red-500 text-red-500 p-1 ml-2" type="submit" onClick={ handleDelete }>Delete Post</button>
                                    <NavLink className="text-green-500 border-2 border-green-500 p-1 ml-2" to={`/new-post/${article.slug}`}>Edit Post</NavLink>
                                </div>
                            ) : " "
                        }
                     </div>
                 </div>
             </div>
             <div className='container w-10/12 mx-auto'>
                 <p className='text-2xl my-10'>{article.body}</p>
                 {
                     article.tagList.map(tag  => (
                         <span  className=" border-2 border-gray-300 text-gray-300 px-3 rounded-3xl font-semibold" key={tag}>{tag}</span>
                     ))
                 }
                 <hr className='mt-10'/>
            </div>
            {
                !user ? 
                (
                <footer className="text-center">
                    <p>
                        <Link className="text-green-500" to='/login'>Sign in</Link> or  
                        <Link className="text-green-500 ml-1" to='/signup'>Sign up</Link> to add comment on this article.
                    </p>
                </footer>
                ): <> <CreateComment slug={slug} /> <ShowComment comments={comments}/></>
            }
        </section>

    )
}

export default SingleArticle;