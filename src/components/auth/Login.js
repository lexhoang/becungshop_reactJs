import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'
import * as Yup from 'yup';
import * as api_auth from '../../api/api_auth';
import { act_login, act_user } from '../../redux/actions/act_login';


import { Form, Formik } from 'formik';


import MyField from '../MyField';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
    const { dataAuth } = useSelector(state => (state.authReducer));
    const [idUser, setIdUser] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [formLogin, setFormLogin] = useState({ account: '', password: '' });

    const validateForm = (values) => {
        const errors = {}
        const checkUser = dataAuth.find((item) => item.account === values.account);
        setIdUser(checkUser?._id)
        if (checkUser) {
            if (checkUser.password !== values.password) {
                errors.password = "Mật khẩu không đúng";
            }
        } else {
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
            <Formik
                validate={validateForm}
                initialValues={formLogin}
                onSubmit={handleSubmit}
            >
                <Form className="form-css">
                    <h3 className='text-center mb-5' style={{ letterSpacing: '3px' }}>ĐĂNG NHẬP</h3>
                    <MyField type='text' name="account" id="account" label="Tên đăng nhập" placeholder="account"
                        className='form-control form-control_auth input-form_auth'
                    />

                    <MyField type='text' name="password" id="password" label="Mật khẩu" placeholder="password"
                        className='form-control form-control_auth input-form_auth'
                    />

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
                </Form>
            </Formik>
        </div>
    );
}

export default Login;
