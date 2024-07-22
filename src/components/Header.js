import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase";
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addUser, removeUser} from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { LOGO } from '../utils/constants';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
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


  
  return (
    <div className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
     <img className="w-44" 
    src= {LOGO}
    alt="logo"></img> 

   {user && ( <div className='flex py-4'>
      <img className='w-10 h-10' src="https://occ-0-3081-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229" alt= "usericon"></img>
      <button onClick = {handleSignOut} className='font-bold text-white'>Sign Out</button>
    </div>)}
    </div>
  )
}

export default Header