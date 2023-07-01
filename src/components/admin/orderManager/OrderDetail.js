import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyField from '../../MyField';

import * as api_orders from '../../../api/api_orders'
import * as api_products from '../../../api/api_products';

import Modal from 'react-bootstrap/Modal';
import swal from 'sweetalert';
import { Grid, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from '../../loading/Loading';



const OrderDetail = (props) => {
    const { showOrderDetail, handleCloseOrderDetail, selectedOrder, setSelectedOrder, limit, currentPage } = props;
    const { dataProducts } = useSelector((state) => state.productsReducer);

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    // GIẢM SỐ LƯỢNG
    const handleDecreaseQuantity = async (productInCart) => {
        const { productId, color, size } = productInCart;
        const productEdit = dataProducts.find((product) => product._id === productId);

        const updatedOrder = selectedOrder.orderDetail.reduce((acc, cartProduct) => {
            if (cartProduct.productId === productId && cartProduct.color === color && cartProduct.size === size) {
                if (cartProduct.number > 1) {
                    const newNumber = cartProduct.number - 1;
                    const newTotalPrices = productEdit ? newNumber * productEdit.prices : 0;
                    const newAmount = parseInt(productEdit.amount) + 1;

                    dispatch(api_products.patchDataProduct(productEdit._id, { amount: newAmount }));
                    acc.push({
                        ...cartProduct,
                        number: newNumber,
                        totalPrices: newTotalPrices,
                    });
                } else {
                    const newAmount = parseInt(productEdit.amount) + 1;
                    dispatch(api_products.patchDataProduct(productEdit._id, { amount: newAmount }));
                }
            } else {
                acc.push(cartProduct);
            }
            return acc;
        }, []);
        setLoading(true);

        try {
            await dispatch(api_orders.patchDataOrder(selectedOrder._id, { orderDetail: updatedOrder }));
            setLoading(false);
            setSelectedOrder({ ...selectedOrder, orderDetail: updatedOrder });
        } catch (error) {
            console.log('Error occurred while updating the cart:', error);
            setLoading(false);
        }
        setLoading(false);
    };

    // TĂNG SỐ LƯỢNG
    const handleIncreaseQuantity = async (productInCart) => {
        const { productId, color, size } = productInCart;
        const productEdit = dataProducts.find((product) => product._id === productId);

        const updatedOrder = selectedOrder.orderDetail.reduce((acc, cartProduct) => {
            if (cartProduct.productId === productId && cartProduct.color === color && cartProduct.size === size) {
                const newNumber = cartProduct.number + 1;
                const newTotalPrices = productEdit ? newNumber * productEdit.prices : 0;
                acc.push({
                    ...cartProduct,
                    number: newNumber,
                    totalPrices: newTotalPrices,
                });
            } else {
                acc.push(cartProduct);
            }
            return acc;
        }, []);
        setLoading(true);

        try {
            await dispatch(api_orders.patchDataOrder(selectedOrder._id, { orderDetail: updatedOrder }));
            setLoading(false);

            const newAmount = parseInt(productEdit.amount) - 1;
            await dispatch(api_products.patchDataProduct(productEdit._id, { amount: newAmount }));

            setSelectedOrder({ ...selectedOrder, orderDetail: updatedOrder });
        } catch (error) {
            console.log('Error occurred while updating the cart:', error);
            setLoading(false);
        }
        setLoading(false);
    };

    const handleDeleteProduct = (productInCart) => {
        const productEdit = dataProducts.find((product) => product._id === productInCart.productId);
        const updateOrder = selectedOrder.orderDetail.filter((orderProduct) => {
            return (orderProduct.productId !== productInCart.productId
                && orderProduct.color !== productInCart.color
                && orderProduct.size !== productInCart.size)
        });
        const newAmount = parseInt(productEdit.amount) + productInCart.number

        swal({
            title: "Xóa đơn hàng này?",
            text: "Bạn chắc chắn muốn xóa đơn hàng này chứ, không thể khôi phục sau khi xóa!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(api_orders.patchDataOrder(selectedOrder._id, { orderDetail: updateOrder }));
                    dispatch(api_products.patchDataProduct(productEdit._id, { amount: newAmount }));
                    setSelectedOrder({ ...selectedOrder, orderDetail: updateOrder });
                    swal("Thành công! Đơn hàng đã được xóa!", {
                        icon: "success",
                    });
                } else {
                    swal("Đơn hàng này chưa được xóa!", "", "warning");
                }
            });
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    useEffect(() => {
        dispatch(api_products.getDataProduct(limit, currentPage));
    }, [selectedOrder.orderDetail])

    return (
        <Modal size='lg' centered
            show={showOrderDetail} onHide={handleCloseOrderDetail}>
            <Modal.Header closeButton>
                <Modal.Title className='text-color fw-bold w-100'>
                    <p>TỔNG ĐƠN HÀNG: &nbsp; {selectedOrder.bill ? numberWithCommas(selectedOrder.bill) : '0'}</p>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ maxHeight: '500px', overflow: 'auto' }}>
                {loading ? <Loading /> : null}
                {
                    selectedOrder.orderDetail && selectedOrder.orderDetail.map((productInCart, index) => (
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
                                        onClick={() => handleDeleteProduct(productInCart)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    ))
                }
            </Modal.Body>

            <Modal.Footer>
                <Button variant='contained' color="secondary" className='btn-close_modal' onClick={() => handleCloseOrderDetail()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal >

    );
}

export default OrderDetail;
