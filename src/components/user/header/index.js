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
import LogoImage_mb from '../../../assets/images/logo.png';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuItemResponsive from './menuItemResponsive';
////////     END  UI      ////////

const { Search } = Input

export default function Header() {
    const { searchName, searchType, searchProductFor } = useSelector(state => state.filterReducer);
    const { user } = useSelector(state => state.loginReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const limit = 6; // Số lượng sản phẩm trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1);


    const onSearchName = (value) => {
        navigate('/products');
        dispatch(act_filter.filter_name(value));
    }

    const handleAllProductFor = () => {
        navigate('/products');
        let searchProductFor = ""
        dispatch(act_filter.filter_productFor(searchProductFor))
    }
    const handleSearchProductFor = (searchProductFor) => {
        navigate('/products');
        dispatch(act_filter.filter_productFor(searchProductFor))
    }

    const handleAllType = () => {
        navigate('/products');
        let searchType = ""
        dispatch(act_filter.filter_type(searchType))
    }
    const handleSearchType = (IdType) => {
        navigate('/products');
        dispatch(act_filter.filter_type(IdType))
    }


    useEffect(() => {
        if (searchName == '' && searchType == '' && searchProductFor == '') {
            dispatch(api_products.getDataProduct(limit, currentPage));
        } else {
            navigate("/products")
            dispatch(api_products.filterDataProduct(searchName, searchType, searchProductFor));
        }
    }, [searchName, searchType, searchProductFor, currentPage]);

    return (
        <div className='fixed-top '>
            <div className='bg-danger px-3'>
                <Grid container p={1} className='align-items-center justify-content-evenly'>
                    <Grid item xl={1} md={1} xs={6}>
                        <Link to="/" onClick={() => { handleAllProductFor(); handleAllType() }}>
                            <Grid item sx={{ width: { lg: '120px', md: '100px', xs: '100px' } }}>
                                <img src={LogoImage} alt="" width='100%' />
                            </Grid>
                        </Link>
                    </Grid>

                    <Grid item xl={4} md={3} px={2} sx={{ display: { md: 'flex', xs: 'none' } }}>
                        <Search placeholder="input search text"
                            onSearch={onSearchName} enterButton
                        />
                    </Grid>

                    <Grid item xl={4} md={5} sx={{ display: { md: 'flex', xs: 'none' }, justifyContent: 'space-between' }}>
                        <MenuItem handleAllType={handleAllType} handleSearchType={handleSearchType} handleSearchProductFor={handleSearchProductFor} />
                    </Grid>


                    <Grid item md={1} xs={3} textAlign="right">
                        <Button><ShoppingCartIcon sx={{ color: "white", fontSize: { md: '34px', sm: '34px', xs: '24px' } }} /></Button>
                    </Grid>

                    {
                        user !== null ?
                            <Grid item md={1} xs={3} textAlign="right">
                                <Button size="small" variant="contained" color="primary"
                                    onClick={() => navigate('/login')}
                                >{user.account}</Button>
                            </Grid>
                            :
                            <Grid item md={1} xs={3} textAlign="right">
                                <Button size="small" variant="contained" color="primary"
                                    onClick={() => navigate('/login')}
                                >Login</Button>
                            </Grid>
                    }
                </Grid >
            </div >

            {/* RESPONSIVE */}
            <Grid container sx={{ display: { md: 'none', xs: 'flex' }, alignItems: 'center' }}
                className='shadow bg-body-tertiary rounded'
            >
                <Grid item xs={2}>
                    <MenuItemResponsive handleAllType={handleAllType} handleSearchType={handleSearchType} handleSearchProductFor={handleSearchProductFor} />
                </Grid>

                <Grid item xs={8} className='mx-auto' sx={{ display: { md: 'none', xs: 'flex' } }}>
                    <Search placeholder="input search text"
                        onSearch={onSearchName} enterButton
                    />
                </Grid>

                <Grid item xs={2}></Grid>
            </Grid>
            {/* RESPONSIVE */}
        </div>
    )
}
