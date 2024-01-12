import React from 'react'
import Container from '../Container/Container'
import pageNotFound from '/images/pageNotFound.png';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {

    const navigate = useNavigate();
    setTimeout(() => {
        navigate('/');
    }, 2000);

    return (
        <div className='flex-1'>
            <Container className={`h-[100%]`}>
                <img className='' src={pageNotFound} alt="" />
                <Spinner text={"Redirecting"} />
            </Container>
        </div>
    )
}

export default PageNotFound
