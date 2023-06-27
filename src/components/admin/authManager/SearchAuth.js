import React from 'react';
import Grid from '@mui/material/Grid';

import { Input, Button, } from 'antd';

const { Search } = Input;
const SearchAuth = (props) => {
    const { onSearchAccount } = props;

    return (
        <Grid container mt={12} mb={5}>
            <Grid item xs={8} className="mx-auto text-center">
                <Grid container>
                    <Grid item xs={12} my={1}>
                        <Search
                            placeholder="input search text"
                            onSearch={onSearchAccount}
                            enterButton={
                                <Button style={{ background: "linear-gradient(0deg, #cf6f33 0%, #ffbb87 100%)", color: 'white' }}>
                                    Search
                                </Button>
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SearchAuth;

