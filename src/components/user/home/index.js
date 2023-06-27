import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import CarouselComp from './Carousel'
import ProductNew from './ProductNew'
import GirlProduct from './GirlProduct'
import BoyProduct from './BoyProduct'
import Loading from '../../loading/Loading'


export default function HomePage() {
    const { loading } = useSelector(state => state.productsReducer)
    const limit = 12; // Số lượng sản phẩm trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    return (
        <>
            {loading ? <Loading /> : null}
            <CarouselComp />
            <div className="product-layout">
                <ProductNew limit={limit} currentPage={currentPage} />
                <GirlProduct limit={limit} currentPage={currentPage} />
                <BoyProduct limit={limit} currentPage={currentPage} />
            </div>
        </>
    )
}
