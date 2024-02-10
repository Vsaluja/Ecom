import React from 'react'
import './Footer.scss';
import Container from '../Container/Container';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {

    // #232323
    return (
        // <div className='footer  bg-[#232323] text-white tex-lg '>
        //     <Container>

        //         <p className='text-center py-2'>Shoppe. Ecommerce &copy; 2023</p>
        //     </Container>
        // </div>

        <footer className="bg-black text-white pt-14 pb-3">
            <Container className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0">
                {/* LEFT START */}
                <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px]   flex-col md:flex-row">
                    {/* MENU START */}
                    <div className="flex flex-col items-center gap-3 shrink-0">
                        <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
                            Find a store
                        </div>
                        <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
                            become a partner
                        </div>
                        <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
                            sign up for email
                        </div>
                        <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
                            send us feedback
                        </div>
                        <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
                            student discount
                        </div>
                    </div>
                    {/* MENU END */}

                    {/* NORMAL MENU START */}
                    <div className="flex justify-center gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
                        {/* MENU START */}
                        <div className="flex flex-col gap-3">
                            <div className="font-oswald font-medium uppercase text-sm">
                                get help
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Order Status
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Delivery
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Returns
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Payment Options
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Contact Us
                            </div>
                        </div>
                        {/* MENU END */}

                        {/* MENU START */}
                        <div className="flex flex-col gap-3">
                            <div className="font-oswald font-medium uppercase text-sm">
                                About Shoppe.
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                News
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Careers
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Investors
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Sustainability
                            </div>
                        </div>
                        {/* MENU END */}
                    </div>
                    {/* NORMAL MENU END */}
                </div>
                {/* LEFT END */}

                {/* RIGHT START */}
                <div className="flex gap-4 justify-center md:justify-start">
                    <div
                        className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-black hover:bg-blue-700 duration-300 cursor-pointer"
                    >
                        <FaFacebookF size={20} className='text-white' />
                    </div>
                    <div

                        className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-black bg-blue-600 duration-300 cursor-pointer"
                    >
                        <FaTwitter size={20} className='text-white' />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-black hover:bg-red-600 cursor-pointer duration-300">
                        <FaYoutube size={20} className='text-white' />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-black hover:bg-pink-700 duration-300 cursor-pointer">
                        <FaInstagram size={20} className='text-black' />
                    </div>
                </div>
                {/* RIGHT END */}
            </Container>
            <Container className="flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0">
                {/* LEFT START */}
                <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer text-center md:text-left">
                    © 2023 Shoppe., Inc. All Rights Reserved
                </div>
                {/* LEFT END */}

                {/* RIGHT START */}
                <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
                    <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
                        Guides
                    </div>
                    <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
                        Terms of Sale
                    </div>
                    <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
                        Terms of Use
                    </div>
                    <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
                        Privacy Policy
                    </div>
                </div>
                {/* RIGHT END */}
            </Container>
        </footer>
    )
}

export default Footer
