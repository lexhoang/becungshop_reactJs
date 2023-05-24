import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import * as api_products from '../../../api/api_products';

////////     START  UI      ////////
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
////////     END  UI      ////////


export default function ProductsPage() {
    const { searchName, searchType, searchProductFor } = useSelector(state => state.filterReducer);

    const { dataProducts } = useSelector((state) => state.productsReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchName !== '' || searchType !== '' || searchProductFor !== '') {
            navigate("/products")
            dispatch(api_products.filterDataProduct(searchName, searchType, searchProductFor));
        } else {
            dispatch(api_products.getDataProduct());
        }
        // Cuộn lên đầu trang
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [searchName, searchType, searchProductFor]);


    return (
        <div className="mx-5">
            <Grid container my={12}>
                {
                    dataProducts.map((product, index) => {
                        return (
                            <Grid item key={product._id} xl={2} md={3} sm={4} xs={6} p={1}>
                                <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }}>
                                    <div className='card-content'>
                                        {/* <Card> */}
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                width="100%"
                                                image={product.photoUrl}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <Typography variant="body1" color="error" textAlign='center'>
                                                    {product.prices} đ
                                                </Typography>

                                                <Stack spacing={1} className="my-2"  >
                                                    <Rating name="half-rating-read" defaultValue={5} precision={0.5} size='small' readOnly />
                                                </Stack>

                                                <div style={{ height: '40px' }}>
                                                    <Typography gutterBottom variant="subtitle2" component="div" className='name-product'>
                                                        {product.name}
                                                    </Typography>
                                                </div>
                                            </CardContent>
                                        </CardActionArea>
                                        {/* </Card> */}
                                    </div>
                                </Link>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}