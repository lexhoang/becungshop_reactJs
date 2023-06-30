import React, { useState } from 'react';


import Modal from 'react-bootstrap/Modal';
import { Grid, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MyField from '../../MyField';

const OrderCart = (props) => {
    const { showOrderForm, setShowOrderForm, handleCloseOrderForm, totalOrder, filterUser } = props;
    const [formOrder, setFormOrder] = useState({ name: '', phone: '', address: '', note: '' })

    const handleConfirmOrder = (values) => {
        console.log(values);
        console.log(filterUser.cart);
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    return (
        <Modal size='lg' centered
            show={showOrderForm} onHide={handleCloseOrderForm}>
            <Modal.Header closeButton>
                <Modal.Title className='text-color fw-bold'> Đặt Hàng </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Formik
                    initialValues={formOrder}
                    onSubmit={handleConfirmOrder}
                >
                    <Form>
                        <Grid container>
                            <Grid item md={6} xs={12} px={3}>
                                <MyField type='text' name="name" id="name" label="Tên người nhận" placeholder="name"
                                    className='form-control'
                                />
                            </Grid>

                            <Grid item md={6} xs={12} px={3}>
                                <MyField type='text' name="phone" id="phone" label="Số điện thoại" placeholder="phone"
                                    className='form-control'
                                />
                            </Grid>

                            <Grid item md={6} xs={12} px={3}>
                                <MyField type='text' name="address" id="address" label="Địa chỉ" placeholder="address"
                                    className='form-control'
                                />
                            </Grid>

                            <Grid item md={6} xs={12} px={3}>
                                <div className="mb-3">
                                    <label htmlFor="note" className='fw-bold text-color'>Ghi chú</label>
                                    <Field as="textarea" name="note" id="note"
                                        className="form-control"
                                        placeholder="note"
                                        style={{ height: '100px' }}
                                    />
                                    <ErrorMessage name='note' component="div" className="text-danger" />
                                </div>
                            </Grid>
                        </Grid>

                        <Grid item md={12} xs={12} textAlign='center' mt={5}>
                            <h4 className='text-color'>Thanh Toán: {numberWithCommas(totalOrder)}đ</h4>
                        </Grid>


                        <div className="text-center mt-5 d-flex justify-content-between">
                            <Button variant="contained" type='submit'
                                className="w-100 mx-5 btn-contain">
                                Xác nhận
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='contained' color="secondary" className='btn-close_modal' onClick={() => handleCloseOrderForm()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal >

    );
}

export default OrderCart;
