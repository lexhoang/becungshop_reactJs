import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

import * as api_auth from '../../api/api_auth';
import { act_login, act_user } from '../../redux/actions/act_login';
import MyField from '../MyField';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const { dataAuth } = useSelector(state => (state.authReducer));
    const [idUser, setIdUser] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [typePassword, setTypePassword] = useState('password');
    let elementEye = typePassword == "password" ?
        <VisibilityIcon onClick={() => setTypePassword('text')} />
        :
        <VisibilityOffIcon onClick={() => setTypePassword('password')} />

    const [formLogin, setFormLogin] = useState({ account: '', password: '' });
    const validateForm = (values) => {
        const errors = {}
        const checkUser = dataAuth.find((item) => item.account === values.account);
        setIdUser(checkUser?._id)
        if (checkUser && checkUser.active === false) {
            swal("Tài khoản này đã bị khóa!", "", "error");
            errors.account = "Tài khoản đã bị khóa";
        } else if (checkUser && checkUser.password !== values.password) {
            errors.password = "Mật khẩu không đúng";
        } else if (!checkUser) {
            errors.account = "Tài khoản không tồn tại";
        }
        return errors
    }

    const handleSubmit = (value) => {
        navigate('/');
        dispatch(act_login([{ id: idUser, account: value.account }], value.password));
    }

    useEffect(() => {
        dispatch(api_auth.getDataAuth());
        dispatch(act_user());
    }, [])

    return (
        <div className="form-body">
            <Button variant="contained" onClick={() => navigate('/')}>Trang chủ</Button>
            <Formik
                validate={validateForm}
                initialValues={formLogin}
                onSubmit={handleSubmit}
            >
                <Form className="form-css">
                    <div className="animate__animated animate__flip">
                        <h3 className='text-center mb-5' style={{ letterSpacing: '3px' }}>ĐĂNG NHẬP</h3>
                        <MyField type='text' name="account" id="account" label="Tên đăng nhập" placeholder="account"
                            className='form-control form-control_auth input-form_auth'
                        />

                        <div className="mb-3 form-group">
                            <label htmlFor='password' style={{ letterSpacing: '2px' }} className="fw-bold">Mật khẩu</label>
                            <div>
                                <Field type={typePassword} name='password' id='password' placeholder="password"
                                    className='form-control form-control_auth input-form_auth'
                                />
                                <i className='eyes-password'>{elementEye}</i>
                            </div>
                            <ErrorMessage name='password' component="div" style={{ color: 'red' }} />
                        </div>




                        <div className='mt-5'>
                            <button type='submit' style={{ letterSpacing: '2px' }}
                                className='btn btn-outline-light text-white w-100 input-form_auth fw-bold'
                            >
                                ĐĂNG NHẬP
                            </button>
                        </div>

                        <div className='mt-5 btn btn-sm btn-info w-50'>
                            <Link to='/register' className='text-register' >Đăng ký tài khoản</Link>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default Login;
