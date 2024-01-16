import React from 'react'
import headphone from '/images/HomeBannerMiddle.png';
import { Link } from 'react-router-dom'
import './HomeBannerMiddle.scss';

const HomeBannerMiddle = () => {
    return (
        <div className='homeBanner w-full flex flex-col md:flex-row bg-[#F12D34] min-h-[300px] md:h-[350px] rounded-xl flex p-2 sm:px-10 sm:py-10 md:p-5 mt-32'>
            <div className="left w-full relative h-[100px] sm:h-full ">
                <div className="right absolute right-[10px] md:left-[0px] top-[-100px] sm:top-[-120px]">
                    <img className='max-w-[250px] md:min-w-[350px] ' src={headphone} alt="" />
                </div>
            </div>
            <div className="right w-full md:max-w-[50%] lg:min-w-[60%] flex flex-col gap-4 mt-24 md:mt-6">
                <div className="smallText text-[20px] text-white">Apple Airpods Max</div>
                <div className="medText text-[30px] md:text-[50px] font-bold ms-4  text-white">Summer Sale</div>
                <div className='font-bold text-white '>AirPods Max feature incredible high-fidelity audio, Adaptive EQ, Active Noise Cancellation, and spatial audio</div>
                <Link to="/category/electronics" className='w-[100px] md:w-[150px] p-2 md:p-[12px] bg-white rounded text-center font-bold'>Shop Now</Link>
            </div>

        </div>
    )
}

export default HomeBannerMiddle
