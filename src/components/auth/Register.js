import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'
import * as Yup from 'yup';
import * as api_auth from '../../api/api_auth';
import Avatar from '../../assets/images/avt.jpg';
import { Form, Formik } from 'formik';


import MyField from '../MyField';
import { Link, useNavigate } from 'react-router-dom';



const Register = () => {
    const { dataAuth } = useSelector(state => (state.authReducer));

    const dispatch = useDispatch();
    const navigate = useNavigate()

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

    const [formAuth, setFormAuth] = useState({ account: '', password: '', name: '', phone: '' });

    const validationSchema = Yup.object().shape({
        account: Yup.string().required("Vui lòng điền tên đăng nhập"),
        password: Yup.string().required("Vui lòng điền mật khẩu"),
        name: Yup.string().required("Vui lòng điền tên"),
        phone: Yup.string().required("Vui lòng điền số điện thoại")
    })

    const handleSubmit = (value, { resetForm }) => {
        dispatch(api_auth.postDataAuth({ ...value, photoUrl: imageUrls }));
        resetForm();
        navigate('/login')
    }

    return (
        <div className="form-body">
            <Formik
                validationSchema={validationSchema}
                initialValues={formAuth}
                onSubmit={handleSubmit}
            >
                <Form className="form-css">
                    <h3 className='text-center mb-5' style={{ letterSpacing: '3px' }}>ĐĂNG KÝ</h3>
                    <MyField type='text' name="account" id="account" label="Tên đăng nhập" placeholder="account"
                        className='form-control form-control_auth input-form_auth'
                    />

                    <MyField type='text' name="password" id="password" label="Mật khẩu" placeholder="password"
                        className='form-control form-control_auth input-form_auth'
                    />

                    <MyField type='text' name="name" id="name" label="Tên hiển thị" placeholder="name"
                        className='form-control form-control_auth input-form_auth'
                    />

                    <MyField type='number' name="phone" id="phone" label="Số điện thoại" placeholder="phone"
                        className='form-control form-control_auth input-form_auth'
                    />

                    <div className='mt-5'>
                        <button type='submit' style={{ letterSpacing: '2px' }}
                            className='btn btn-outline-light text-white w-100 input-form_auth fw-bold'
                        >
                            ĐĂNG KÝ
                        </button>
                    </div>

                    <div className='mt-5 btn btn-sm btn-info w-50'>
                        <Link to='/login' className='text-register' >Đã có tài khoản</Link>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default Register;