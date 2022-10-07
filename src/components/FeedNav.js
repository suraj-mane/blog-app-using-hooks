import { NavLink } from "react-router-dom";

function FeedNav(props){
    return(
        <div className="container w-10/12 px-3 mx-auto">
            <ul className="mt-10 flex gap-2 border-b-2"> 
                <li onClick={props.emptyTag}><NavLink className={(props.activeTag === "" && 'active' ? "border-b-2 border-green-500": " ")}  to="/">Global Feed</NavLink></li>
                {
                   props.activeTag ?  
                   <li><NavLink className={(props.activeTag && 'active' ? "border-b-2 border-green-500": " ")} to="/">#{props.activeTag}</NavLink></li> : ""
                }
            </ul>
        </div>
    )
}

export default FeedNav; 