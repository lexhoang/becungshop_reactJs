import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

import * as api_auth from '../../../api/api_auth';
import * as api_products from '../../../api/api_products';

import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = () => {

    const handleDecreaseQuantity = () => {
        console.log('111');
    }

    const handleIncreaseQuantity = () => {
        console.log('222');
    }

    const handleDeleteOrder = () => {
        console.log('222');
    }


    return (
        <Container>
            <h3 className='text-center text-color' style={{ margin: '100px 0' }}>THÔNG TIN GIỎ HÀNG CỦA BẠN</h3>
            <Grid container>
                <Grid item md={6} xs={12}>
                    <div className='bg-white rounded shadow-lg p-2 my-3'>
                        <div className='d-flex justify-content-evenly'>
                            <img src="{item.image}" alt="img product" width='100px' height='100px' />
                            <div className='mx-3'>
                                <p className='text-color fw-bold'>{"item.name"}</p>
                                <p>Kích cỡ: {"item.size"}</p>
                                <p>Màu sắc: {"item.color"}</p>
                                <div>
                                    <span>
                                        Số lượng:
                                    </span>
                                    <IconButton aria-label="Decrease" variant='contained'
                                        onClick={() => handleDecreaseQuantity()}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <span className='px-4'>
                                        {"item.number"}
                                    </span>
                                    <IconButton aria-label="Increase"
                                        onClick={() => handleIncreaseQuantity()}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </div>

                                <div className='d-flex justify-content-around mt-3 align-items-center'>
                                    <h5 className="text-danger fw-bold">Giá:</h5>
                                    <Button size='small' variant='outlined' color="error"
                                        onClick={() => handleDeleteOrder()}>
                                        <DeleteIcon />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Cart;
