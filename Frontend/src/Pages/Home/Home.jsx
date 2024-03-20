import React, { useEffect, useState, useSyncExternalStore } from 'react'
import Container from '../../Components/Container/Container'
import deals from '/images/Deals.png';
import CategoriesSection from './CategoriesSection/CategoriesSection';
import OnSale from './OnSale/OnSale';
// import homeBanner from '/images/homeBanner2.jpg';
// import homeBanner from '/images/newBanner.png';
import HomeBanner from './HomeBanner/HomeBanner';
import HomeBannerMiddle from './HomeBanner/HomeBannerMiddle';
import BestSellers from './BestSellers/BestSellers';


const Home = () => {

    // <img src={`http://localhost:5173/products/product_1.png`} alt="" />


    return (
        <div className='homme mb-20'>
            {/* <img src={homeBanner} alt="" className='w-full md:h-[400px] object-contain object-center' /> */}

            <Container>
                <HomeBanner />
                <CategoriesSection />
                <BestSellers />
                <HomeBannerMiddle />
                {/* <img className='h-[40px] w-full lg:h-[100px] lg:w-full' src={deals} alt="" /> */}
                <OnSale />
            </Container>
        </div>
    )
}

export default Home
