import React from 'react'
import Header from './Header'
import { useState, useRef } from "react";
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from '../utils/firebase';
import { AVTAR_ICON } from '../utils/constants';
import { addUser } from '../utils/userSlice';
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState (true);
  const [errorMessage,setErrorMessage]= useState(null);
  
  const name = useRef (null);
  const email = useRef(null);
  const password = useRef (null);
  
  const handleButtonClick =()=>{
  
   const message=checkValidData (email.current.value, password.current.value);
   setErrorMessage(message);
   if(message) return;

     //Sign In/SignUp Logic
     if(!isSignInForm){
       // Signed up Logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
     .then((userCredential) => {
   
    const user = userCredential.user;
   

    updateProfile(user, {
      displayName: name.current.value, 
      photoURL: AVTAR_ICON,
    })
    .then(() => {
      const {uid, email, displayName, photoURL}= auth.currentUser;
      dispatchEvent(
        addUser ({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        })
      )
    
    }).catch((error) => {
      setErrorMessage (error.message);
    });
  
  })

   .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
    
  });

     }
     else{
      //Sign In Logic
      
     signInWithEmailAndPassword(auth, email.current.value, password.current.value)
     .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });

     }

  }
   const toggleSignInForm =() =>{
     setIsSignInForm (!isSignInForm);
   }
  return (
    <div>
      <Header />
      <div className='absolute'>
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt="bgimg"></img>
      </div>

      <form onSubmit = {(e) => e.preventDefault()}
      className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80'>
       <h1 className='font-bold text-3xl py-4 text-white'>
        {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
        <input 
        type="text" 
        placeholder="Full Name" 
        className="p-4 my-4 w-full bg-gray-600 rounded-lg">
        </input>
        )}

       <input ref ={email} type ="text" placeholder ="Email Address" className='p-4 my-4 w-full bg-gray-500 rounded-lg' />
       
       
       <input ref ={password} type ="password" placeholder ="Password" className='p-4 my-4 w-full bg-gray-500 rounded-lg' />
        
        <p className='text-red-600 font-semibold p-4'>{errorMessage}</p>
       
       <button className ="p-4 my-4 bg-red-700 w-full rounded-lg font-semibold" onClick ={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

       <p className="py-4 text-white cursor-pointer"  onClick = {toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered ? Sign In Now."}</p>
      </form>
    </div>
  );
};

export default Login;