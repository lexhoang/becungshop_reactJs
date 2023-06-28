import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

import * as api_auth from '../../../api/api_auth';
import * as api_products from '../../../api/api_products';

import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export default function CartDetail(props) {
    const { showCartDetail, handleCloseCartDetail, selectedCart, setSelectedCart, limit, currentPage } = props;

    const { loading, dataProducts } = useSelector((state) => state.productsReducer);
    const dispatch = useDispatch();


    const [productIdEdit, setProductIdEdit] = useState('')

    const filterProduct = useMemo(() => {
        if (dataProducts && dataProducts.length > 0) {
            const product = dataProducts.find(item => item._id === productIdEdit);
            return product ? product : null;
        }
        return '';
    }, [dataProducts, productIdEdit]);


    // Tăng giảm
    const handleIncreaseQuantity = (cartProduct) => {
        const { productId, color, size } = cartProduct;
        setProductIdEdit(productId);

        const updatedCart = selectedCart.cart.map((product) => {
            if (
                product.productId === productId &&
                product.color === color &&
                product.size === size
            ) {
                const newNumber = product.number + 1;
                const newTotalPrices = filterProduct ? newNumber * filterProduct.prices : 0;
                return {
                    ...product,
                    number: newNumber,
                    totalPrices: newTotalPrices
                };
            }
            return product;
        });
        dispatch(api_auth.patchDataAuth(selectedCart._id, { cart: updatedCart }));
        setSelectedCart({ ...selectedCart, cart: updatedCart });
    };

    const handleDecreaseQuantity = (cartProduct) => {
        const { productId, color, size } = cartProduct;
        setProductIdEdit(productId);

        const updatedCart = selectedCart.cart.map((product) => {
            if (
                product.productId === productId &&
                product.color === color &&
                product.size === size
            ) {
                if (product.number > 1) {
                    const newNumber = product.number - 1;
                    const newTotalPrices = filterProduct ? newNumber * filterProduct.prices : 0;
                    return {
                        ...product,
                        number: newNumber,
                        totalPrices: newTotalPrices
                    };
                }
            }
            return product;
        });
        dispatch(api_auth.patchDataAuth(selectedCart._id, { cart: updatedCart }));
        setSelectedCart({ ...selectedCart, cart: updatedCart });
    };
    //END

    const handleDeleteOrder = (cartProduct) => {
        const { productId, color, size } = cartProduct;
        const updatedCart = selectedCart.cart.filter((product) => {
            return (
                product.productId !== productId ||
                product.color !== color ||
                product.size !== size
            );
        });
        swal({
            title: "Xóa sản phẩm này?",
            text: "Bạn chắc chắn muốn xóa sản phẩm này chứ, không thể khôi phục sau khi xóa!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(api_auth.patchDataAuth(selectedCart._id, { cart: updatedCart }));
                    dispatch(api_products.getDataProduct(limit, currentPage));
                    setSelectedCart({ ...selectedCart, cart: updatedCart });
                    swal("Thành công! Sản phẩm đã được xóa!", {
                        icon: "success",
                    });
                } else {
                    swal("Sản phẩm này chưa được xóa!");
                }
            });
    }


    useEffect(() => {
        dispatch(api_products.getDataProduct(limit, currentPage));

        if (selectedCart.cart && selectedCart.cart.length > 0) {
            const { productId } = selectedCart.cart[0];
            setProductIdEdit(productId);
        }
    }, [selectedCart.cart]);

    function numberWithCommas(x) {
        if (x === null || typeof x === 'undefined') {
            return '';
        }
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }


    return (
        <Modal size='md' centered
            show={showCartDetail} onHide={handleCloseCartDetail}>
            <Modal.Header closeButton>
                <Modal.Title className='text-color'> Giỏ hàng </Modal.Title>
            </Modal.Header>


            <Modal.Body style={{ maxHeight: '500px', overflow: 'auto' }}>
                {
                    selectedCart.cart && selectedCart.cart.map((item, index) => (
                        <div key={index}
                            className='bg-white rounded shadow-lg p-2 my-3'
                        >
                            <div className='d-flex justify-content-evenly'>
                                <img src={item.image} alt="img product" width='100px' height='100px' />
                                <div className='mx-3'>
                                    <p className='text-color fw-bold'>{item.name}</p>
                                    <p>Kích cỡ: {item.size}</p>
                                    <p>Màu sắc: {item.color}</p>
                                    <div>
                                        <span>
                                            Số lượng:
                                        </span>
                                        <IconButton aria-label="Decrease" variant='contained'
                                            onClick={() => handleDecreaseQuantity(item)}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <span className='px-4'>
                                            {item.number}
                                        </span>
                                        <IconButton aria-label="Increase"
                                            onClick={() => handleIncreaseQuantity(item)}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </div>

                                    <div className='d-flex justify-content-around mt-3 align-items-center'>
                                        <h5 className="text-danger fw-bold">Giá: {numberWithCommas(item.totalPrices)}</h5>
                                        <Button size='small' variant='outlined' color="error"
                                            onClick={() => handleDeleteOrder(item)}>
                                            <DeleteIcon />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Modal.Body>


            <Modal.Footer>
                <Button variant='contained' color="secondary" className='btn-contain' onClick={() => handleCloseCartDetail()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal >
    )
}
