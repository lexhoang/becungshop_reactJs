import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as api_auth from '../../../api/api_auth';
import * as act_filter from '../../../redux/actions/act_filter';

import { Button, Grid } from '@mui/material';
import { TextField } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { Input, Button, } from 'antd';

// const { Search } = Input;

const SearchAuth = (props) => {
    const { limit, currentPage } = props;
    const { searchAccount, searchUserName, searchPhone } = useSelector((state) => state.filterReducer);

    const dispatch = useDispatch();

    const filterAuth = () => {
        if (searchAccount === '' && searchUserName === '' && searchPhone === '') {
            dispatch(api_auth.getDataAuth(limit, currentPage));
        } else {
            dispatch(api_auth.filterUser(searchAccount, searchUserName, searchPhone, limit, currentPage))
        }
    }

    // const onSearchAccount = (value) => {
    //     dispatch(act_filter.filter_account(value));
    // }

    // const onSearchUserName = (value) => {
    //     dispatch(act_filter.filter_userName(value));
    // }

    // const onSearchPhone = (value) => {
    //     dispatch(act_filter.filter_phone(value));
    // }

    return (
        <Grid container mt={10} mb={5}>
            <Grid item xs={8} className="mx-auto text-center">
                <Grid container>
                    <Grid item md={4} xs={12} my={1}>
                        <TextField variant="outlined" size="small" label="Search Account" sx={{ width: "90%" }}
                            value={searchAccount} onChange={(e) => dispatch(act_filter.filter_account(e.target.value))}
                        />
                    </Grid>

                    <Grid item md={4} xs={12} my={1}>
                        <TextField variant="outlined" size="small" label="Search Name" sx={{ width: "90%" }}
                            value={searchUserName} onChange={(e) => dispatch(act_filter.filter_userName(e.target.value))}
                        />
                    </Grid>

                    <Grid item md={4} xs={12} my={1}>
                        <TextField variant="outlined" size="small" label="Search Phone" sx={{ width: "90%" }}
                            value={searchPhone} onChange={(e) => dispatch(act_filter.filter_phone(e.target.value))}
                        />
                    </Grid>

                    <Grid item xs={12} my={4}>
                        <Button variant="contained" color="warning" className='btn-contain w-50'
                            onClick={() => filterAuth()}
                        >
                            Tìm kiếm
                        </Button>
                    </Grid>
                    {/* <Grid item xs={4} my={1}>
                    <Search
                        placeholder="input search Acount"
                        onSearch={onSearchAccount}
                        enterButton={
                            <Button style={{ background: "linear-gradient(0deg, #ff6600 0%, #ffb366 100%)", color: 'white' }}>
                                <SearchIcon />
                            </Button>
                        }
                    />
                </Grid>
                <Grid item xs={4} my={1}>
                    <Search
                        placeholder="input search Name"
                        onSearch={onSearchUserName}
                        enterButton={
                            <Button style={{ background: "linear-gradient(0deg, #ff6600 0%, #ffb366 100%)", color: 'white' }}>
                                <SearchIcon />
                            </Button>
                        }
                    />
                </Grid>
                <Grid item xs={4} my={1}>
                    <Search
                        placeholder="input search Phone"
                        onSearch={onSearchPhone}
                        enterButton={
                            <Button style={{ background: "linear-gradient(0deg, #ff6600 0%, #ffb366 100%)", color: 'white' }}>
                                <SearchIcon />
                            </Button>
                        }
                    />
                </Grid> */}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SearchAuth;

