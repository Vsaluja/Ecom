import React from 'react'
import './Footer.scss';
import Container from '../Container/Container';


const Footer = () => {

    // #232323
    return (
        <div className='footer  bg-[#232323] text-white tex-lg '>
            <Container>

                <p className='text-center py-2'>Shoppe. Ecommerce &copy; 2023</p>
            </Container>
        </div>
    )
}

export default Footer
