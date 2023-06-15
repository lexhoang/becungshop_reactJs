import React, { useState, useEffect } from 'react';
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'
import * as Yup from 'yup';
import * as api_auth from '../../../api/api_auth';
import Avatar from '../../../assets/images/avt.jpg';


import { Formik, Form } from 'formik';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Grid } from '@mui/material';
import MyField from '../../MyField';
import { useDispatch } from 'react-redux';



export default function FormAuth(props) {
    const { showForm, handleCloseForm } = props;

    const dispatch = useDispatch();

    ////////// START  UPLOAD IMAGE FIREBASE   ///////////
    const [imageUrls, setImageUrls] = useState(Avatar);
    const uploadImage = (e) => {
        let imageUpload = e.target.files[0];
        if (imageUpload == null) return;
        const imageRef = ref(storage, `uploadImageTypes/${imageUpload.name}${v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls(url);
            });
        });
    }
    ////////// END  UPLOAD IMAGE FIREBASE   ///////////

    const [formAuth, setFormAuth] = useState({ account: '', password: '', name: '', phone: '' })

    const validationSchema = Yup.object().shape({
        account: Yup.string().required("Vui lòng điền tên đăng nhập"),
        password: Yup.string().required("Vui lòng điền mật khẩu"),
        name: Yup.string().required("Vui lòng điền tên"),
        phone: Yup.string().required("Vui lòng điền số điện thoại")
    })

    const handleSubmit = (values, { resetForm }) => {
        dispatch(api_auth.postDataAuth({ ...values, photoUrl: imageUrls }))
        resetForm();
        handleCloseForm();
    }

    return (
        <Modal size='lg' centered
            show={showForm} onHide={handleCloseForm}>
            <Modal.Header closeButton>
                <Modal.Title>
                </Modal.Title>
            </Modal.Header>


            <Modal.Body>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={formAuth}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    <Form>
                        <Grid container>
                            <Grid item md={5} xs={12} px={4}>
                                <div className="mb-3">
                                    <label>Ảnh Sản Phẩm</label>
                                    <input type="file" disabled={true} onChange={uploadImage}
                                        placeholder="Name Movie" name="imgUrl" className='form-control' />
                                </div>

                                <img src={imageUrls} alt="img" width={200} />
                            </Grid>

                            <Grid item md={7} xs={12} px={3}>
                                <MyField type='text' name="account" id="account" label="Tên đăng nhập" placeholder="account"
                                    className='form-control'
                                />

                                <MyField type='text' name="password" id="password" label="Mật khẩu" placeholder="password"
                                    className='form-control'
                                />

                                <MyField type='text' name="name" id="name" label="Tên hiển thị" placeholder="name"
                                    className='form-control'
                                />

                                <MyField type='number' name="phone" id="phone" label="Số điện thoại" placeholder="phone"
                                    className='form-control'
                                />
                            </Grid>
                        </Grid>

                        <div className="text-center mt-5">
                            <Button className="w-100" variant="success" type='submit'>
                                Xác nhận
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </Modal.Body>


            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseForm()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
