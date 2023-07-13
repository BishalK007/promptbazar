'use client'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {signIn, signOut, getProviders, useSession} from  'next-auth/react';

export default function Nav() {
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
      </Link>
    </nav>
  );
}


