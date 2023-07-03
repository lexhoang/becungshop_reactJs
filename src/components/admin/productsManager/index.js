import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';


import * as api_products from '../../../api/api_products';
import * as api_types from '../../../api/api_types';
import * as act_filter from '../../../redux/actions/act_filter';

import Loading from '../../loading/Loading';
import { FormProduct } from './formProductManager';
import { productForData } from '../../constant_string/TextProductFor'

//////////     START UI     ///////////
import { Button, ButtonGroup, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import { Pagination } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';


//////////     END UI     ///////////
export const ProductsManager = () => {
    const { loading, dataProducts, totalPages } = useSelector(state => state.productsReducer);
    const { dataTypes } = useSelector(state => state.typesReducer)
    const { searchProduct, searchCodeProduct, searchType, searchProductFor } = useSelector(state => state.filterReducer);

    const [limit, setLimit] = useState(12); // Số lượng sản phẩm trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();

    const [loadFormProduct, setLoadFormProduct] = useState({ action: '', value: '' });

    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => setShowForm(false);

    const handleFilter = () => {
        if (searchProduct == '' && searchCodeProduct == '' && searchType == '' && searchProductFor == '') {
            dispatch(api_products.getDataProduct(limit, currentPage));
        } else {
            dispatch(api_products.filterDataProduct(searchProduct, searchCodeProduct, searchType, searchProductFor, limit, currentPage));
        }
    }


    ////////       CRUD       ////////
    const handleDetailProduct = (product) => {
        setShowForm(true);
        setLoadFormProduct({ action: 'detail', value: product });
    }

    const handleFormAddNew = () => {
        setShowForm(true);
        setLoadFormProduct({ action: 'add', value: '' });
    }

    const handleEditProduct = (product) => {
        setShowForm(true);
        setLoadFormProduct({ action: 'edit', value: product });
    }

    const handleDeleteProduct = (IdProduct) => {
        swal({
            title: "Xóa sản phẩm này?",
            text: "Bạn chắc chắn muốn xóa sản phẩm này chứ, không thể khôi phục sau khi xóa!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(api_products.deleteDataProduct(IdProduct));
                    swal("Thành công! Sản phẩm đã được xóa!", {
                        icon: "success",
                    });
                } else {
                    swal("Sản phẩm chưa được xóa!", "", "warning");
                }
            });
    }

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        dispatch(api_types.getDataType())
        dispatch(api_products.getDataProduct(limit, currentPage));
    }, [currentPage, limit]);


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    return (
        <>
            {loading ? <Loading /> : null}
            <h3 className="text-center mb-5 text-color">QUẢN LÝ SẢN PHẨM</h3>
            {/* FILTER */}
            <Grid container mt={10} mb={5}>
                <Grid item xs={8} className="mx-auto text-center">
                    <Grid container>
                        <Grid item md={6} xs={12} my={1}>
                            <TextField variant="outlined" size="small" label="Search Name" sx={{ width: "90%" }}
                                value={searchProduct} onChange={(e) => dispatch(act_filter.filter_product(e.target.value))}
                            />
                        </Grid>

                        <Grid item md={6} xs={12} my={1}>
                            <TextField variant="outlined" size="small" label="Search Code" sx={{ width: "90%" }}
                                value={searchCodeProduct} onChange={(e) => dispatch(act_filter.filter_code_product(e.target.value))}
                            />
                        </Grid>

                        <Grid item md={6} xs={12} my={1}>
                            <FormControl sx={{ width: "90%" }}>
                                <InputLabel size="small">Type</InputLabel>
                                <Select
                                    size="small"
                                    value={searchType}
                                    label="Product for"
                                    onChange={(e) => dispatch(act_filter.filter_type(e.target.value))}
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

                        <Grid item md={6} xs={12} my={1}>
                            <FormControl sx={{ width: "90%" }}>
                                <InputLabel size="small">Product for</InputLabel>
                                <Select
                                    size="small"
                                    value={searchProductFor}
                                    label="Product for"
                                    onChange={(e) => dispatch(act_filter.filter_productFor(e.target.value))}
                                >
                                    {
                                        productForData.map((productFor) => (
                                            <MenuItem key={productFor.id} value={productFor.value}>{productFor.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} my={4}>
                            <Button variant="contained" color="warning" className='btn-contain w-50'
                                onClick={() => handleFilter()}
                            >Tìm kiếm</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <div className='d-flex justify-content-around'>
                <Button variant="contained" color="success"
                    className='btn-contain'
                    onClick={() => handleFormAddNew()}
                >+ Thêm mới</Button>
                <select className='px-2 form-select text-center' style={{ width: '100px' }}
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}>
                    <option value={5}>5</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <FormProduct showForm={showForm} handleCloseForm={handleCloseForm}
                loadFormProduct={loadFormProduct}
            />

            <Grid container justifyContent="center">
                <Stack spacing={2}>
                    <Pagination
                        variant="outlined" color="warning"
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Stack>
            </Grid>

            <table className="mt-2 table table-striped table-inverse table-responsive">
                <thead className="thead-inverse text-center bg-info text-light" style={{ fontSize: "18px" }}>
                    <tr className='text-font'>
                        <th>Ảnh</th>
                        <th>Mã sản phẩm</th>
                        <th>Tên</th>
                        <th>Dành cho</th>
                        <th>Loại</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Chi tiết</th>
                        <th rowSpan="3">Thao Tác</th>
                    </tr>
                </thead>
                <tbody className='text-center text-font'>
                    {
                        dataProducts.map((product) => {
                            return (
                                <tr key={product._id}>
                                    <td>
                                        <img src={product.photoUrl} alt="ảnh" width="120px" height='120px' />
                                    </td>
                                    <td> {product.infoCode} </td>
                                    <td> {product.name} </td>
                                    <td> {product.productFor == productForData[1].value ? productForData[1].name : productForData[2].name} </td>
                                    <td> {product.type.name} </td>
                                    <td> {product.amount} </td>
                                    <td> {numberWithCommas(product.prices)} </td>
                                    <td>
                                        <Button variant='outlined' color="info" onClick={() => handleDetailProduct(product)}><InfoIcon /></Button>
                                    </td>
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

            <Grid container justifyContent="center">
                <Stack spacing={2}>
                    <Pagination
                        variant="outlined" color="warning"
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Stack>
            </Grid>
        </>
    )
}
