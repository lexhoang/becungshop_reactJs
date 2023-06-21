import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'
import * as Yup from 'yup';
import * as api_auth from '../../../api/api_auth';
import Avatar from '../../../assets/images/avt.jpg';


import { Formik, Form } from 'formik';
import Button from 'react-bootstrap/Button';
import { Container, Grid } from '@mui/material';
import MyField from '../../MyField';



export default function InfoUser() {
    const { dataAuth } = useSelector(state => (state.authReducer));
    const { user } = useSelector(state => (state.loginReducer));
    const dispatch = useDispatch();

    const [imageUrls, setImageUrls] = useState('');
    const [formAuth, setFormAuth] = useState({ account: '', password: '', name: '', phone: '' });


    ////////// START  UPLOAD IMAGE FIREBASE   ///////////
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

    const infoUser = useMemo(() => {
        if (dataAuth && dataAuth.length > 0 && user && user[0]?.id) {
            return dataAuth.filter(item => item._id === user[0]?.id);
        }
        return [];
    }, [dataAuth, user]);

    const validationSchema = Yup.object().shape({
        account: Yup.string().required("Vui lòng điền tên đăng nhập"),
        password: Yup.string().required("Vui lòng điền mật khẩu"),
        name: Yup.string().required("Vui lòng điền tên"),
        phone: Yup.string().required("Vui lòng điền số điện thoại")
    })

    const handleSubmit = (values, { resetForm }) => {
        dispatch(api_auth.putDataAuth({ ...values, photoUrl: imageUrls }))
        resetForm();
    }

    useEffect(() => {
        if (infoUser && infoUser.length > 0) {
            setFormAuth(infoUser[0]);
            setImageUrls(infoUser[0].photoUrl)
        }
    }, [infoUser]);

    return (
        <Container>
            <h3 className='text-center' style={{ marginTop: '150px' }}>Hồ Sơ Của Bạn</h3>
            <Formik
                validationSchema={validationSchema}
                initialValues={formAuth}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                <Form>
                    <Grid container justifyContent={'center'} mt={12}>
                        <Grid item md={3} xs={12} px={3} mb={5}>
                            <img src={imageUrls} alt="img" width={200} />
                            <div className="my-3">
                                <input type="file" onChange={uploadImage}
                                    placeholder="Name Movie" name="imgUrl" className='form-control' />
                            </div>
                        </Grid>

                        <Grid item md={6} xs={12} px={3}>
                            <div className="mb-3">
                                <label className="fw-bold">Tài khoản</label>
                                <input type="text" disabled={true} name="account" className='form-control'
                                    value={formAuth.account} />
                            </div>

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
        </Container>
    )
}
