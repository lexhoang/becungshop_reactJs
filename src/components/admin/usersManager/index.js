import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as api_users from '../../../api/api_users';


import { Button, ButtonGroup } from '@mui/material';



export default function UsersManager() {
    const dispatch = useDispatch();
    const { dataUsers } = useSelector((state) => state.usersReducer);


    const handleDelete = (userID) => {
        dispatch(api_users.deleteDataUser(userID))
    }

    useEffect(() => {
        dispatch(api_users.getDataUser())
    }, [])
    return (
        <div>
            <table className="mt-2 table table-striped table-inverse table-responsive">
                <thead className="thead-inverse text-center bg-info text-light" style={{ fontSize: "18px" }}>
                    <tr>
                        <th>Tên</th>
                        <th>Tài khoản</th>
                        <th>Số điện thoại</th>
                        <th rowSpan="3">Thao Tác</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        dataUsers.map((user) => (
                            <tr key={user._id}>
                                <td> {user.name} </td>
                                <td> {user.account} </td>
                                <td> {user.phone} </td>
                                <td>
                                    <ButtonGroup aria-label="outlined primary button group">
                                        <Button variant='outlined' color="warning" >Edit</Button>
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
