import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instances from '../../../api';


export default function ProductDetail() {
    const { productId } = useParams();
    const [productInfo, setProductInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instances.get(`products/${productId}`);
                setProductInfo(response.data.data);
                console.log(productId);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <p>{productInfo._id}</p>
            <p>{productInfo.name}</p>
            <p>{productInfo.prices}</p>
        </div>
    )
}
