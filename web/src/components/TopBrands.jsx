import React from 'react'
import { useTheme } from '../context/ThemeContext';

const TopBrands = () => {
    const { themeColor } = useTheme()
    const logo = [
        {
            img: '/images/logo1.jpg'
        },
        {
            img: '/images/logo2.webp'
        },
        {
            img: '/images/logo3.webp'
        },
        {
            img: '/images/logo4.png'
        },
        {
            img: '/images/logo5.webp'
        }
    ];
    return (
        <>
            <div className='p-5 md:px-10 flex flex-col items-center md:h-screen bg-[#F7FAFD] w-full'>
                <div className="h-[35vw] md:flex md:mt-10 w-full flex-col md:flex-row">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center items-start px-10 md:h-full h-[60vw] md:w-1/2 bg-white">
                        <p className="text-sm text-gray-500 font-medium mb-2">Brand’s deal</p>
                        <h1 style={{ color: themeColor }}  className="md:text-3xl font-bold   leading-snug mb-4">
                            Save up to $200 on select Samsung washing machine
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Tortor purus et quis aenean tempus tellus fames.
                        </p>
                        <button className="text-blue-500 font-semibold">
                            Shop now
                        </button>
                    </div>
                    {/* Right Content */}
                    <div className="md:h-full h-[60vw] w-full md:w-1/2 bg-[url(/images/brand.jpg)] bg-cover bg-center"></div>
                </div>

                {/* Top Brands */}
                <div className="md:mt-10 mt-[89vw] mb-10 w-full">
                    {/* Section Title */}
                    <h2 style={{ color: themeColor }}  className="text-2xl font-bold text-gray-800 mb-4">Top brands</h2>

                    {/* Brand Logos Container */}
                    <div className="h-[11vw] overflow-hidden   flex items-center justify-start gap-6 bg-white shadow-sm">
                        {
                            logo.map((item, index) => (
                                <div key={index} className='flex border-gray-200 border-r-1 items-center justify-center h-full w-[20%]'>
                                    <img src={item.img} alt="logo" className="max-w-full object-contain" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default TopBrands