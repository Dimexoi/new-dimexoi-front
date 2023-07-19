import Image from 'next/image'
import Hero from '@/components/Hero';

import NewArrivals from '@/components/NewArrivals'
import CustomMade from '@/components/CustomMade'

import truck from '../../public/images/home/icons/delivery.png';
import premium from '../../public/images/home/icons/premium.png';
import wood from '../../public/images/home/icons/wood.png';
import worker from '../../public/images/home/icons/worker.png';
import plan from '../../public/images/home/icons/plan.png';
import where from '../../public/images/home/icons/where.png';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className='h-full'>
      <Header home={true}/>
      <Hero />

      <main className='md:w-[70%] md:m-auto'>

        <NewArrivals/>

        <CustomMade/>

        <section className='mt-4 p-4 flex flex-col items-center'>

          <h3 className='text-3xl text-[#528BA8] font-raleway font-bold text-center'>Le mobilier en teck à La Réunion</h3>

          <h4 className='mt-4 self-start'>Avec Dimexoi profitez de :</h4>
          
          <div className='mt-4'>
            <div className='flex items-center'> <Image src={truck} alt="Truck Icon" className='h-7 w-7 mr-5'/> <p>La livraison sur <strong>toute l&apos;île</strong></p></div>
            <div className='flex items-center mt-2'> <Image src={premium} alt="Truck Icon" className='h-7 w-7 mr-5'/> <p>Une qualité <strong>premium</strong></p></div>
            <div className='flex items-center mt-2'> <Image src={wood} alt="Truck Icon" className='h-7 w-7 mr-5'/> <p>Mobiliers en réel <strong>bois massif</strong></p></div>
            <div className='flex items-center mt-2'> <Image src={worker} alt="Truck Icon" className='h-7 w-7 mr-5'/> <p>La conception par des <strong>artisans</strong></p></div>
            <div className='flex items-center mt-2'> <Image src={plan} alt="Truck Icon" className='h-7 w-7 mr-5'/> <p>Meuble unique grâce au <strong>sur-mesure</strong></p></div>
          </div>
                    
        </section>

        <section className='mt-2 p-2 flex flex-col items-center'>

          <h4 className='text-xl font-raleway font-bold text-center'>Venez nous rendre visite</h4>

          <div className='flex items-center mt-4'> <Image src={where} alt="Truck Icon" className='h-7 w-7 mr-5'/> <p>8 rue Benjamin Hoareau – ZI n°3 – Saint Pierre</p></div>

          <div className='mt-4 w-full px-10'>

            <div className='flex justify-between text-gray-400'> <span>Lundi</span> <span>Fermé</span></div>
            <div className='flex justify-between'> <span>Mardi</span> <span>9h00 - 17h00</span></div>
            <div className='flex justify-between'> <span>Mercredi</span> <span>9h00 - 17h00</span></div>
            <div className='flex justify-between'> <span>Jeudi</span> <span>9h00 - 17h00</span></div>
            <div className='flex justify-between'> <span>Vendredi</span> <span>9h00 - 17h00</span></div>
            <div className='flex justify-between'> <span>Samedi</span> <span>9h00 - 17h00</span></div>
            <div className='flex justify-between text-gray-400'> <span>Dimanche</span> <span>Fermé</span></div>
            
          </div>
                    
        </section>
      </main>
    </div>
    
  )
}
