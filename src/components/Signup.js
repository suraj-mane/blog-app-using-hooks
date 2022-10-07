import React, { useState } from "react";
import { NavLink,useHistory } from "react-router-dom";
import { signupURL } from "../utils/Constant";
import validate from "../utils/Validate";

function Signup(props) {
    const [userInfo, setUserInfo] = useState({
        username:'',
        email:'',
        password:'',
        errors:'',
    });
    const [errors, setErrors] = useState({
        username:'',
        email:'',
        password:'',
    });
    const history = useHistory();
    console.log(userInfo, errors);

    function handleChange(event) {
        let { name, value } = event.target;
        validate( errors, name, value );
        setErrors({ ...errors });
        setUserInfo({...userInfo, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let { username,email,password } = userInfo;
        if( username && email && password ) {
            fetch(signupURL, {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user:{username,email,password}
                })
            }).then((res) => {
                if(!res.ok) {
                    return res.json().then(({errors}) => {
                        return Promise.reject(errors);
                    });
                }
                return res.json();
            }).then(({user}) => {
                props.updateUser(user);
                history.push("/");
            })
            .catch((error) => setUserInfo({...userInfo, errors:'Somthing went Wrong. please Try Again'}));
        } 
        if(!username && !email && !password) {
            setErrors({
                ...errors,
                username:"Username is Required",
                email:"email is Required",
                password:"Password is Required"
            })
        }
    } 
        
      return(
            <div className="mt-10">
                <div className="text-center mb-3">
                    <h1 className="text-4xl text-gray-600 font-medium">Sign Up</h1>
                    <p className="mt-2 text-green-500"><NavLink to="/login">Have an Account?</NavLink></p>
                </div>
                <div className="w-1/2 mx-auto text-right">
                    <form onSubmit={ handleSubmit }>
                        <input  className="border-2 rounded-xl w-full my-3 py-3 px-5" name="username" placeholder="Username" type="text"  value = {userInfo.username}  onChange={ (event) => handleChange(event) }/>
                        <p className="text-center text-red-500">{errors.username}</p>
                        <input className="border-2 rounded-xl w-full my-3 py-3 px-5" name="email" placeholder="Email" type="text" value = {userInfo.email} onChange={ (event) => handleChange(event) }/>
                        <p className="text-center text-red-500">{errors.email}</p>
                        <input  className="border-2 rounded-xl w-full my-3 py-3 px-5" name="password" placeholder="Password" type="text" value = {userInfo.password}  onChange={ (event) => handleChange(event) }/>
                        <p className="text-center text-red-500">{errors.password}</p>
                        <button  className="bg-green-500 rounded-xl font-medium py-3 px-10 text-center text-gray-50" type="submit" onClick={ handleSubmit }>Sign up</button>
                    </form>
                </div>
            </div>
        )
}

export default Signup;