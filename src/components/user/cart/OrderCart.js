import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyField from '../../MyField';

import * as api_orders from '../../../api/api_orders'
import * as api_auth from '../../../api/api_auth';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import unorm from 'unorm';
import swal from 'sweetalert';

import Modal from 'react-bootstrap/Modal';
import { Grid, Button } from '@mui/material';

const OrderCart = (props) => {
    const { showOrderForm, handleCloseOrderForm, totalOrder, filterUser, paymentMethod, setPaymentMethod } = props;
    const dispatch = useDispatch();

    const [formOrder, setFormOrder] = useState({ name: '', phone: '', address: '', note: '' })


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Vui lòng điền tên')
            .test('name', 'Tên chỉ được chứa chữ cái và khoảng trắng', (value) => {
                const normalizedValue = unorm.nfc(value); // Chuẩn hóa chuỗi ký tự
                const regex = /^[a-zA-Z\sÀ-ỹ]+$/;
                return regex.test(normalizedValue);
            }),
        phone: Yup.string()
            .required('Vui lòng điền số điện thoại')
            .matches(
                /^[0-9]{8,10}$/,
                'Số điện thoại phải chứa 8 hoặc 10 chữ số'
            ),
        address: Yup.string()
            .required('Vui lòng điền tên')
            .test('name', 'Tên chỉ được chứa chữ cái và khoảng trắng', (value) => {
                const normalizedValue = unorm.nfc(value); // Chuẩn hóa chuỗi ký tự
                const regex = /^[a-zA-Z\sÀ-ỹ]+$/;
                return regex.test(normalizedValue);
            }),
    });


    const handleConfirmOrder = (values, { resetForm }) => {
        // console.log(paymentMethod);
        swal({
            title: "Xác nhận đơn hàng",
            text: "Nhấn OK để xác nhận đơn hàng. Bạn sẽ nhận được đơn hàng trong vòng 1 nốt nhạc.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    if (paymentMethod !== null) {
                        const updateCart = filterUser.cart.filter((cartProduct) => {
                            return cartProduct.productId !== paymentMethod.productId || cartProduct.color !== paymentMethod.color || cartProduct.size !== paymentMethod.size;
                        });

                        dispatch(api_orders.postDataOrder({ ...values, accountID: filterUser._id, accountName: filterUser.account, orderDetail: paymentMethod, bill: totalOrder }));
                        dispatch(api_auth.patchDataAuth(filterUser._id, { cart: updateCart }));
                    } else {
                        dispatch(api_orders.postDataOrder({ ...values, accountID: filterUser._id, accountName: filterUser.account, orderDetail: filterUser.cart, bill: totalOrder }));
                        dispatch(api_auth.patchDataAuth(filterUser._id, { cart: [] }));
                    }
                    swal("Xác nhận đơn hàng thành công", "Cảm ơn bạn đã mua sản phẩm của chúng tôi!!!", {
                        icon: "success",
                    });
                } else {
                    swal("Đơn hàng chưa được xác nhận");
                }
            });
        resetForm();
        handleCloseOrderForm();
        setPaymentMethod(null)
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    useEffect(() => {

    }, [paymentMethod]);


    return (
        <Modal size='lg' centered
            show={showOrderForm} onHide={handleCloseOrderForm}>
            <Modal.Header closeButton>
                <Modal.Title className='text-color fw-bold'> Đặt Hàng </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Formik
                    validationSchema={validationSchema}
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
                                <div className="mb-3 form-group">
                                    <label htmlFor='phone' style={{ letterSpacing: '2px' }} className="fw-bold text-color">Số điện thoại</label>
                                    <div className='d-flex btn-group'>
                                        <Button variant="contained" className="btn-contain">+84</Button>
                                        <Field type='text' name='phone' id='phone' placeholder="Số điện thoại"
                                            className='form-control'
                                        />
                                    </div>
                                    <ErrorMessage name='phone' component="div" style={{ color: 'red' }} />
                                </div>
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
                            <h4 className='text-color'>HÓA ĐƠN: &nbsp; {numberWithCommas(totalOrder)}đ</h4>
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
