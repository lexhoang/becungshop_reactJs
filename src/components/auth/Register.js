import React from 'react';

const Resgister = () => {
    return (
        <div className="form-body">
            <form className="form-css">
                <h3 className='text-center mb-5' style={{ letterSpacing: '3px' }}>ĐĂNG KÝ</h3>
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

                <div className="form-group mb-3">
                    <label htmlFor='confirmPassword' style={{ letterSpacing: '2px' }} className="form-label fw-bold">Xác nhận mật khẩu</label>
                    <input type="text" name='confirmPassword' id='confirmPassword'
                        className="form-control form-control_auth input-form_auth" placeholder='confirm password'
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor='phone' style={{ letterSpacing: '2px' }} className="form-label fw-bold">Số điện thoại</label>
                    <input type="text" name='phone' id='phone'
                        className="form-control form-control_auth input-form_auth" placeholder='phone'
                    />
                </div>

                <div className='mt-5'>
                    <button style={{ letterSpacing: '2px' }}
                        className='btn btn-outline-light text-white w-100 input-form_auth fw-bold'
                    >ĐĂNG KÝ</button>
                </div>
            </form>
        </div>
    );
}

export default Resgister;
