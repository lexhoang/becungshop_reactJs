import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonGroup, Grid, TextField, Select, MenuItem, InputLabel, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Pagination from '@mui/material/Pagination';
import * as api_productFor from '../../../api/api_productFor';
import { FormProductFor } from './FormProductFor';


export const ProductForManager = () => {
    const { dataProductFor } = useSelector(state => state.productForReducer);
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => setShowForm(false);

    const handleFormAddNew = () => {
        setShowForm(true);
    }

    const handleDeleteProductFor = (IdProductFor) => {
        dispatch(api_productFor.deleteDataProductFor(IdProductFor));
    }

    useEffect(() => {
        dispatch(api_productFor.getDataProductFor())
    }, []);



    return (
        <>
            <h3 className="text-center mb-5">PRODUCT FOR MANAGER</h3>
            <div className='d-flex justify-content-around' style={{ marginTop: '80px' }}>
                <Button variant="contained" color="success"
                    onClick={() => handleFormAddNew()}
                >+ Thêm mới</Button>

                <TextField variant="outlined" size="small" style={{ width: "400px" }}
                    label="Search Name"
                />
            </div>

            <FormProductFor showForm={showForm} handleCloseForm={handleCloseForm} />

            <table className="mt-2 table table-striped table-inverse table-responsive">
                <thead className="thead-inverse text-center bg-info text-light" style={{ fontSize: "18px" }}>
                    <tr>
                        <th>Ảnh</th>
                        <th>Sản Phẩm Dành Cho</th>
                        <th>Mô Tả</th>
                        <th rowSpan="3">Thao Tác</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        dataProductFor.map((productFor) => {
                            return (
                                <tr key={productFor._id}>
                                    <td>
                                        <img src={productFor.img} alt="ảnh" width="120px" height='120px' />
                                    </td>
                                    <td> {productFor.name} </td>
                                    <td> {productFor.description} </td>
                                    <td>
                                        <ButtonGroup aria-label="outlined primary button group">
                                            <Button variant='outlined' color="warning" ><ModeEditIcon /></Button>
                                            <Button variant='outlined' color="error" onClick={() => handleDeleteProductFor(productFor._id)}><DeleteIcon /></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </>
    )
}
