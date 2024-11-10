// Work.tsx

"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import OrderForm from './OrderForm'; 

interface workdata {
    imgSrc: string;
    heading: string;
    subheading: string;
    hiddenpara: string;
}

const workdata: workdata[] = [
    {
        imgSrc: '/images/Work/icon-one.svg',
        heading: 'Click Buy',
        subheading: 'Fill in the details of your trade and generate an order to share with us.',
        hiddenpara: 'Specify your coin (USDT or LTC), currency (TRY or USD), wallet details, and payment type. Once complete, send the order to us via WhatsApp.',
    },
    {
        imgSrc: '/images/Work/icon-two.svg',
        heading: 'Make Payment',
        subheading: 'Choose to pay via cash or through İşbank.',
        hiddenpara: 'Ensure payment confirmation for a smooth and quick transaction.',
    },
    {
        imgSrc: '/images/Work/icon-three.svg',
        heading: 'Receive Your Crypto',
        subheading: 'Once the payment is verified, your crypto will be transferred.',
        hiddenpara: 'Receive USDT or LTC in your specified wallet within minutes.',
    },
];

const Work = () => {
    const [transactionType, setTransactionType] = useState<null | 'Buy' | 'Sell'>(null);

    return (
        <div>
            <div className='mx-auto max-w-7xl mt-16 px-6 mb-20 relative'>
                <div className="radial-bgone hidden lg:block"></div>
            
                {
                    transactionType || (
                         <div className='flex align-middle justify-center mt-6'>
                            <button
                                onClick={() => setTransactionType('Buy')}
                                className='text-lg font-semibold bg-white text-blue-600 py-3 px-8 rounded-full shadow-lg mr-4'
                            >
                                Buy Now
                            </button>
                            {/* <button
                                onClick={() => setTransactionType('Sell')}
                                className='text-lg font-semibold bg-white text-blue-600 py-3 px-8 rounded-full shadow-lg'
                            >
                                Sell Now
                            </button> */}
                        </div>
                    )
                }
               

                {/* Conditionally render the OrderForm */}
                {transactionType && (
                    <OrderForm
                        transactionType={transactionType}
                        onClose={() => setTransactionType(null)}
                    />
                )}
               
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-5 mt-32'>
                    {workdata.map((items, i) => (
                        <div className='card-b p-8' key={i}>
                            <div className='work-img-bg rounded-full flex justify-center absolute p-6'>
                                <Image src={items.imgSrc} alt={items.imgSrc} width={44} height={44} />
                            </div>
                            <div>
                                <Image src={'/images/Work/bg-arrow.svg'} alt="arrow-bg" width={85} height={35} />
                            </div>
                            <h3 className='text-2xl text-offwhite font-semibold text-center mt-8'>{items.heading}</h3>
                            <p className='text-base font-normal text-bluish text-center mt-2'>{items.subheading}</p>
                            <span className="text-base font-normal m-0 text-bluish text-center hides">{items.hiddenpara}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Image src={'/images/Table/Untitled.svg'} alt="ellipse" width={2460} height={102} className="md:mb-40 md:-mt-6" />
        </div>
    )
}

export default Work;
