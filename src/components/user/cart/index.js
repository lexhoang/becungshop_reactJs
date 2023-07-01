import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

import * as api_auth from '../../../api/api_auth';
import * as api_products from '../../../api/api_products';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import Loading from '../../loading/Loading';
import OrderCart from './OrderCart';

const Cart = () => {
    const { dataProducts } = useSelector(state => state.productsReducer);
    const { dataAuth } = useSelector(state => state.authReducer);
    const { user } = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [limit, setLimit] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [totalOrder, setTotalOrder] = useState(0);

    const filterUser = useMemo(() => {
        const userLogin = dataAuth.find(auth => auth?._id === user?.[0]?.id);
        return userLogin || {};
    }, [dataAuth, user]);


    // GIẢM SỐ LƯỢNG
    const handleDecreaseQuantity = async (productInCart) => {
        const { productId, color, size } = productInCart;
        const productEdit = dataProducts.find(product => product._id === productId);

        const updateCart = filterUser.cart.map((cartProduct) => {
            if (cartProduct.productId === productId && cartProduct.color === color && cartProduct.size === size) {
                if (cartProduct.number > 1) {
                    const newNumber = cartProduct.number - 1;
                    const newTotalPrices = productEdit ? newNumber * productEdit.prices : 0;

                    const newAmount = parseInt(productEdit.amount) + 1;
                    dispatch(api_products.patchDataProduct(productEdit._id, { amount: newAmount }));
                    return {
                        ...cartProduct,
                        number: newNumber,
                        totalPrices: newTotalPrices
                    };
                } else {
                    handleDeleteOrder(productInCart);
                }
            }
            return cartProduct;
        });
        setLoading(true);
        try {
            await dispatch(api_auth.patchDataAuth(filterUser._id, { cart: updateCart }));
            setLoading(false);
        } catch (error) {
            console.log('Error occurred while updating the cart:', error);
        }
        setLoading(false);
    };

    // TĂNG SỐ LƯỢNG
    const handleIncreaseQuantity = async (productInCart) => {
        const { productId, color, size } = productInCart;
        const productEdit = dataProducts.find(product => product._id === productId);

        const updateCart = filterUser.cart.map((cartProduct) => {
            if (cartProduct.productId === productId && cartProduct.color === color && cartProduct.size === size) {
                const newNumber = cartProduct.number + 1;
                const newTotalPrices = productEdit ? newNumber * productEdit.prices : 0;
                return {
                    ...cartProduct,
                    number: newNumber,
                    totalPrices: newTotalPrices
                };
            }
            return cartProduct;
        });
        setLoading(true);
        try {
            await dispatch(api_auth.patchDataAuth(filterUser._id, { cart: updateCart }));
            setLoading(false);

            const newAmount = parseInt(productEdit.amount) - 1;
            await dispatch(api_products.patchDataProduct(productEdit._id, { amount: newAmount }));
        } catch (error) {
            console.log('Error occurred while updating the cart:', error);
        }
        setLoading(false);
    };


    // XÓA SẢN PHẨM
    const handleDeleteOrder = (productInCart) => {
        const { productId, color, size } = productInCart;
        const productEdit = dataProducts.find(product => product._id === productId);
        const updateCart = filterUser.cart.filter((cartProduct) => {
            return cartProduct.productId !== productId || cartProduct.color !== color || cartProduct.size !== size;
        });
        const newAmount = parseInt(productEdit.amount) + productInCart.number;
        swal({
            title: 'Xóa sản phẩm này?',
            text: 'Bạn chắc chắn muốn xóa sản phẩm này chứ, không thể khôi phục sau khi xóa!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(api_auth.patchDataAuth(filterUser._id, { cart: updateCart }));
                dispatch(api_products.patchDataProduct(productEdit._id, { amount: newAmount }));
                swal('Thành công! Sản phẩm đã được xóa!', {
                    icon: 'success',
                });
            } else {
                swal('Sản phẩm này chưa được xóa!');
            }
        });
    };

    useEffect(() => {
        dispatch(api_products.getDataProduct(limit, currentPage));
        dispatch(api_auth.getDataAuth(limit, currentPage));
    }, [limit, currentPage]);


    useEffect(() => {
        if (user == null) {
            navigate('/login');
        };

        let totalPrices = 0;
        if (filterUser && filterUser.cart) {
            for (let i = 0; i < filterUser.cart.length; i++) {
                totalPrices += filterUser.cart[i].totalPrices;
            }
        }
        setTotalOrder(totalPrices)

        // window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [filterUser.cart]);



    const [showOrderForm, setShowOrderForm] = useState(false);
    const handleCloseOrderForm = () => {
        setShowOrderForm(false);
    }

    const handleOpenOrder = () => {
        setShowOrderForm(true);
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }


    return (
        <Container>
            {loading ? <Loading /> : null}
            <h3 className='text-center text-color' style={{ margin: '100px 0' }}>THÔNG TIN GIỎ HÀNG CỦA BẠN</h3>
            <Grid container>
                {
                    filterUser && filterUser.cart && filterUser.cart.slice().reverse().map((productInCart, index) => (
                        <Grid key={index} item md={6} xs={12} p={1}>
                            <div className='bg-white rounded shadow-lg p-2 my-3'>
                                <Grid container>
                                    <Grid item md={4} xs={12} p={1}>
                                        <img src={productInCart.image} alt="img product" width='100%' />
                                    </Grid>

                                    <Grid item md={8} xs={12} p={1}>
                                        <p className='text-color fw-bold'>{productInCart.name}</p>
                                        <div className='fw-bold'>
                                            <span className='text-font'>Mã sản phẩm: </span>
                                            <span className='text-color'>{productInCart.infoCode}</span>
                                        </div>
                                        <div className='fw-bold'>
                                            <span className='text-font'>Kích cỡ: </span>
                                            <span className='text-color'>{productInCart.size}</span>
                                        </div>
                                        <div className='fw-bold'>
                                            <span className='text-font'>Màu sắc: </span>
                                            <span className='text-color'>{productInCart.color}</span>
                                        </div>
                                        <div className='fw-bold'>
                                            <span className='text-font'>Đơn giá: </span>
                                            <span className='text-color'>{numberWithCommas(productInCart.totalPrices / productInCart.number)}đ</span>
                                        </div>
                                        <div className="my-3">
                                            <IconButton aria-label="Decrease" size='small'
                                                className='btn-contain'
                                                onClick={() => handleDecreaseQuantity(productInCart)}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <span className='px-4 fs-5 fw-bold'>
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
            </Grid>
            <Grid container mt={8} p={3} style={{
                background: "linear-gradient(0deg, #ccc9c4 0%, #ffffff 100%)"
            }}>
                <Grid item md={6} xs={12} textAlign='center'>
                    <h3>Tổng Giá Tiền: {numberWithCommas(totalOrder)}đ</h3>
                </Grid>

                <Grid item md={6} xs={12} textAlign='center'>
                    <Button variant='contained' className="btn-contain"
                        onClick={() => handleOpenOrder()}>Thanh toán</Button>
                </Grid>
            </Grid>

            <OrderCart showOrderForm={showOrderForm} setShowOrderForm={setShowOrderForm}
                handleCloseOrderForm={handleCloseOrderForm}
                filterUser={filterUser} totalOrder={totalOrder}
            />
        </Container>
    );
}

export default Cart;
