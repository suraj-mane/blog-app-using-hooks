import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import User from "../contextApi/User";
import { ROOT_URL,localStoragKey } from "../utils/Constant";
import Loader from "./Lodder";

function ProfileBanner(props) {
    let { user } = useContext(User);
    let [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile();
    },[])

    function fetchProfile() {
        let  username  = props.user;
        let name = ""
        if(username){
            name = username.author.username;
        } else {
            name = user.username;
        }

        fetch(ROOT_URL + `profiles/${name}`, {
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Token ${localStoragKey}`,
            },
        })
        .then((res) => res.json())
        .then((data) => setProfile(data.profile));
    }

    function followUser(following,username) {
        let method = "";
        if(following) {
            method = "DELETE";
        } else {
            method = "POST";
        }

        fetch(ROOT_URL + `profiles/${username}/follow`, {
            method,
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Token ${localStoragKey}`,
            },
        })
        .then((res) => {
            if(res.ok) {
                fetchProfile();
            }
        })
        .then((data) => {setProfile(data.profile)});
    }

    if(profile === null ) {
        return <Loader/>
    } 
    return(
        <div className="py-10 text-center w-3/4 mx-auto">
            <img className="rounded-full w-20 h-20 mx-auto border-4 border-gray-50" src={profile.image || "https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png"} alt=""/>
            <h1 className="text-3xl font-semibold text-gray-50 my-3">{profile.username}</h1>
            <p className="text-gray-50">{profile.bio}</p>
            <div className="text-right">
                {
                    user.username === profile.username ?
                    <NavLink to="/settings"><button className="border-2 p-2 text-gray-50 font-semibold "><i className="fa-solid fa-gear"></i> Edit Profile Settings</button></NavLink> : <>
                    {
                        profile.following ? 
                        <button className={profile.following === true ? "border-2 border-red-500 p-2 text-red-500 font-semibold":" "} onClick={ () => followUser(profile.following,profile.username) }>- UnFollow {profile.username}</button> : 
                        <button className={profile.following === false ? "border-2 p-2 text-gray-50 font-semibold" : ""} onClick={ () => followUser(profile.following,profile.username) }>+ Follow {profile.username}</button> 
                    } 
                    </>
                }
            </div>
        </div>
    )
}

export default ProfileBanner;