import { useState } from "react";
import { articlesURL,localStoragKey } from "../utils/Constant";

function CreateComment(props) {
    const [body, setBody] = useState("");

    function addComment(event) {
        event.preventDefault();
        let slug = props.slug;
        fetch(articlesURL + `/${slug}/comments`, {
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Token ${localStoragKey}`,
            },
            body: JSON.stringify({
                comment:{body}
            })
        })
    }

    return(
        <div className="w-2/4 mx-auto mb-5">
            <form className="relative">
                <textarea className="border-2 w-full rounded py-2 pl-10 my-3" cols="50" name="body" placeholder="Write a Comment...." rows="4" type="text" value={body} onChange={ (event) => setBody(event.target.value)} />
                <div className="bg-gray-300 rounded p-2 text-right w-full inset-x-0 bottom-0 absolute">
                    <button className="bg-green-500 p-1 font-semibold rounded text-gray-50" type="submit" onClick={ addComment }>Post Comment</button>
                </div>
            </form>
        </div>
    )
}

export default CreateComment;