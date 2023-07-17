import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import facebook from '../../public/images/footer/facebook.png';
import instagram from '../../public/images/footer/instagram.png';
import linkedin from '../../public/images/footer/linkedin.png';

const Footer = () => {
  return (
    <footer className='flex-col bg-black text-white p-4'>
      <div className='flex justify-around mx-20'>
          <Link href='' className='flex items-center'> <Image src={facebook} alt="Facebook Icon" className='h-7 w-7 mr-5'/></Link>
          <Link href='' className='flex items-center'> <Image src={instagram} alt="Instagram Icon" className='h-7 w-7 mr-5'/></Link>
          <Link href='' className='flex items-center'> <Image src={linkedin} alt="Linkedin Icon" className='h-7 w-7 mr-5'/></Link>
      </div>
      <div className='flex justify-between mt-4'>
        
        <div>
          <h5>Nous contacter</h5>
          <p className='text-sm mt-2'>0262 000 000</p>
          <p className='text-sm mt-1'>adresse@domain.fr</p>
          <p className='text-sm mt-2'>8 rue Benjamin Hoareau</p>
          <p className='text-sm mt-1'>ZI n°3</p>
          <p className='text-sm mt-1'>97410 Saint-Pierre</p>
          <p className='text-sm mt-1'>La Réunion</p>
        </div>
        <div className='flex flex-col'>
          <Link href='/'>Plan du site</Link>
          <Link href='/'>Mentions légales</Link>
          <Link href='/'>Politique de confidentialité</Link>
          <Link href='/'>Cookies</Link>
           
        </div>
      </div>
      
      <p className='mt-2 text-sm text-center'>© DIMEXOI {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer;
