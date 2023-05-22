import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as act_filter from '../../../redux/actions/act_filter';
import * as api_products from '../../../api/api_products';

////////     START  UI      ////////
import MenuItem from './menuItem';

import { Button, Grid } from '@mui/material';
import { Input } from 'antd';

import LogoImage from '../../../assets/images/logo_becungshop.svg';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
////////     END  UI      ////////

const { Search } = Input

export default function Header() {
    const { searchName, searchType, searchProductFor } = useSelector(state => state.filterReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSearch = (value) => {
        navigate('/products');
        dispatch(act_filter.filter_name(value));
    }

    const handleAllProductFor = () => {
        navigate('/products');
        let IdProductFor = ""
        dispatch(act_filter.filter_productFor(IdProductFor))
    }
    const handleSearchProductFor = (IdProductFor) => {
        navigate('/products');
        dispatch(act_filter.filter_productFor(IdProductFor))
    }

    const handleAllType = () => {
        navigate('/products');
        let IdType = ""
        dispatch(act_filter.filter_type(IdType))
    }
    const handleSearchType = (IdType) => {
        navigate('/products');
        dispatch(act_filter.filter_type(IdType))
    }


    useEffect(() => {
        if (searchName !== '' || searchType !== '' || searchProductFor !== '') {
            dispatch(api_products.filterDataProduct(searchName, searchType, searchProductFor));
        } else {
            dispatch(api_products.getDataProduct());
        }
    }, [searchName, searchType, searchProductFor]);

    return (
        <div className='bg-danger fixed-top px-3'>
            <Grid container p={1} className='align-items-center justify-content-evenly'>
                <Grid item xl={1} md={2} xs={3}>
                    <Link to="/" onClick={() => { handleAllProductFor(); handleAllType() }}>
                        <Grid item sx={{ width: { md: '120px', xs: '100px' } }}>
                            <img src={LogoImage} alt="" width='100%' />
                        </Grid>
                    </Link>
                </Grid>

                <Grid item xl={4} md={3} xs={6}>
                    <Grid item sx={{ width: { md: '90%', sm: '80%', xs: '100%' } }}>
                        <Search placeholder="input search text"
                            onSearch={onSearch} enterButton
                        />
                    </Grid>
                </Grid>

                <Grid item xl={4} md={5} sx={{ display: { md: 'flex', xs: 'none' }, justifyContent: 'space-between' }}>
                    <MenuItem handleAllType={handleAllType} handleAllProductFor={handleAllProductFor} handleSearchType={handleSearchType} handleSearchProductFor={handleSearchProductFor} />
                </Grid>

                <Grid item md={2} xs={3} >
                    <Grid container>
                        <Grid item xs={6} textAlign="right">
                            <Button><ShoppingCartIcon sx={{ color: "white", fontSize: { md: '34px', sm: '34px', xs: '24px' } }} /></Button>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <Button size="small" variant="contained" color="primary">Login</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >

            <Grid item xs={12} className='bg-info p-1 rounded-top' sx={{ display: { md: 'none', xs: 'flex' }, justifyContent: 'space-evenly' }}>
                <MenuItem handleSearchType={handleSearchType} handleSearchProductFor={handleSearchProductFor} />
            </Grid>
        </div >
    )
}
