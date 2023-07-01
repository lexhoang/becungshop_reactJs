import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

import * as api_auth from '../../../api/api_auth';
import * as api_products from '../../../api/api_products';

import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Loading from '../../loading/Loading';


export default function CartDetail(props) {
    const { showCartDetail, handleCloseCartDetail, selectedCart, setSelectedCart, limit, currentPage } = props;

    const { dataProducts } = useSelector((state) => state.productsReducer);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);


    // GIẢM SỐ LƯỢNG
    const handleDecreaseQuantity = async (productInCart) => {
        const { productId, color, size } = productInCart;
        const productEdit = dataProducts.find(product => product._id === productId);

        const updatedCart = [];
        for (let i = selectedCart.cart.length - 1; i >= 0; i--) {
            const product = selectedCart.cart[i];
            if (product.productId === productId && product.color === color && product.size === size) {
                if (product.number > 1) {
                    const newNumber = product.number - 1;
                    const newTotalPrices = productEdit ? newNumber * productEdit.prices : 0;
                    updatedCart.unshift({
                        ...product,
                        number: newNumber,
                        totalPrices: newTotalPrices
                    });
                }
            } else {
                updatedCart.unshift(product);
            }
        }

        setLoading(true);
        try {
            await dispatch(api_auth.patchDataAuth(selectedCart._id, { cart: updatedCart }));
            setLoading(false);

            const newAmount = parseInt(productEdit.amount) + 1;
            await dispatch(api_products.patchDataProduct(productEdit._id, { amount: newAmount }));

            setSelectedCart({ ...selectedCart, cart: updatedCart });
        } catch (error) {
            console.log('Error occurred while updating the cart:', error);
            setLoading(false);
        }
        setLoading(false);
    };

    // TĂNG SỐ LƯỢNG
    const handleIncreaseQuantity = async (productInCart) => {
        const { productId, color, size } = productInCart;
        const productEdit = dataProducts.find(product => product._id === productId);

        const updatedCart = [];
        for (let i = selectedCart.cart.length - 1; i >= 0; i--) {
            const product = selectedCart.cart[i];
            if (product.productId === productId && product.color === color && product.size === size) {
                const newNumber = product.number + 1;
                const newTotalPrices = productEdit ? newNumber * productEdit.prices : 0;
                updatedCart.unshift({
                    ...product,
                    number: newNumber,
                    totalPrices: newTotalPrices
                });
            } else {
                updatedCart.unshift(product);
            }
        }

        setLoading(true);
        try {
            await dispatch(api_auth.patchDataAuth(selectedCart._id, { cart: updatedCart }));
            setLoading(false);

            const newAmount = parseInt(productEdit.amount) - 1;
            await dispatch(api_products.patchDataProduct(productEdit._id, { amount: newAmount }));

            setSelectedCart({ ...selectedCart, cart: updatedCart });
        } catch (error) {
            console.log('Error occurred while updating the cart:', error);
            setLoading(false); // Set the loading state for cart update to false in case of an error
        }
        setLoading(false);

    };

    // XÓA SẢN PHẨM
    const handleDeleteOrder = (productInCart) => {
        const { productId, color, size } = productInCart;
        const productEdit = dataProducts.find(product => product._id === productId);

        const updatedCart = selectedCart.cart.filter((product) => {
            return (product.productId !== productId || product.color !== color || product.size !== size);
        });
        const newAmount = parseInt(productEdit.amount) + productInCart.number;

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
                    dispatch(api_products.patchDataProduct(productEdit._id, { amount: newAmount }));
                    // dispatch(api_products.getDataProduct(limit, currentPage));
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
                <Modal.Title className='text-color fw-bold'> GIỎ HÀNG </Modal.Title>
            </Modal.Header>


            <Modal.Body style={{ maxHeight: '500px', overflow: 'auto' }}>
                {loading ? <Loading /> : null}
                {
                    selectedCart.cart && selectedCart.cart.slice().reverse().map((productInCart, index) => (
                        <Grid container key={index}>
                            <div className='bg-white rounded shadow-lg p-2 my-3'>
                                <Grid container>
                                    <Grid item md={4} xs={12} p={1}>
                                        <img src={productInCart.image} alt="img product" width='100%' />
                                    </Grid>

                                    <Grid item md={8} xs={12} p={1}>
                                        <p className='text-color fw-bold'>{productInCart.name}</p>
                                        <div className='fw-bold'>
                                            <span>Mã sản phẩm: </span>
                                            <span className='text-color'>{productInCart.infoCode}</span>
                                        </div>
                                        <div className='fw-bold'>
                                            <span>Kích cỡ: </span>
                                            <span className='text-color'>{productInCart.size}</span>
                                        </div>
                                        <div className='fw-bold'>
                                            <span>Màu sắc: </span>
                                            <span className='text-color'>{productInCart.color}</span>
                                        </div>
                                        <div className='fw-bold'>
                                            <span>Đơn giá: </span>
                                            <span className='text-color'>{numberWithCommas(productInCart.totalPrices / productInCart.number)}đ</span>
                                        </div>
                                        <div className="my-3">
                                            <IconButton aria-label="Decrease" size='small'
                                                className='btn-contain'
                                                onClick={() => handleDecreaseQuantity(productInCart)}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <span className='px-4 fw-bold'>
                                                {productInCart.number}
                                            </span>
                                            <IconButton aria-label="Increase" size='small'
                                                className='btn-contain'
                                                onClick={() => handleIncreaseQuantity(productInCart)}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </div>
                                    </Grid>
                                </Grid>
                                <div className='mt-3 d-flex justify-content-around align-items-center'>
                                    <h5 className='fw-bold'>
                                        <span>Thành tiền: </span>
                                        <span className='text-color'>{numberWithCommas(productInCart.totalPrices)}đ</span>
                                    </h5>
                                    <Button size='small' variant='outlined' color="error"
                                        onClick={() => handleDeleteOrder(productInCart)}>
                                        <DeleteIcon />
                                    </Button>
                                </div>
                            </div>
                        </Grid>
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
