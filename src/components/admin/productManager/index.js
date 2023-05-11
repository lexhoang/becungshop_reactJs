import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonGroup, Grid, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import * as api_product from '../../../api/api_product';
import { FormProduct } from './formProductManager';


export const ProductManager = () => {
    const { dataProduct } = useSelector(state => state.productReducer);
    const dispatch = useDispatch();

    const [loadFormProduct, setLoadFormProduct] = useState({ action: '', value: '' });

    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => setShowForm(false);

    const handleFormAddNew = () => {
        setShowForm(true);
        setLoadFormProduct({ action: 'add', value: '' })
    }

    const handleEditProduct = (product) => {
        setShowForm(true);
        setLoadFormProduct({ action: 'edit', value: product })
    }

    const handleDeleteProduct = (IdProduct) => {
        dispatch(api_product.deleteDataProduct(IdProduct));
    }

    useEffect(() => {
        dispatch(api_product.getDataProduct())
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
                        <th>Màu sắc</th>
                        <th>Kích cỡ</th>
                        <th rowSpan="3">Thao Tác</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        dataProduct.map((product) => {
                            return (
                                <tr key={product._id}>
                                    <td>
                                        <img src={product.image} alt="ảnh" width="120px" height='120px' />
                                    </td>
                                    <td> {product.name} </td>
                                    <td> {product.productFor} </td>
                                    <td> {product.type.name} </td>
                                    <td> {product.amount} </td>
                                    <td> {product.prices} </td>
                                    <td> {product.color} </td>
                                    <td> {product.size} </td>
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
            </table>
        </>
    )
}
