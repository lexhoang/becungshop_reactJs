import React from 'react'
import CarouselComp from './Carousel'
import ProductNew from './ProductNew'
import GirlProduct from './GirlProduct'
import BoyProduct from './BoyProduct'

export default function HomePage() {
    return (
        <>
            <CarouselComp />
            <ProductNew />
            <GirlProduct />
            <BoyProduct />
        </>
    )
}
