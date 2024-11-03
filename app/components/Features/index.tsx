import Image from "next/image";

interface featuresdata {
    imgSrc: string;
    heading: string;
    subheading: string;
}

const featuresdata: featuresdata[] = [
    {
        imgSrc: '/images/Features/featureTwo.svg',
        heading: 'Low Transaction Fees',
        subheading: 'Buy and sell crypto with some of the most competitive fees in the market, so you get more value out of each transaction.',
    },
    {
        imgSrc: '/images/Features/featureThree.svg',
        heading: 'Instant Transfers',
        subheading: 'Get your crypto instantly with fast, 24/7.',
    },
];

const Features = () => {
    return (
        <div className="container mx-auto max-w-7xl my-0 md:my-40 pt-36 px-6 relative" id="features-section">
            <div className="radial-bg hidden lg:block"></div>
            
            {/* Centered Grid Container */}
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
                    {featuresdata.map((items, i) => (
                        <div 
                            className="bg-blue py-10 px-6 rounded-lg transform transition-transform duration-300 hover:scale-105" 
                            key={i}
                        >
                            <div className="rounded-full gg h-16 w-16 flex items-center justify-center mb-10">
                                <Image 
                                    src={items.imgSrc} 
                                    alt={items.heading} 
                                    width={24} 
                                    height={30} 
                                />
                            </div>
                            <h5 className="text-offwhite text-lg font-medium mb-4">
                                {items.heading}
                            </h5>
                            <p className="text-lightblue text-sm font-normal">
                                {items.subheading}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Features;