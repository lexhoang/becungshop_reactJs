import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import * as api_products from '../../../api/api_products';
import * as api_types from '../../../api/api_types';
import * as api_productFor from '../../../api/api_productFor';

import { FormProduct } from './formProductManager';


//////////     START UI     ///////////
import { Button, ButtonGroup, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';



//////////     END UI     ///////////
export const ProductsManager = () => {
    const { dataProducts } = useSelector(state => state.productsReducer);
    const { dataTypes } = useSelector(state => state.typesReducer)
    const { dataProductFor } = useSelector(state => state.productForReducer);

    const dispatch = useDispatch();

    const [loadFormProduct, setLoadFormProduct] = useState({ action: '', value: '' });

    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => setShowForm(false);

    const [searchName, setSearchName] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchProductFor, setSearchProductFor] = useState('');

    const handleFilter = () => {
        dispatch(api_products.filterDataProduct(searchName, searchType, searchProductFor));
    }


    ////////       CRUD       ////////
    const handleFormAddNew = () => {
        setShowForm(true);
        setLoadFormProduct({ action: 'add', value: '' })
    }

    const handleEditProduct = (product) => {
        setShowForm(true);
        setLoadFormProduct({ action: 'edit', value: product });
    }

    const handleDeleteProduct = (IdProduct) => {
        dispatch(api_products.deleteDataProduct(IdProduct));
    }

    useEffect(() => {
        dispatch(api_types.getDataType())
        dispatch(api_productFor.getDataProductFor());

        dispatch(api_products.getDataProduct());
    }, []);



    return (
        <>
            <h3 className="text-center mb-5">PRODUCT FOR MANAGER</h3>
            <Grid container mt={10} mb={5}>
                <Grid item xs={8} className="mx-auto text-center">
                    <Grid container>
                        <Grid item md={4} xs={12} my={1}>
                            <TextField variant="outlined" size="small" label="Search Name" sx={{ width: "90%" }}
                                value={searchName} onChange={(e) => setSearchName(e.target.value)}
                            />
                        </Grid>

                        <Grid item md={4} xs={12} my={1}>
                            <FormControl sx={{ width: "90%" }}>
                                <InputLabel size="small">Type</InputLabel>
                                <Select
                                    size="small"
                                    value={searchType}
                                    label="Product for"
                                    onChange={(e) => setSearchType(e.target.value)}
                                >
                                    <MenuItem value=''>Tất cả</MenuItem>
                                    {
                                        dataTypes.map((type) => {
                                            return (
                                                <MenuItem key={type._id} value={type._id}>{type.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item md={4} xs={12} my={1}>
                            <FormControl sx={{ width: "90%" }}>
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

                        <Grid item xs={12} my={4}>
                            <Button variant="contained" color="warning" className='w-50'
                                onClick={() => handleFilter()}
                            >Tìm kiếm</Button>
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

            <FormProduct showForm={showForm} handleCloseForm={handleCloseForm}
                loadFormProduct={loadFormProduct}
            />

            <table className="mt-2 table table-striped table-inverse table-responsive">
                <thead className="thead-inverse text-center bg-info text-light" style={{ fontSize: "18px" }}>
                    <tr>
                        <th>Ảnh</th>
                        <th>Tên</th>
                        <th>Dành cho</th>
                        <th>Loại</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th rowSpan="3">Thao Tác</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        dataProducts.map((product) => {
                            return (
                                <tr key={product._id}>
                                    <td>
                                        <img src={product.photoUrl} alt="ảnh" width="120px" height='120px' />
                                    </td>
                                    <td> {product.name} </td>
                                    <td>
                                        {
                                            dataProductFor.map((productFor) => (
                                                product.productFor === productFor._id ?
                                                    <p key={productFor._id}>{productFor.name}</p>
                                                    : null
                                            ))
                                        }
                                    </td>

                                    <td> {product.type.name} </td>
                                    <td> {product.amount} </td>
                                    <td> {product.prices} </td>
                                    <td>
                                        <ButtonGroup aria-label="outlined primary button group">
                                            <Button variant='outlined' color="warning" onClick={() => handleEditProduct(product)}><ModeEditIcon /></Button>
                                            <Button variant='outlined' color="error" onClick={() => handleDeleteProduct(product._id)}><DeleteIcon /></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table >
        </>
    )
}
