import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import * as api_productFor from '../../../api/api_productFor'

//////////     START UI     ///////////
import { Button, ButtonGroup, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { FormProductFor } from './FormProductFor';
//////////     END UI     ///////////

export const ProductForManager = () => {
    const { dataProductFor } = useSelector(state => state.productForReducer)
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => {
        setShowForm(false);
    }


    const [loadFormProductFor, setLoadFormProductFor] = useState({ action: '', value: '' });

    ////////////      CRUD     ////////////
    const handleFormAddNew = () => {
        setShowForm(true);
        setLoadFormProductFor({ action: 'add', value: '' });
    }

    const handleEditProductFor = (productFor) => {
        setShowForm(true);
        setLoadFormProductFor({ action: 'edit', value: productFor });
    }

    const handleDeleteProductFor = (IdProductFor) => {
        dispatch(api_productFor.deleteDataProductFor(IdProductFor))
    }

    useEffect(() => {
        dispatch(api_productFor.getDataProductFor())
    }, [])

    return (
        <>
            <h3 className="text-center">PRODUCT FOR MANAGER</h3>

            <Button variant="contained" color="success"
                onClick={() => handleFormAddNew()}
            >+ Thêm mới</Button>

            <FormProductFor showForm={showForm} handleCloseForm={handleCloseForm}
                loadFormProductFor={loadFormProductFor}
            />

            <table className="mt-2 table table-striped table-inverse table-responsive">
                <thead className="thead-inverse text-center bg-info text-light" style={{ fontSize: "18px" }}>
                    <tr>
                        <th>Ảnh</th>
                        <th>Sản phẩm dành cho</th>
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
                                        <img src={productFor.photoUrl} alt="ảnh" width="120px" height='120px' />
                                    </td>
                                    <td> {productFor.name}</td>
                                    <td> {productFor.description} </td>
                                    <td>
                                        <ButtonGroup aria-label="outlined primary button group">
                                            <Button variant='outlined' color="warning" onClick={() => handleEditProductFor(productFor)}><ModeEditIcon /></Button>
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
