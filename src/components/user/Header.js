import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material'
import { ImagesIcon } from '../../assets/Images';
import LogoImage from '../../assets/images/logo_becungshop.svg';
import * as api_products from '../../api/api_products';
import * as api_types from '../../api/api_types';
import * as api_productFor from '../../api/api_productFor';
import { Link, useNavigate } from 'react-router-dom';
import * as act_filter from '../../redux/actions/act_filter';

export default function Header() {
    const { dataTypes } = useSelector(state => state.typesReducer);
    const { dataProductFor } = useSelector(state => state.productForReducer);
    const { searchName, searchType, searchProductFor } = useSelector(state => state.filterReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleAllProductFor = () => {
        navigate('/products');
        dispatch(act_filter.filter_productFor(""))
    }
    const handleSearchProductFor = (IdProductFor) => {
        navigate('/products');
        dispatch(act_filter.filter_productFor(IdProductFor))
    }

    const handleAllType = () => {
        navigate('/products');
        dispatch(act_filter.filter_type(""))
    }
    const handleSearchType = (IdType) => {
        navigate('/products');
        dispatch(act_filter.filter_type(IdType))
    }


    useEffect(() => {
        dispatch(api_types.getDataType());
        dispatch(api_productFor.getDataProductFor());

        if (searchName !== '' || searchType !== '' || searchProductFor !== '') {
            dispatch(api_products.filterDataProduct(searchName, searchType, searchProductFor));
        } else {
            dispatch(api_products.getDataProduct());
        }
    }, [searchName, searchType, searchProductFor]);

    return (
        <div className='bg-danger fixed-top px-5'>
            <Grid container p={1}>
                <Grid item md={3} xs={6}>
                    <Link to="/" onClick={() => { handleAllProductFor(); handleAllType() }}>
                        <div style={{ width: '120px' }}>
                            <img src={LogoImage} alt="" width='100%' />
                        </div>
                    </Link>
                </Grid>

                <Grid item xs={6} sx={{ display: { md: 'flex', xs: 'none' }, justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '35px', borderRadius: '50%', backgroundColor: '#fff', cursor: 'pointer' }}>
                            <img src={ImagesIcon[0].icon} alt="" width="100%"
                                onClick={() => handleAllProductFor()}
                            />
                        </div>
                        <span style={{ fontSize: '13px' }} className='text-white'>Tất cả</span>
                    </div>
                    {
                        dataProductFor.map(productFor => {
                            return (
                                <div key={productFor._id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div className={`bg-${productFor._id === searchProductFor ? "warning" : "white"}`}
                                        style={{ width: '35px', borderRadius: '50%', cursor: 'pointer' }}>
                                        <img src={productFor.photoUrl} alt="" width="100%" onClick={() => handleSearchProductFor(productFor._id)} />
                                    </div>
                                    <span style={{ fontSize: '13px' }} className={`text-${productFor._id === searchProductFor ? "warning" : "white"}`}>
                                        {productFor.name}
                                    </span>
                                </div>
                            )
                        })
                    }
                    <hr />

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '35px', borderRadius: '50%', backgroundColor: '#fff', cursor: 'pointer' }}>
                            <img src={ImagesIcon[0].icon} alt="" width="100%"
                                onClick={() => handleAllType()}
                            />
                        </div>
                        <span style={{ fontSize: '13px' }} className='text-white'>Tất cả</span>
                    </div>
                    {
                        dataTypes.map(type => {
                            return (
                                <div key={type._id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div className={`bg-${type._id === searchType ? "warning" : "white"}`}
                                        style={{ width: '35px', borderRadius: '50%', cursor: 'pointer' }}>
                                        <img src={type.photoUrl} alt="" width="100%" onClick={() => handleSearchType(type._id)} />
                                    </div>
                                    <span style={{ fontSize: '13px' }} className={`text-${type._id === searchType ? "warning" : "white"}`}>{type.name}</span>
                                </div>
                            )
                        })
                    }
                </Grid>

                <Grid item md={3} xs={6} textAlign="right">
                    <Button variant="contained" color="primary" >Login</Button>
                </Grid>
            </Grid >

            <Grid item xs={12} className='bg-info p-1 rounded-top' sx={{ display: { md: 'none', xs: 'flex' }, justifyContent: 'space-evenly' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '35px', borderRadius: '50%', backgroundColor: '#fff', cursor: 'pointer' }}>
                        <img src={ImagesIcon[0].icon} alt="" width="100%"
                            onClick={() => handleAllProductFor()}
                        />
                    </div>
                    <span style={{ fontSize: '13px' }} className='text-white'>Tất cả</span>
                </div>
                {
                    dataProductFor.map(productFor => {
                        return (
                            <div key={productFor._id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div className={`bg-${productFor._id === searchProductFor ? "warning" : "white"}`}
                                    style={{ width: '35px', borderRadius: '50%', cursor: 'pointer' }}>
                                    <img src={productFor.photoUrl} alt="" width="100%" onClick={() => handleSearchProductFor(productFor._id)} />
                                </div>
                                <span style={{ fontSize: '13px' }} className={`text-${productFor._id === searchProductFor ? "warning" : "white"}`}>
                                    {productFor.name}
                                </span>
                            </div>
                        )
                    })
                }
                <hr />

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '35px', borderRadius: '50%', backgroundColor: '#fff', cursor: 'pointer' }}>
                        <img src={ImagesIcon[0].icon} alt="" width="100%"
                            onClick={() => handleAllType()}
                        />
                    </div>
                    <span style={{ fontSize: '13px' }} className='text-white'>Tất cả</span>
                </div>
                {
                    dataTypes.map(type => {
                        return (
                            <div key={type._id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div className={`bg-${type._id === searchType ? "warning" : "white"}`}
                                    style={{ width: '35px', borderRadius: '50%', cursor: 'pointer' }}>
                                    <img src={type.photoUrl} alt="" width="100%" onClick={() => handleSearchType(type._id)} />
                                </div>
                                <span style={{ fontSize: '13px' }} className={`text-${type._id === searchType ? "warning" : "white"}`}>{type.name}</span>
                            </div>
                        )
                    })
                }
            </Grid>
        </div >
    )
}
