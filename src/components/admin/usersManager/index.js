import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as api_users from '../../../api/api_users';


import { Button, ButtonGroup } from '@mui/material';
import FormAuth from './FormAuth';


export default function UsersManager() {
    const dispatch = useDispatch();
    const { dataUsers } = useSelector((state) => state.usersReducer);

    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => {
        setShowForm(false);
    }
    const handleFormAddNew = () => {
        setShowForm(true);
    }

    const handleActive = (user) => {
        const newActive = !user.active
        dispatch(api_users.patchDataUser({ ...user, active: newActive }))
    }

    const handleDelete = (userID) => {
        dispatch(api_users.deleteDataUser(userID))
    }

    useEffect(() => {
        dispatch(api_users.getDataUser())
    }, [])
    return (
        <div>
            <Button variant="contained" color="success"
                onClick={() => handleFormAddNew()}
            >+ Thêm mới</Button>

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
                        dataUsers.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <img src={user.photoUrl} alt="ảnh" width="40px" height='40px' />
                                </td>
                                <td> {user.name} </td>
                                <td> {user.account} </td>
                                <td> {user.phone} </td>
                                <td> {user.active == true ? "Đang hoạt động" : 'Đã bị khóa'} <br />
                                    <button onClick={() => handleActive(user)}>Active</button>
                                </td>
                                <td>
                                    <ButtonGroup aria-label="outlined primary button group">
                                        <Button variant='outlined' color="error" onClick={() => handleDelete(user._id)}>Delete</Button>
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
