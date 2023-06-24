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
                            <div className='icon-img'
                                style={{
                                    border: '2px solid #c13473',
                                    backgroundColor: productFor.value === searchProductFor && productFor.value !== "" ? "#c13473" : "white"
                                }}
                            >
                                <img src={productFor.photoUrl} alt="" width="100%" onClick={() => handleSearchProductFor(productFor.value)} />
                            </div>
                            <span
                                style={{
                                    fontSize: '11px', fontWeight: "700",
                                    color: productFor.value === searchProductFor && productFor.value !== "" ? "#000" : "#000"
                                }}>
                                {productFor.name}
                            </span>
                        </MenuItem>
                    ))
                }
                <hr />
                <MenuItem className='icon-content' onClick={handleCloseNavMenu}>
                    <div className='icon-img bg-white'
                        style={{ border: '2px solid #c13473' }}>
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
                                <div className='icon-img'
                                    style={{
                                        border: '2px solid #c13473',
                                        backgroundColor: type._id === searchType ? "#c13473" : "white"
                                    }}
                                >
                                    <img src={type.photoUrl} alt="" width="100%" onClick={() => handleSearchType(type._id)} />
                                </div>
                                <span
                                    style={{
                                        fontSize: '11px', fontWeight: "700",
                                        color: type._id === searchType ? "#000" : "white"
                                    }}
                                >{type.name}</span>
                            </MenuItem>
                        )
                    })
                }
            </Menu>
        </Box >
    )
}
