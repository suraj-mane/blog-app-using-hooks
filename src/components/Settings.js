import User from "../contextApi/User";
import{ useContext, useState } from "react";
import { localStoragKey, ROOT_URL } from "../utils/Constant";

function Settings(props) {
    const { user } = useContext(User);
    const [image, setImage] = useState(user.image);
    const [username, setUserName] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);

    function hadleSubmit() {
        fetch(ROOT_URL + 'user', {
            method:"PUT",
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Token ${localStoragKey}`,
            },
            body: JSON.stringify({
                user:{username,image,bio,email,password}
            })
        });
    }

    return (
        <div className="w-1/2 mx-auto">
            <h1 className="my-3 text-4xl text-center text-gray-600">Your Settings</h1>
            <form className="text-right">
                <input type="text" name="image" className="border-2 w-full  rounded py-2 pl-10" placeholder="URL of Profile Picture" value={image} onChange={ (event) => setImage(event.target.value) }/>
                <input type="text" name="username" className="border-2 w-full my-3 rounded py-2 pl-10" placeholder="" value={username} onChange={ (event) => setUserName(event.target.value) } />
                <textarea type="text" name="bio" className="border-2 w-full rounded py-2 pl-10 my-3"  rows="4" cols="50" placeholder="Short bio about you" value={bio} onChange={ (event) => setBio(event.target.value) }></textarea>
                <input type="text" name="email" className="border-2 w-full my-3 rounded py-2 pl-10" placeholder="" value={email} onChange={ (event) => setEmail(event.target.value) } />
                <input type="text" name="password" className="border-2 w-full my-3 rounded py-2 pl-10" placeholder="New Password" onChange={ (event)  => setPassword(event.target.value) } />
                <button className="bg-green-500 px-10 py-3 rounded text-gray-50 font-semibold" onClick={ hadleSubmit }>Update Settings</button>
            </form>
            <hr className="my-3"/>
            <button className="border-2 border-red-900 text-red-900 font-semibold py-2 px-2 mb-5 rounded" type="button" onClick={props.logOutUser}>Or click here to logout</button>
        </div>
    )
}

export default Settings;