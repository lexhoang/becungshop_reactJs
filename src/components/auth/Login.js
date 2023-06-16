import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="form-body">
            <form className="form-css">
                <h3 className='text-center mb-5' style={{ letterSpacing: '3px' }}>ĐĂNG NHẬP</h3>
                <div className="form-group mb-3">
                    <label htmlFor='acount' style={{ letterSpacing: '2px' }} className="form-label fw-bold">Tài khoản</label>
                    <input type="text" name='acount' id='acount'
                        className="form-control form-control_auth input-form_auth" placeholder='acount'
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor='password' style={{ letterSpacing: '2px' }} className="form-label fw-bold">Mật khẩu</label>
                    <input type="text" name='password' id='password'
                        className="form-control form-control_auth input-form_auth" placeholder='password'
                    />
                </div>

                <div className='mt-5'>
                    <button style={{ letterSpacing: '2px' }}
                        className='btn btn-outline-light text-white w-100 input-form_auth fw-bold'
                    >ĐĂNG NHẬP</button>
                </div>

                <div className='mt-5 btn btn-sm btn-info w-100'>
                    <Link to='/register' className='text-register' >Đăng ký tài khoản</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
