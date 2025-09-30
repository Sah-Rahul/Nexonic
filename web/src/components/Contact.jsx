import React from 'react'
import { LuMailOpen } from 'react-icons/lu'

const Contact = () => {
    return (
        <>
            <div className='md:h-[35vw] '>
                <div className="px-5 md:px-10 bg-[#F7FBFC] flex flex-col md:flex-row items-center justify-between">
                    {/* Expert Advice Section */}
                    <div className="text-left mb-6 md:mb-0">
                        <p className="text-sm text-gray-600">Expert advice</p>
                        <p className="h-[1px] bg-black"></p>
                        <h2 className="text-2xl font-bold text-gray-600">123-456-7890</h2>
                    </div>

                    {/* Customer Service Section */}
                    <div className="text-left mb-6 md:mb-0">
                        <p className="text-sm text-gray-600">Customer service</p>
                        <p className="h-[1px] bg-black"></p>
                        <h2 className="text-2xl font-bold text-gray-600">1-222-345-6789</h2>
                    </div>

                    {/* Contact Us Section */}
                    <div className="text-left mb-6 md:mb-0">
                        <p className="text-sm text-gray-600">Have any questions?</p>
                        <p className="h-[1px] bg-black"></p>
                        <h2 className="text-2xl font-bold text-gray-600">Contact us</h2>
                    </div>

                    {/* Image Section */}
                    <div className="w-full md:w-auto">
                        <img
                            src="/images/support-team.png"
                            alt="Support Team"
                            className="w-full md:h-[17vw]  object-cover"
                        />
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className='px-5 md:px-10 bg-white flex flex-col md:flex-row md:items-center items-center justify-between h-1/2 mt-8 space-y-4 md:space-y-0'>
                    <div className='md:flex gap-4 md:items-center justify-center md:justify-start'>
                        {/* Icon - centered on mobile */}
                        <div className='md:flex flex items-center justify-center'>
                            <LuMailOpen className='md:text-6xl text-center text-4xl' />
                        </div>

                        {/* Mobile text - visible only on mobile */}
                        <h1 className='md:hidden block text-[15px] font-semibold'>
                            Subscribe to  our newsletter
                        </h1>

                        {/* Desktop text - visible only on desktop */}
                        <h1 className='hidden md:block text-[15px] md:text-2xl font-semibold'>
                            Subscribe to  our newsletter
                        </h1>
                    </div>
                    <div>
                        <p className='text-gray-400 text-center md:text-left'>
                            Sign up for all the latest news <br /> and special offers
                        </p>
                    </div>

                    <div className='md:flex gap-5 items-center mt-4 md:mt-0'>
                        {/* Email input */}
                        <input
                            className='px-4 h-14 w-full md:w-[25vw] border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
                            type="text"
                            placeholder='Your email'
                        />
                        {/* Subscribe button */}
                        <button
                             className='px-4 md:mb-0 mb-5 md:mt-0 mt-4 h-14 md:w-fit w-full  border border-gray-300 bg-blue-500 text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
                        >
                            Subscribe
                        </button>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Contact