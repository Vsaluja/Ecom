import React from 'react'
import Container from '../../../Components/Container/Container'
import Carousel from '../../../Components/Carousel/Carousel'


const RelatedProducts = ({ category, subCategory }) => {
    return (
        <Container className={`mb-20`}>

            <Carousel title={"Related Products"} category={category} subCategory={subCategory} />
        </Container>
    )
}

export default RelatedProducts
