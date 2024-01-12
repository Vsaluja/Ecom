import React from 'react'
import headphone from '/images/headphoneBanner.png';
import { Link } from 'react-router-dom';
const HomeBanner = () => {
    return (
        <div className='homeBanner w-full bg-gray-200 h-[400px] md:h-[500px] rounded-xl flex p-2 sm:px-10 sm:py-10 md:p-5'>
            <div className="left flex flex-col justify-center mt-10 md:ms-10 w-full">
                <div className="smallText text-[15px]">Boat Immortal</div>
                <div className="medText text-[30px] md:text-[50px] font-bold ms-4 md:mb-[-40px]">Gaming</div>
                <div className="lgText  relative flex">
                    <h2 className='w-full text-[40px] md:text-[100px] lg:text-[130px] font-bold text-white uppercase'>Headphones</h2>
                    <div className="right absolute right-0 top-[-50px] sm:right-[0px] sm:top-[-100px]">
                        <img className='w-[120px] sm:w-[200px] md:w-[250px]' src={headphone} alt="" />
                    </div>
                </div>
                <div className="desc max-w-[300px] md:max-w-[500px] mb-4 text-[12px] md:text-[16px]">It’s time to hit your gaming zone with the 7.1 channel virtual surround sound gaming headphones, boAt Immortal IM-700</div>
                <Link to="/category/electronics" className='bg-[color:var(--ecom-text-bg)] w-[100px] md:w-[150px] p-2 md:p-4 text-white rounded text-center'>Shop now</Link>
            </div>

        </div>
    )
}

export default HomeBanner
