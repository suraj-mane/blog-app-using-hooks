import { useEffect, useState } from "react";
import { articlesURL } from "../utils/Constant";
import Loader from "./Lodder";

function ShowComment(props) {
    let {comments} = props;
    
    if(comments === null) {
        return <Loader/>
    } else {
        return (
            <div>
                {
                    !comments.length ? 
                    <p className="py-5 px-2 border-2 rounded">No Comment</p> :
                    comments.map(comment => (
                        <div className="w-2/4 mx-auto mb-5" key={comment.id} >
                            <div>
                                <div className="py-5 px-2 border-2 rounded">{comment.body}</div>
                                <div className="bg-gray-300 rounded p-2 text-right w-full flex justify-between">
                                    <div className="flex">
                                        <img  alt="profile" className="h-10 w-10 rounded-full" src={comment.author.image}/>
                                        <h2 className="ml-2 text-green-500">{comment.author.username}</h2>
                                    </div>
                                    <button className="p-1 font-semibold rounded text-green-500" type="submit" /><i className="fa-solid fa-trash" />
                                </div>
                            </div>
                        </div>
                    ))  
                }
            </div>
        )
    }
}

export default ShowComment;