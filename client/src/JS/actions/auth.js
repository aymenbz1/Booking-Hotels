import axios from 'axios'


export const register=async(user)=>await axios.post(`${process.env.REACT_APP_API}/register`,user)

export const login=async(user)=>await axios.post(`${process.env.REACT_APP_API}/login`,user)

//update the user in local storage : you send in parenth the user

export const updateUserInLocalStorage = (user, next) => {
 //make sur we have local storage :
    if (window.localStorage.getItem("auth")) {
      let auth = JSON.parse(localStorage.getItem("auth"));
      //auth has token and user : we take user 
      auth.user = user;
      localStorage.setItem("auth", JSON.stringify(auth));
      next();
    }
  };

 
