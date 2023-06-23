import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'
import * as Yup from 'yup';
import unorm from 'unorm';
import swal from 'sweetalert';
import { storage } from "../../../firebase";
import * as api_auth from '../../../api/api_auth';


import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';
import { Container, Grid } from '@mui/material';
import MyField from '../../MyField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Loading from '../../Loading';


export default function InfoUser() {
    const { dataAuth } = useSelector(state => (state.authReducer));
    const { user } = useSelector(state => (state.loginReducer));
    const dispatch = useDispatch();

    ////////// START  UPLOAD IMAGE FIREBASE   ///////////
    const [imageUrls, setImageUrls] = useState('');
    const [loading, setLoading] = useState(false);
    const uploadImage = (e) => {
        let imageUpload = e.target.files[0];
        if (imageUpload == null) return;
        setLoading(true); // Bắt đầu hiển thị loading khi bắt đầu tải ảnh
        const imageRef = ref(storage, `uploadImageAuth/${imageUpload.name}${v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls(url);
                setLoading(false); // Dừng hiển thị loading khi tải ảnh hoàn thành
            });
        });
    }
    ////////// END  UPLOAD IMAGE FIREBASE   ///////////

    const [typePassword, setTypePassword] = useState('password');
    let elementEye = typePassword == "password" ?
        <VisibilityIcon onClick={() => setTypePassword('text')} />
        :
        <VisibilityOffIcon onClick={() => setTypePassword('password')} />

    const [formAuth, setFormAuth] = useState({ account: '', password: '', name: '', phone: '' });
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Vui lòng điền mật khẩu')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/,
                'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
            ),
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
                /^[0-9]{9,11}$/,
                'Số điện thoại phải chứa từ 9 đến 11 chữ số'
            ),
    });

    const infoUser = useMemo(() => {
        if (dataAuth && dataAuth.length > 0 && user && user[0]?.id) {
            return dataAuth.filter(item => item._id === user[0]?.id);
        }
        return [];
    }, [dataAuth, user]);

    const handleSubmit = (values, { resetForm }) => {
        dispatch(api_auth.putDataAuth({ ...values, photoUrl: imageUrls }))
        resetForm();
        swal("Thông tin đã được cập nhật!", "", "success");
    }

    useEffect(() => {
        if (infoUser && infoUser.length > 0) {
            setFormAuth(infoUser[0]);
            setImageUrls(infoUser[0].photoUrl)
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                            {loading ? <Loading /> : null}
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

                            <div className="mb-3 form-group">
                                <label htmlFor='password' style={{ letterSpacing: '2px' }} className="fw-bold">Mật khẩu</label>
                                <div>
                                    <Field type={typePassword} name='password' id='password' placeholder="password"
                                        className='form-control'
                                    />
                                    <i className='eyes-password'>{elementEye}</i>
                                </div>
                                <ErrorMessage name='password' component="div" style={{ color: 'red' }} />
                            </div>


                            <MyField type='text' name="name" id="name" label="Tên hiển thị" placeholder="name"
                                className='form-control'
                            />
                            <div className="mb-3 form-group">
                                <label htmlFor='phone' style={{ letterSpacing: '2px' }} className="fw-bold">Số điện thoại</label>
                                <div className='d-flex btn-group'>
                                    <Button variant="secondary">+84</Button>
                                    <Field type='text' name='phone' id='phone' placeholder="Số điện thoại"
                                        className='form-control'
                                    />
                                </div>
                                <ErrorMessage name='phone' component="div" style={{ color: 'red' }} />
                            </div>
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
