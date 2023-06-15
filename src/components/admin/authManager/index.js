import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as api_auth from '../../../api/api_auth';
import { Input } from 'antd';


import { Button, ButtonGroup, Grid, TextField } from '@mui/material';
import FormAuth from './FormAuth';
import DeleteIcon from '@mui/icons-material/Delete';

const { Search } = Input

export default function AuthManager() {
    const dispatch = useDispatch();
    const { dataAuth } = useSelector((state) => state.authReducer);

    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => {
        setShowForm(false);
    }
    const handleFormAddNew = () => {
        setShowForm(true);
    }

    const handleActive = (user) => {
        const newActive = !user.active
        dispatch(api_auth.patchDataAuth({ ...user, active: newActive }))
    }

    const handleDelete = (userID) => {
        dispatch(api_auth.deleteDataAuth(userID))
    }

    const onSearchAcount = (name) => {

    }


    useEffect(() => {
        dispatch(api_auth.getDataAuth())
    }, [])
    return (
        <div>
            <h3 className="text-center">AUTH MANAGER</h3>

            <Grid container mt={12} mb={5}>
                <Grid item xs={8} className="mx-auto text-center">
                    <Grid container>
                        <Grid item xs={12} my={1}>
                            <Search placeholder="input search text"
                                onSearch={onSearchAcount}
                                enterButton
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <div className='d-flex justify-content-around'>
                <Grid item xs={12}>
                    <Button variant="contained" color="success"
                        onClick={() => handleFormAddNew()}
                    >+ Thêm mới
                    </Button>
                </Grid>
                <select>
                    <option value="" key="">50</option>
                </select>
            </div>

            <FormAuth showForm={showForm} handleCloseForm={handleCloseForm} />

            <table className="mt-2 table table-striped table-inverse table-responsive">
                <thead className="thead-inverse text-center bg-info text-light" style={{ fontSize: "18px" }}>
                    <tr>
                        <th></th>
                        <th>Tên</th>
                        <th>Tài khoản</th>
                        <th>Số điện thoại</th>
                        <th>Active</th>
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
                                <td> {user.phone} </td>
                                <td> {user.active == true ? "Đang hoạt động" : 'Đã bị khóa'} <br />
                                    <button className={`btn btn-sm ${user.active == true ? "btn-outline-danger" : 'btn-outline-success'}`}
                                        onClick={() => handleActive(user)}>
                                        {user.active == true ? "Khóa" : 'Kích hoạt'}
                                    </button>
                                </td>
                                <td>
                                    <ButtonGroup aria-label="outlined primary button group">
                                        <Button variant='outlined' color="error" onClick={() => handleDelete(user._id)}><DeleteIcon /></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
