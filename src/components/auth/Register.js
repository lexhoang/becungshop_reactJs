import React, { useEffect, useState } from 'react';
import './form-auth.scss';

import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import unorm from 'unorm';
import swal from 'sweetalert';

import * as api_auth from '../../api/api_auth';
import Avatar from '../../assets/images/avt.jpg';
import MyField from '../MyField';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const Register = () => {
    const { dataAuth } = useSelector(state => (state.authReducer));

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [imageUrls, setImageUrls] = useState(Avatar);

    const [typePassword, setTypePassword] = useState('password');
    let elementEye = typePassword == "password" ?
        <VisibilityIcon onClick={() => setTypePassword('text')} />
        :
        <VisibilityOffIcon onClick={() => setTypePassword('password')} />

    const [formAuth, setFormAuth] = useState({ account: '', password: '', name: '', phone: '' });
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
                /^[0-9]{8,10}$/,
                'Số điện thoại phải chứa 8 hoặc 10 chữ số'
            ),
    });

    const handleSubmit = (value) => {
        dispatch(api_auth.postDataAuth({ ...value, photoUrl: imageUrls }));
        swal("Tạo tài khoản thành công!", "", "success");
        navigate('/login');
    }

    useEffect(() => {
        dispatch(api_auth.getDataAuth());

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    return (
        <div className="form-body">
            <Formik
                validationSchema={validationSchema}
                initialValues={formAuth}
                onSubmit={handleSubmit}
            >
                <Form className="form-css">
                    <div className="animate__animated animate__flipInY">
                        <h3 className='text-center mb-5' style={{ letterSpacing: '3px' }}>ĐĂNG KÝ</h3>
                        <MyField type='text' name="account" id="account" label="Tên đăng nhập" placeholder="account"
                            className='form-control form-control_auth input-form_auth'
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
                            className='form-control form-control_auth input-form_auth'
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

                        <div className='mt-5'>
                            <Button type='submit'
                                variant="outline"
                                style={{ letterSpacing: '2px' }}
                                className='btn btn-outline text-white w-100 fw-bold'
                            >
                                ĐĂNG KÝ
                            </Button>
                        </div>

                        <Button size='small' variant="contained"
                            className='mt-5 btn-contain w-75'
                            onClick={() => navigate('/login')}>
                            Đã có tài khoản
                        </Button>
                    </div>
                    <Button variant="contained"
                        className='come-back'
                        onClick={() => navigate('/')}
                    >Trang chủ
                    </Button>
                </Form>
            </Formik>
        </div>
    );
}

export default Register;