import { NavLink,useHistory} from "react-router-dom";
import { loginURL } from "../utils/Constant";
import validate  from "../utils/Validate";
import { useState } from "react";

function Login(props) {
    const [userInfo, setUserInfo] = useState({
        email:'',
        password:'',
        errors:'',
    });
    const [errors, setErrors] = useState({
        email:'',
        password:'',
    });
    const history = useHistory();

    function handleChange(event) {
        let { name, value } = event.target;
        validate( errors, name, value );
        setErrors({ ...errors });
        setUserInfo({...userInfo, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let {email, password } = userInfo;

        if( email && password ) {
            fetch(loginURL, {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user:{email,password}
                })
            }).then(async (res) => {
                if(!res.ok) {
                    const { errors } = await res.json();
                    return await Promise.reject(errors);
                }
                return res.json();
            }).then(({user}) => {
                props.updateUser(user);
                history.push("/")
            })   
            .catch((errors) => setUserInfo({...userInfo,errors}));
        }
        if( !email && !password) {
            setErrors({
                ...errors,
                email:"email is Required",
                password:"Password is Required"
            })
        }
    }
    
    return(
        <div className="mt-10">
            <div className="text-center mb-3">
                <h1 className="text-4xl font-medium">Sign In</h1>
                <p className="mt-2 text-green-500"><NavLink to="/signup">Need an Account?</NavLink></p>
            </div>
            <div className="w-1/2 mx-auto text-right">
                <form onSubmit={ handleSubmit }>
                    <input className="border-2 rounded-xl w-full my-3 py-3 px-4" name="email" placeholder="Email" type="text" value={userInfo.email} onChange={ (event) => handleChange(event) }/>
                    <p className="text-center text-red-500">{errors.email}</p>
                    <input  className="border-2 rounded-xl w-full my-3 py-3 px-4" name="password" placeholder="Password" type="text" value={userInfo.password} onChange={ (event) => handleChange(event) }/>
                    <p className="text-center text-red-500">{errors.password}</p>
                    <button className="bg-green-500 rounded-xl font-medium py-3 px-10 text-center text-gray-50" type="submit" onClick={ handleSubmit }>Sign in</button>
                </form>
            </div>
        </div>
    )
    
}

export default Login;