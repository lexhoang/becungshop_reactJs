import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

import * as api_auth from '../../../api/api_auth';
import * as act_filter from '../../../redux/actions/act_filter';

import CartDetail from './CartDetail';
import FormAuth from './FormAuth';

import { Button, ButtonGroup, Grid, Pagination, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CircleIcon from '@mui/icons-material/Circle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';

import SearchAuth from './SearchAuth';
// import { logDOM } from '@testing-library/react';

export default function AuthManager() {
    const { dataAuth, totalPagesAuth } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();


    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);


    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => {
        setShowForm(false);
    }
    const handleFormAddNew = () => {
        setShowForm(true);
    }

    const [selectedCart, setSelectedCart] = useState([]);
    const [showCartDetail, setShowCartDetail] = useState(false);
    const handleCloseCartDetail = () => {
        setShowCartDetail(false);
    }
    const handleOpenCartDetail = () => {
        setShowCartDetail(true);
    }
    const handleDetail = (user) => {
        handleOpenCartDetail()
        setSelectedCart(user)
    }

    const handleActive = (user) => {
        const newActive = !user.active
        dispatch(api_auth.putDataAuth({ ...user, active: newActive }))
    }

    const handleDeleteAuth = (userID) => {
        swal({
            title: "Xóa tài khoản này?",
            text: "Bạn chắc chắn muốn xóa người dùng này chứ, không thể khôi phục sau khi xóa!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    console.log(userID);
                    dispatch(api_auth.deleteDataAuth(userID));
                    swal("Thành công! Người dùng đã được xóa!", {
                        icon: "success",
                    });
                } else {
                    swal("Tài khoản này chưa được xóa!");
                }
            });
    }

    const onSearchAccount = (value) => {
        dispatch(act_filter.filter_account(value));
        dispatch(api_auth.filterUserAccount(value))
    }

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        dispatch(api_auth.getDataAuth(limit, currentPage));
    }, [limit, currentPage]);

    return (
        <div>
            <h3 className="text-center">AUTH MANAGER</h3>

            <SearchAuth onSearchAccount={onSearchAccount} />

            <div className='d-flex justify-content-around'>
                <Grid item xs={12}>
                    <Button variant="contained" color="success"
                        className='btn-contain'
                        onClick={() => handleFormAddNew()}
                    >+ Thêm mới
                    </Button>
                </Grid>
                <select className='px-2 form-select text-center' style={{ width: '100px' }}
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}>
                    <option value={5}>5</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <FormAuth showForm={showForm}
                handleCloseForm={handleCloseForm}
                limit={limit} currentPage={currentPage}
            />
            <CartDetail selectedCart={selectedCart} setSelectedCart={setSelectedCart}
                showCartDetail={showCartDetail}
                handleCloseCartDetail={handleCloseCartDetail}
                limit={limit} currentPage={currentPage}
            />


            <table className="mt-2 table table-striped table-inverse table-responsive">
                <thead className="thead-inverse text-center bg-info text-light" style={{ fontSize: "18px" }}>
                    <tr>
                        <th></th>
                        <th>Tên</th>
                        <th>Tài khoản</th>
                        <th>Số điện thoại</th>
                        <th>Chi tiết</th>
                        <th>Trạng thái</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        dataAuth.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <img src={user.photoUrl} alt="ảnh" width="40px" height='40px' />
                                </td>
                                <td> {user.name} </td>
                                <td> {user.account} </td>
                                <td>+84 {user.phone} </td>
                                <td>
                                    <ButtonGroup aria-label="outlined primary button group">
                                        <Button variant='contained' className='btn-contain'
                                            onClick={() => handleDetail(user)}><ShoppingCartIcon />
                                        </Button>
                                    </ButtonGroup>
                                </td>
                                <td> {
                                    user.active == true ?
                                        <>
                                            <CircleIcon fontSize='small' color='success' />
                                            <span>Đang hoạt động</span>
                                        </>
                                        :
                                        <>
                                            <HighlightOffIcon fontSize='small' color='error' />
                                            <span>Đã bị khóa</span>
                                        </>
                                }
                                    <br />
                                    <button className={`btn btn-sm ${user.active == true ? "btn-outline-warning" : 'btn-outline-success'}`}
                                        onClick={() => handleActive(user)}>
                                        {user.active == true ? "Tạm dừng" : 'Kích hoạt'}
                                    </button>
                                </td>
                                <td>
                                    <ButtonGroup aria-label="outlined primary button group">
                                        <Button variant='outlined' color="error"
                                            onClick={() => handleDeleteAuth(user._id)}><DeleteIcon />
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Grid container justifyContent="center">
                <Stack spacing={2}>
                    <Pagination
                        variant="outlined" color="warning"
                        count={totalPagesAuth}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Stack>
            </Grid>
        </div>
    )
}
