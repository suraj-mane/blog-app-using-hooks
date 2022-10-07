import {NavLink, Link} from "react-router-dom";

function Post(props){
    let {author,title,description,tagList,favoritesCount,favorited,slug,handleClickToggle} = props;
    
    return (
        <div className="border-b-2">
            <div className="flex mt-5 mb-2 justify-between">
                <div className="flex">
                    <img className="rounded-full w-10 h-10" src={author.image} alt={author.username}/>
                    <div className="ml-2">
                        <NavLink to={`/profile/${author.username}`}>
                            <h5 className="text-green-500">{author.username}</h5>
                        </NavLink>
                    </div>
                </div>
                <div className="">
                    {
                        <p className="border-2 border-green-500 px-3 rounded text-green-500" onClick={ () => handleClickToggle(slug,favorited) }><i className="fa-solid fa-heart"></i> {favoritesCount}</p> 
                    }
                </div>
            </div>
            <div>
                <Link to={`/article/${slug}`}>
                    <h1 className="text-2xl font-semibold break-all">{title}</h1>
                    <p className="text-gray-300">{description}</p>
                </Link>
                <div className="flex justify-between my-5">
                    <p className=" text-gray-300"><NavLink  to={`/article/${slug}`}>Read more...</NavLink></p>
                    <div className="flex">
                        {
                            tagList.map((tag,i)=>(
                                <p key={i} className=" border-2 border-gray-300 text-gray-300 px-3  mx-1 rounded-3xl font-semibold">{tag}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;