'use client'

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {signIn, signOut, getProviders, useSession} from  'next-auth/react';
import Provider from './Provider';

export default function Nav() {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);


  useEffect(()=>{
    const setProviders = async () =>{
      const response = await getProviders();
      console.log(response);
      setProviders(response);
    }
    setProviders();
  }, []);

  return(
    <nav className="flex-between w-full mb-16 pt-3 ">
      {/* */
       /*__________________________ LOGO  ______________________ */
       /* */}
      
      <Link className="flex gap-2 flex-center" href="/">
        <Image 
        src = '/assets/images/logo.svg'
        alt='Prompy Logo'
        className='object-contain'
        height={80}
        width={80}
        />
        <p className="logo_text">Prompy</p>
      </Link>
      {/* */
       /*__________________________ Desktop Nav  ______________________ */
       /* */}
      <div className="sm:flex hidden">
        {
        isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            {/* */
             /*__________________________ Create Post  ______________________ */
             /* */}
            
            <Link className="black_btn" href="/create-prompt">
              Create Post
            </Link>
            {/* */
             /*__________________________ Sign Out  ______________________ */
             /* */}
            
            <button className="outline_btn" type="button" onClick={signOut}> Sign Out</button>
            {/* */
             /*__________________________ Profile  ______________________ */
             /* */}
            <Link href="/profile">
              <Image 
              src = '/assets/images/logo.svg' 
              alt='Profile Logo' 
              width={40} 
              height={40}
              className='rounded-full'
              />
            </Link>
          </div>
          
        ):(
        <>
        {
        providers && 
          Object.values(providers).map((provider) => (
            <button
            type='button'
            key={provider.name}
            onClick={()=> signIn(provider.id)}
            className='black_btn'
            >
              SignIn
            </button>
          ))
          
        }
        </>
        )
        }
      </div>
      {/* */
       /*__________________________ Mobile Nav  ______________________ */
       /* */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            {/* */
             /*__________________________ Profile Picture  ______________________ */
             /* */}
            
            <Image 
              src = '/assets/images/logo.svg' 
              alt='Profile Logo' 
              width={40} 
              height={40}
              className='rounded-full'
              onClick={()=>setToggleDropdown((prev)=> !prev)}
              />
              {/* */
               /*__________________________ Dropdown  ______________________ */
               /* */}
              {toggleDropdown && (
                <div className="dropdown">
                  {/* */
                   /*__________________________ My Profile  ______________________ */
                   /* */}
                  
                  <Link className="dropdown_link"
                  href="/profile"
                  onClick={()=> setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  {/* */
                   /*__________________________ Create Prompt  ______________________ */
                   /* */}
                  
                  <Link className="dropdown_link"
                  href="/create-prompt"
                  onClick={()=> setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  {/* */
                   /*__________________________ Sign Out Button  ______________________ */
                   /* */}
                  <button 
                    type='button'
                    onClick={()=> {
                      setToggleDropdown(false);
                      signOut();
                    }}
                  className="mt-5 w-full black_btn">
                    Sign Out
                  </button>
                </div>
              )}
          </div>
        ) : (
          <>
        {
        providers && 
          Object.values(providers).map((provider) => (
            <button
            type='button'
            key={provider.name}
            onClick={()=> signIn(provider.id)}
            className='black_btn'
            >
              SignIn
            </button>
          ))
          
        }
        </>
        )}
      </div>
    </nav>
  );
}