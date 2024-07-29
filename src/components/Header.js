import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase";
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addUser, removeUser} from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { photoURL } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector ((store) => store.gpt.showGptSearch)
  const handleSignOut = () =>{
   
  signOut(auth)
  .then(() => {
    
  })
  .catch((error) => {
    // An error happened.
  });
  }
  useEffect (() =>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const {uid, email, displayName} = user;
        dispatch 
        (addUser({
          uid:uid, 
          email: email,
           displayName:displayName }))
        navigate ("/browse");
      } 
      else {
        dispatch (removeUser());
        navigate ("/");
      }
    });
    //unsubcribe when component unmounts 
    return () => unsubscribe();
   }, []);

   const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
   }
    const handleLanguageChange = (e) => {
       dispatch (changeLanguage(e.target.value))
    };

  
  return (
    <div className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
     <img className="w-44" 
    src= {LOGO}
    alt="logo"></img> 

   {user && ( <div className='flex p-4'>

    {showGptSearch && (<select className='p-2 bg-gray-400 text-white m-2' onChange= {handleLanguageChange}>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option key = {lang.identifier} value ={lang.identifier}>
          {lang.name}
          </option>))}
     
    </select>
    )}
    <button className='py-2 px-4 m-2 bg-purple-700 rounded-lg text-white' onClick={handleGptSearchClick}>
      {showGptSearch ? "Homepage" : "GPT Search"}
    </button>

      <img className='w-10 h-10'  alt= "usericon" src= {photoURL}></img>
      <button onClick = {handleSignOut} className='font-bold text-white'>Sign Out</button>
    </div>)}
    </div>
  )
}

export default Header