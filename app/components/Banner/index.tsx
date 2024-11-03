"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { FaCoins, FaBitcoin, FaBolt } from 'react-icons/fa';
import ModalVideo from 'react-modal-video';

const Banner = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className='bg-image relative' id="home-section">
            <div className='arrowOne'></div>
            <div className='radial-banner hidden lg:block'></div>
            {/* <ModalVideo channel='youtube' isOpen={isOpen} videoId="1YyAzVmP9xQ" onClose={() => setOpen(false)} /> */}

            <div className="mx-auto max-w-7xl pt-10 lg:pt-40 sm:pb-24 px-4 lg:px-6">
                <div className='height-work'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 my-10 lg:my-16'>
                        <div className='arrowTwo'></div>
                        <div className='col-span-7'>
                            <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-white md:4px md:text-start text-center">
                                 <FaBitcoin className="inline mx-1 text-yellow-500 transform transition-transform hover:scale-125 duration-300" />uy, Sell Crypto 
                            </h1>
                            <h2 className="text-xl lg:text-2xl text-white font-semibold text-center md:text-start mb-6">
                                with Low Fees & Instant Transfers
                            </h2>
                            <p className='text-white text-base lg:text-lg font-normal mb-8 text-center md:text-start'>
                                Experience hassle-free transactions with minimal fees <br className="hidden lg:inline"/> 
                                and get your crypto instantly. Join the future of finance!
                            </p>
                            <div className='flex align-middle justify-center md:justify-start'>
                                {/* <button className='text-base lg:text-xl font-semibold text-white py-3 px-5 lg:py-4 lg:px-8 navbutton mr-4'>Get Started</button> */}
                            </div>
                        </div>

                        <div className='col-span-5 lg:-m-48 mt-6 lg:mt-0'>
                            <div className='arrowThree'></div>
                            <div className='arrowFour'></div>
                            <div className='arrowFive'></div>
                            <Image src="/images/Banner/banner.png" alt="Crypto illustration" width={600} height={450} className="mx-auto lg:w-auto" />
                            <div className='arrowSix'></div>
                            <div className='arrowSeven'></div>
                            <div className='arrowEight'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;
