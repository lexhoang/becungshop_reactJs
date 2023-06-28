import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'
import * as Yup from 'yup';
import unorm from 'unorm';
import swal from 'sweetalert';

import * as api_auth from '../../../api/api_auth';
import Avatar from '../../../assets/images/avt.jpg';
import Loading from '../../loading/Loading'
import MyField from '../../MyField';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import Modal from 'react-bootstrap/Modal';
import { Grid, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';




export default function FormAuth(props) {
    const { showForm, handleCloseForm, limit, currentPage } = props;
    const { dataAuth } = useSelector(state => (state.authReducer));

    const dispatch = useDispatch();

    ////////// START  UPLOAD IMAGE FIREBASE   ///////////
    const [imageUrls, setImageUrls] = useState(Avatar);
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

    const [formAuth, setFormAuth] = useState({ account: '', password: '', name: '', phone: '' })

    const validationSchema = Yup.object().shape({
        account: Yup.string()
            .test('account', 'Tài khoản đã tồn tại', (value) => {
                const checkUser = dataAuth.find((item) => item.account === value);
                return checkUser === undefined;
            })
            .required('Vui lòng điền tên đăng nhập'),
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

    const handleSubmit = (values, { resetForm }) => {
        dispatch(api_auth.postDataAuth({ ...values, photoUrl: imageUrls }))
        resetForm();
        setImageUrls(Avatar)
        swal("Tài khoản đã thêm thành công!!!", "", "success");
        handleCloseForm();
    }

    useEffect(() => {
        dispatch(api_auth.getDataAuth(limit, currentPage));
    }, [imageUrls]);


    return (
        <Modal size='lg' centered
            show={showForm} onHide={handleCloseForm}>
            <Modal.Header closeButton>
                <Modal.Title className='text-color'> Thêm mới </Modal.Title>
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
                                    <input type="file" onChange={uploadImage}
                                        placeholder="Name Movie" name="imgUrl" className='form-control' />
                                </div>

                                {loading ? <Loading /> : null}
                                <img src={imageUrls} alt="img" width={200} />
                            </Grid>

                            <Grid item md={7} xs={12} px={3}>
                                <MyField type='text' name="account" id="account" label="Tên đăng nhập" placeholder="account"
                                    className='form-control'
                                />

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
                                        <Button variant="contained" className="btn-contain">+84</Button>
                                        <Field type='text' name='phone' id='phone' placeholder="Số điện thoại"
                                            className='form-control'
                                        />
                                    </div>
                                    <ErrorMessage name='phone' component="div" style={{ color: 'red' }} />
                                </div>
                            </Grid>
                        </Grid>

                        <div className="text-center mt-5 d-flex justify-content-between">
                            <Button variant="contained" type='submit'
                                className="w-50 mx-5 btn-contain">
                                Xác nhận
                            </Button>
                            <Button variant="contained"
                                className='btn-close_modal w-50 mx-5'
                                onClick={() => handleCloseForm()}>
                                Đóng
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </Modal.Body>


            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    )
}
