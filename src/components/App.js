import { Switch, Route,useHistory } from "react-router-dom";
import { useState, useReducer, useEffect } from "react";
import User from "../contextApi/User";
import { userVerifyURL,localStoragKey } from "../utils/Constant";
import Header from "./Header";
import Hero from "./Hero";
import Login from "./Login";
import Signup from "./Signup";
import NewPost from "./NewPost";
import Profile from "./Profile";
import Settings from "./Settings";
import SingleArticle from "./SingleArticle";
import NoMatch from "./NoMatch";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

let insialState = {
  isLogin:false,
  user:null,
  userVerify:false
}

function reducer(state = insialState, action) {
  switch(action.type){
    case "updatUser":
      state.user = action.payload;
      state.isLogin = true;
      localStorage.setItem("localStoragKey",action.payload.token);
      state.userVerify = true;
      return {...state};
    case "logOutUser":
      state.isLogin = false;
      localStorage.clear();
      return {...state};
    case "userNotVerify":
      state.isLogin = false;
      state.userVerify = false;
      return {...state};
    default : 
      return {...state};
  }
}



function App() {
  const [state, despatch] = useReducer(reducer, insialState);
  let history = useHistory()
  
  useEffect(() => {
    userVerify()
  },[]);
  
  function updateUser(user) {
    despatch({
      type:"updatUser",
      payload:user
    })
  }

  function userNotVerify() {
    despatch({
      type:"userNotVerify"
    })
  }
  
  function userVerify() {
    const storageKey = localStoragKey;
    if(storageKey){
      fetch(userVerifyURL,{
        method :'GET',
        headers: {
          Authorization: `Token ${storageKey}`,
        },
      })
      .then((res) => {
        if(res.ok){
          return res.json();
        }
        return res.json().then(({ error }) => {
          return Promise.reject(error);
        })
      })
      .then(({user}) => updateUser(user));
    } else {
      userNotVerify();
    }

  }

  function logOutUser() {
    despatch({
      type:"logOutUser",
    })
    history("/");
  }
  
  return (
    <ErrorBoundary>
      <User.Provider value={state}>
      <Header/>
      {
        state.isLogin ? <AuthenticatedApp logOutUser={ logOutUser }/> : <UnAuthenticatedApp updateUser={updateUser} logOutUser={logOutUser} />
      }
      </User.Provider >
    </ErrorBoundary>
  );
}

function AuthenticatedApp(props) {
  return (
      <Switch>
        <Route path="/" exact>
            <Hero/>
        </Route>
        <Route path="/new-post" exact>
          <NewPost/>
        </Route> 
        <Route path="/new-post/:slug">
          <NewPost/>
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/settings">
          <Settings logOutUser={ props.logOutUser } />
        </Route>
        <Route path="/article/:slug">
          <SingleArticle />
        </Route>
        <Route path="*">
          <NoMatch/>
        </Route>
      </Switch>
  )
}

function UnAuthenticatedApp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Hero/>
      </Route> 
      <Route path="/login">
        <Login updateUser={ props.updateUser } />
      </Route>
      <Route path="/signup">
        <Signup updateUser={ props.updateUser } />
      </Route>
      <Route path="/article/:slug">
        <SingleArticle/>
      </Route>
      <Route path="*">
        <NoMatch/>
      </Route>
    </Switch>
  )
}

export default App;
