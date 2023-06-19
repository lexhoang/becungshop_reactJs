import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api_types from '../../../api/api_types';
import { productForData } from '../../text/TextProductFor'


////////     START  UI      ////////
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconAll from '../../../assets/images/icon-all.jpg';
////////     END  UI      ////////


export default function MenuItemResponsive(props) {
    const { handleAllType, handleSearchType, handleSearchProductFor } = props;

    const { dataTypes } = useSelector(state => state.typesReducer);
    const { searchType, searchProductFor } = useSelector(state => state.filterReducer);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(api_types.getDataType());
    }, []);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >

                {
                    productForData.map((productFor, index) => (
                        <MenuItem key={productFor.id} className='icon-content' onClick={handleCloseNavMenu}>
                            <div className={`icon-img bg-${(productFor.value === searchProductFor && productFor.value !== "") ? "warning" : "info"}`}
                            >
                                <img src={productFor.photoUrl} alt="" width="100%" onClick={() => handleSearchProductFor(productFor.value)} />
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: "700" }} className={`text-${productFor.value === searchProductFor ? "warning" : "black"}`}>
                                {productFor.name}
                            </span>
                        </MenuItem>
                    ))
                }
                <hr />
                <MenuItem className='icon-content' onClick={handleCloseNavMenu}>
                    <div className='icon-img bg-info'>
                        <img src={IconAll} alt="" width="100%"
                            onClick={() => handleAllType()}
                        />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: "700" }} className='text-black'>Tất cả</span>
                </MenuItem>
                {
                    dataTypes.map(type => {
                        return (
                            <MenuItem key={type._id} className='icon-content' onClick={handleCloseNavMenu}>
                                <div className={`icon-img bg-${type._id === searchType ? "warning" : "info"}`}
                                >
                                    <img src={type.photoUrl} alt="" width="100%" onClick={() => handleSearchType(type._id)} />
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: "700" }} className={`text-${type._id === searchType ? "warning" : "black"}`}>{type.name}</span>
                            </MenuItem>
                        )
                    })
                }
            </Menu>
        </Box>
    )
}
