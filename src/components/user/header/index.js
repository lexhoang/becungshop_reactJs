import React, { useEffect, useState } from 'react';
import './header.css';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ListMenuItem from './ListMenuItem';
import ListMenuItemResponsive from './ListMenuItemResponsive';

import * as api_products from '../../../api/api_products';
import * as api_auth from '../../../api/api_auth';
import * as act_filter from '../../../redux/actions/act_filter';
import { act_logout } from '../../../redux/actions/act_login';

////////     START  UI      ////////

import { Grid, Avatar, Box } from '@mui/material';
import { Input, Button, } from 'antd';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import LogoImage from '../../../assets/images/logo_becungshop.svg';
import SearchIcon from '@mui/icons-material/Search';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
////////     END  UI      ////////

const { Search } = Input

const stylePaperProps = {
    elevation: 0,
    sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
}


export default function Header() {
    const { searchProduct, searchType, searchProductFor } = useSelector(state => state.filterReducer);
    const { dataAuth } = useSelector(state => (state.authReducer));
    const { user } = useSelector(state => (state.loginReducer));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const limit = 6; // Số lượng sản phẩm trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1);


    const onSearchProduct = (value) => {
        navigate('/products');
        dispatch(act_filter.filter_product(value));
    }
    const handleAllProductFor = () => {
        navigate('/products');
        let searchProductFor = ""
        dispatch(act_filter.filter_productFor(searchProductFor))
    }
    const handleAllType = () => {
        navigate('/products');
        let searchType = ""
        dispatch(act_filter.filter_type(searchType))
    }
    const handleSearchProductFor = (searchProductFor) => {
        navigate('/products');
        dispatch(act_filter.filter_productFor(searchProductFor))
    }
    const handleSearchType = (IdType) => {
        navigate('/products');
        dispatch(act_filter.filter_type(IdType))
    }


    //NAVBAR
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const open = Boolean(anchorElUser);
    const handleOpenUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUser = () => {
        setAnchorElUser(null);
    };
    const handleEditUser = () => {
        navigate('/editInfoUser')
        handleCloseUser()
    }
    const LogOut = () => {
        dispatch(act_logout());
        navigate('/')
        handleCloseUser()
    }


    useEffect(() => {
        dispatch(api_auth.getDataAuth(limit, currentPage));
        if (searchProduct == '' && searchType == '' && searchProductFor == '') {
            dispatch(api_products.getDataProduct(limit, currentPage));
        } else {
            navigate("/products")
            dispatch(api_products.filterDataProduct(searchProduct, searchType, searchProductFor, limit, currentPage));
        }
    }, [searchProduct, searchType, searchProductFor, limit, currentPage]);



    return (
        <div className='fixed-top'>
            <div className='bg-header px-3'>
                <Grid container p={1} className='align-items-center justify-content-evenly'>
                    {/* IMAGE */}
                    <Grid item xl={1} md={1} xs={6}>
                        <Link to="/" onClick={() => { handleAllProductFor(); handleAllType() }}>
                            <Grid item sx={{ width: { lg: '120px', md: '100px', xs: '100px' } }}>
                                <img src={LogoImage} alt="" width='100%' />
                            </Grid>
                        </Link>
                    </Grid>

                    {/* SEARCH */}
                    <Grid item xl={4} md={3} px={2} sx={{ display: { md: 'flex', xs: 'none' } }}>
                        <Search
                            placeholder="input search text"
                            onSearch={onSearchProduct}
                            enterButton={
                                <Button style={{ background: "linear-gradient(0deg, #ff6600 0%, #ffb366 100%)", color: 'white' }}>
                                    <SearchIcon />
                                </Button>
                            }
                        />
                    </Grid>

                    {/* MENU */}
                    <Grid item xl={4} md={5} sx={{ display: { md: 'flex', xs: 'none' }, justifyContent: 'space-between' }}>
                        <ListMenuItem handleAllType={handleAllType} handleSearchType={handleSearchType} handleSearchProductFor={handleSearchProductFor} />
                    </Grid>

                    {/* LOGIN */}
                    <Grid item md={1} xs={3} textAlign="right">
                        <button className="btn" onClick={() => navigate('/cart')}>
                            <ShoppingCartIcon sx={{ color: "white", fontSize: '32px' }} />
                        </button>
                    </Grid>

                    {/* USER */}
                    {
                        user !== null ?
                            dataAuth.map((item) => (
                                item._id === user[0]?.id
                                    ?
                                    <Grid item md={1} xs={3} textAlign="right" key={item._id}>
                                        <React.Fragment>
                                            <Box>
                                                <Tooltip title="Account settings">
                                                    <IconButton
                                                        onClick={handleOpenUser}
                                                        size="small"
                                                        sx={{ ml: 2 }}
                                                        aria-controls={open ? 'account-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                    >
                                                        <Avatar alt="Avatar"
                                                            src={item.photoUrl}
                                                            sx={{ width: 40, height: 40 }}
                                                        >
                                                        </Avatar>
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                            <Menu
                                                anchorEl={anchorElUser}
                                                id="account-menu"
                                                open={open}
                                                onClose={handleCloseUser}
                                                onClick={handleCloseUser}
                                                PaperProps={stylePaperProps}
                                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                            >
                                                <MenuItem onClick={handleEditUser}>
                                                    <Avatar alt="Avatar"
                                                        src={item.photoUrl}
                                                        sx={{ width: 40, height: 40 }}
                                                    />
                                                    {item.name}
                                                </MenuItem>
                                                <Divider />
                                                <MenuItem onClick={handleEditUser}>
                                                    <ListItemIcon>
                                                        <Settings fontSize="small" />
                                                    </ListItemIcon>
                                                    Settings My Account
                                                </MenuItem>
                                                <MenuItem onClick={LogOut}>
                                                    <ListItemIcon>
                                                        <Logout fontSize="small" />
                                                    </ListItemIcon>
                                                    Logout
                                                </MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    </Grid>
                                    : null
                            ))
                            :
                            <Grid item md={1} xs={3} textAlign="right">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="btn btn-sm btn-contain px-2"
                                    style={{ borderBottom: '5px solid #fff', borderTop: '5px solid #fff' }}
                                >
                                    <div className="text-login"> <LoginIcon /> <span style={{ marginLeft: '4px' }}>Login</span> </div>
                                </button>
                            </Grid>

                    }
                    {/* USER */}

                </Grid >
            </div >

            {/* RESPONSIVE */}
            <Grid container sx={{ display: { md: 'none', xs: 'flex' }, alignItems: 'center' }}
                className='shadow bg-body-tertiary rounded'
            >
                <Grid item xs={2}>
                    <ListMenuItemResponsive
                        handleAllType={handleAllType}
                        handleSearchType={handleSearchType}
                        handleSearchProductFor={handleSearchProductFor}
                    />
                </Grid>

                <Grid item xs={8} className='mx-auto' sx={{ display: { md: 'none', xs: 'flex' } }}>
                    <Search
                        placeholder="input search text"
                        onSearch={onSearchProduct}
                        enterButton={
                            <Button style={{ background: "linear-gradient(0deg, #ff6600 0%, #ffb366 100%)", color: 'white' }}>
                                <SearchIcon />
                            </Button>
                        }
                    />
                </Grid>

                <Grid item xs={2}></Grid>
            </Grid>
            {/* RESPONSIVE */}
        </div>
    )
}
