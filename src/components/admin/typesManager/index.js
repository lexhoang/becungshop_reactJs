import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import * as api_types from '../../../api/api_types'
import * as api_productFor from '../../../api/api_productFor'

//////////     START UI     ///////////
import { Button, ButtonGroup, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { FormType } from './FormType';
//////////     END UI     ///////////



export const TypesManager = () => {
    const { dataTypes } = useSelector(state => state.typesReducer);
    const { dataProductFor } = useSelector(state => state.productForReducer);

    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => {
        setShowForm(false);
    }

    const [loadFormType, setLoadFormType] = useState({ action: '', value: '' })

    const [searchType, setSearchType] = useState("");
    const [searchProductFor, setSearchProductFor] = useState("");
    const handleFilter = () => {
        dispatch(api_types.filterDataType(searchType, searchProductFor))
    }

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
        dispatch(api_types.getDataType());
        dispatch(api_productFor.getDataProductFor());
    }, [])


    return (
        <>
            <h3 className="text-center">TYPE MANAGER</h3>
            <Grid container mt={12} mb={5}>
                <Grid item xs={8} className="mx-auto text-center">
                    <Grid container>
                        <Grid item md={6} xs={12} my={1}>
                            <TextField variant="outlined" size="small" label="Search Type"
                                sx={{ width: "70%" }}
                                value={searchType}
                                onChange={(e) => { setSearchType(e.target.value) }}
                            />
                        </Grid>

                        <Grid item md={6} xs={12} my={1}>
                            <FormControl sx={{ width: "70%" }}>
                                <InputLabel size="small">Product for</InputLabel>
                                <Select
                                    size="small"
                                    value={searchProductFor}
                                    label="Product for"
                                    onChange={(e) => setSearchProductFor(e.target.value)}
                                >
                                    <MenuItem value=''>Tất cả</MenuItem>
                                    {
                                        dataProductFor.map((productFor) => {
                                            return (
                                                <MenuItem key={productFor._id} value={productFor._id}>{productFor.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} my={3}>
                            <Button variant="contained" color="warning" className='w-50'
                                onClick={() => handleFilter()}
                            >Filter</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <div className='d-flex justify-content-around'>
                <Button variant="contained" color="success"
                    onClick={() => handleFormAddNew()}
                >+ Thêm mới</Button>
                <select>
                    <option value="" key="">50</option>
                </select>
            </div>

            <FormType showForm={showForm} handleCloseForm={handleCloseForm}
                loadFormType={loadFormType}
            />

            <table className="mt-2 table table-striped table-inverse table-responsive">
                <thead className="thead-inverse text-center bg-info text-light" style={{ fontSize: "18px" }}>
                    <tr>
                        <th>Ảnh</th>
                        <th>Sản phẩm dành cho</th>
                        <th>Loại sản phẩm</th>
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
                                        <img src={type.photoUrl} alt="ảnh" width="120px" height='120px' />
                                    </td>
                                    <td> {type.productFor.name}</td>
                                    <td> {type.name} - {type.productFor.name}</td>
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
