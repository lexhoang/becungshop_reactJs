import React, { useState } from 'react'
import CarouselComp from './Carousel'
import ProductNew from './ProductNew'
import GirlProduct from './GirlProduct'
import BoyProduct from './BoyProduct'

export default function HomePage() {
    const limit = 6; // Số lượng sản phẩm trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <>
            <CarouselComp />
            <ProductNew limit={limit} currentPage={currentPage} />
            <GirlProduct limit={limit} currentPage={currentPage} />
            <BoyProduct limit={limit} currentPage={currentPage} />
        </>
    )
}
