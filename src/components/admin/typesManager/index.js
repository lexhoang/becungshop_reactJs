import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Grid, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { FormType } from './FormType';
import { useDispatch, useSelector } from 'react-redux';
import * as api_types from '../../../api/api_types'
import * as api_productFor from '../../../api/api_productFor'

export const TypeManager = () => {
    const { dataTypes } = useSelector(state => state.typesReducer)
    const { dataProductFor } = useSelector(state => state.productForReducer)
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => {
        setShowForm(false);
    }

    const [loadFormType, setLoadFormType] = useState({ action: '', value: '' })


    ////////////      CRUD     ////////////
    const handleFormAddNew = () => {
        setShowForm(true);
        setLoadFormType({ action: 'add', value: '' });
    }

    const handleEditProductFor = (type) => {
        setShowForm(true);
        setLoadFormType({ action: 'edit', value: type });
    }

    const handleDeleteProductFor = (IdType) => {
        dispatch(api_types.deleteDataType(IdType))
    }

    useEffect(() => {
        dispatch(api_types.getDataType())
        dispatch(api_productFor.getDataProductFor())
    }, [])


    return (
        <>
            <h3 className="text-center mb-5">TYPE MANAGER</h3>
            <div className='d-flex justify-content-around' style={{ marginTop: '80px' }}>
                <Button variant="contained" color="success"
                    onClick={() => handleFormAddNew()}
                >+ Thêm mới</Button>

                <TextField variant="outlined" size="small" style={{ width: "400px" }}
                    label="Search Name"
                />
            </div>

            <FormType showForm={showForm} handleCloseForm={handleCloseForm}
                loadFormType={loadFormType}
            />

            <table className="mt-2 table table-striped table-inverse table-responsive">
                <thead className="thead-inverse text-center bg-info text-light" style={{ fontSize: "18px" }}>
                    <tr>
                        <th>Ảnh</th>
                        <th>Loại sản phẩm</th>
                        <th>Sản phẩm dành cho</th>
                        <th>Mô Tả</th>
                        <th rowSpan="3">Thao Tác</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        dataTypes.map((type) => {
                            return (
                                <tr key={type._id}>
                                    <td>
                                        <img src={type.image} alt="ảnh" width="120px" height='120px' />
                                    </td>
                                    <td> {type.name} </td>
                                    <td> {type.productFor.name} </td>
                                    <td> {type.description} </td>
                                    <td>
                                        <ButtonGroup aria-label="outlined primary button group">
                                            <Button variant='outlined' color="warning" onClick={() => handleEditProductFor(type)}><ModeEditIcon /></Button>
                                            <Button variant='outlined' color="error" onClick={() => handleDeleteProductFor(type._id)}><DeleteIcon /></Button>
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
