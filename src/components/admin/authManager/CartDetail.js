import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api_auth from '../../../api/api_auth';

import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';



export default function CartDetail(props) {
    const { showCartDetail, handleCloseCartDetail, selectedCart, setSelectedCart } = props;
    const dispatch = useDispatch();

    const handleDeleteOrder = (cartProduct) => {
        const { productId, color, size } = cartProduct;
        const updatedCart = selectedCart.cart.filter((product) => {
            return (
                product.productId !== productId ||
                product.color !== color ||
                product.size !== size
            );
        });
        console.log(updatedCart);
        dispatch(api_auth.patchDataAuth(selectedCart._id, { cart: updatedCart }));
        setSelectedCart({ ...selectedCart, cart: updatedCart });
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }



    return (
        <Modal size='lg' centered
            show={showCartDetail} onHide={handleCloseCartDetail}>
            <Modal.Header closeButton>
                <Modal.Title> Giỏ hàng </Modal.Title>
            </Modal.Header>


            <Modal.Body>
                {
                    selectedCart.cart && selectedCart.cart.map((item, index) => (
                        <div key={index}
                            className='bg-white rounded d-flex flex-wrap justify-content-evenly align-items-center shadow-lg p-2 my-3'
                        >
                            <img src={item.image} alt="img product" width='120px' height='120px' />
                            <div>
                                <p className='fw-bold'>{item.name}</p>
                                <div className='d-flex flex-wrap  justify-content-evenly'>
                                    <div>
                                        <p className="text-success">Kích cỡ: {item.size}</p>
                                        <p className="text-danger">Số lượng: {item.number}</p>
                                    </div>

                                    <div>
                                        <p className="text-success">Màu sắc: {item.color}</p>
                                        <p className="text-danger">Giá: {numberWithCommas(item.totalPrices)}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Button variant='outlined' color="error"
                                    onClick={() => handleDeleteOrder(item)}>
                                    <DeleteIcon />
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </Modal.Body>


            <Modal.Footer>
                <Button variant='contained' color="secondary" onClick={() => handleCloseCartDetail()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal >
    )
}
