import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as api_order from '../../../api/api_orders';
import * as act_filter from '../../../redux/actions/act_filter';

import { Button, Grid } from '@mui/material';
import { TextField } from '@mui/material';

// import SearchIcon from '@mui/icons-material/Search';
// import { Input, Button, } from 'antd';
// const { Search } = Input;

const SearchAuth = (props) => {
    const { limit, currentPage } = props;
    const { searchAccountOrder, searchNameOrder, searchPhoneOrder, searchAddressOrder } = useSelector((state) => state.filterReducer);

    const dispatch = useDispatch();

    const filterOrder = () => {
        if (searchAccountOrder === '' && searchNameOrder === '' && searchPhoneOrder === '' && searchAddressOrder === '') {
            dispatch(api_order.getDataOrder(limit, currentPage));
        } else {
            dispatch(api_order.filterOrder(searchAccountOrder, searchNameOrder, searchPhoneOrder, searchAddressOrder, limit, currentPage))
        }
    }

    return (
        <Grid container mt={10} mb={5}>
            <Grid item xs={8} className="mx-auto text-center">
                <Grid container>
                    <Grid item md={6} xs={12} my={1}>
                        <TextField variant="outlined" size="small" label="Search Account" sx={{ width: "90%" }}
                            value={searchAccountOrder} onChange={(e) => dispatch(act_filter.filter_account_order(e.target.value))}
                        />
                    </Grid>

                    <Grid item md={6} xs={12} my={1}>
                        <TextField variant="outlined" size="small" label="Search Name" sx={{ width: "90%" }}
                            value={searchNameOrder} onChange={(e) => dispatch(act_filter.filter_name_order(e.target.value))}
                        />
                    </Grid>

                    <Grid item md={6} xs={12} my={1}>
                        <TextField variant="outlined" size="small" label="Search Phone" sx={{ width: "90%" }}
                            value={searchPhoneOrder} onChange={(e) => dispatch(act_filter.filter_phone_order(e.target.value))}
                        />
                    </Grid>

                    <Grid item md={6} xs={12} my={1}>
                        <TextField variant="outlined" size="small" label="Search Address" sx={{ width: "90%" }}
                            value={searchAddressOrder} onChange={(e) => dispatch(act_filter.filter_address_order(e.target.value))}
                        />
                    </Grid>

                    <Grid item xs={12} my={4}>
                        <Button variant="contained" color="warning" className='btn-contain w-50'
                            onClick={() => filterOrder()}
                        >
                            Tìm kiếm
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SearchAuth;

