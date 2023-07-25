
'use client'

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleMobileMenu, setHasScroll } from '@/redux/features/configSlice';

interface myProps {
  home: boolean
}

const Header = ({home}: myProps) => {

  const dispatch = useAppDispatch();

  const mobileMenu = useAppSelector(state => state.config.mobileMenu);
  const hasScroll = useAppSelector(state => state.config.hasScroll);

  useEffect(() => {
    const handleScroll = () => {
      if (window && window.scrollY) {
        if (window.scrollY >= 90) {
          dispatch(setHasScroll(true));
        } else {
          dispatch(setHasScroll(false));
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
  }, [])

  const handleClickMenu = () => {
    dispatch(toggleMobileMenu(!mobileMenu));
  }

  return (
    <div className={home ? hasScroll ?
      'fixed left-0 top-0 z-30 w-full items-center justify-between flex bg-white text-black py-8 px-5 drop-shadow-xl duration-300'
    :
      'fixed left-0 top-0 z-30 w-full items-center justify-between flex text-white py-8 pb-8 px-5 duration-300'
    : hasScroll ?
      'sticky left-0 top-0 z-30 w-full items-center justify-between flex bg-white text-black py-8 pb-8 px-5 drop-shadow-xl duration-300'
    :
      'sticky left-0 top-0 z-30 w-full items-center justify-between flex bg-black text-white py-8 pb-8 px-5 duration-300'}

    >
      {home ? 
        <Link href='/'>
          <h1 className='relative flex flex-col items-center justify-center'>
              <span className='text-2xl mb-[-1] font-normal leading-6 tracking-wide'>DIMEXOI</span>
              <span className='text-sm leading-3 font-light tracking-wide'>Mobilier en teck</span>
              <span className={hasScroll ? "absolute h-full border-2 border-black px-10 py-9 after:content-[''] brokeborder" : "absolute h-full border-2 px-10 py-9 after:content-[''] brokeborder"} />
          </h1>
        </Link>

        :

        <Link href='/'>
          <div className='relative flex flex-col items-center justify-center'>
              <span className='text-2xl mb-[-1] font-normal leading-6 tracking-wide'>DIMEXOI</span>
              <span className='text-sm leading-3 font-light tracking-wide'>Mobilier en teck</span>
              <span className={hasScroll ? "absolute h-full border-2 border-black px-10 py-9 after:content-[''] brokeborder" : "absolute h-full border-2 px-10 py-9 after:content-[''] brokeborder"} />
          </div>
        </Link>
      }

      <div onClick={handleClickMenu} className=' md:hidden flex flex-col justify-between h-5 z-30'>

        <span className={hasScroll ? mobileMenu ? 'hamburger-line--active hamburger-line--scroll z-30' : 'hamburger-line--scroll' : mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>
        <span className={hasScroll ? mobileMenu ? 'hamburger-line--active hamburger-line--scroll z-30' : 'hamburger-line--scroll' : mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>
        <span className={hasScroll ? mobileMenu ? 'hamburger-line--active hamburger-line--scroll z-30' : 'hamburger-line--scroll' : mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>

      </div>

      <nav className={mobileMenu ?
          'absolute top-[99%] bg-white text-black  left-0 right-0 w-full ease-in duration-300'
        :
          'absolute top-[99%] bg-white text-black  left-[-100%] right-0 w-full ease-in duration-300'
        }>
        <ul>
          <li onClick={handleClickMenu} className='mb-1 p-2' >
            <Link href='/'>Accueil</Link>
          </li >
          <li onClick={handleClickMenu} className='mb-1 p-2' >
            <Link href='/catalogue'>Catalogue</Link>
          </li >
          <li onClick={handleClickMenu} className='mb-1 p-2' >
            <Link href='/surmesure'>Sur-mesure</Link>
          </li >
          <li onClick={handleClickMenu}className='mb-1 p-2'>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>

      <nav className='hidden md:block'>
        <ul className='flex flex-row'>
          <li className='mr-1 p-2' >
            <Link href='/'>Accueil</Link>
          </li >
          <li className='mr-1 p-2' >
            <Link href='/catalogue'>Catalogue</Link>
          </li >
          <li className='mr-1 p-2' >
            <Link href='/surmesure'>Sur-mesure</Link>
          </li >
          <li className='mr-1 p-2'>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
      
    </div>

    
  )
}

export default Header
