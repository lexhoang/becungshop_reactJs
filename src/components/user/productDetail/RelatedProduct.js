import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as api_products from '../../../api/api_products';

////////     START  UI      ////////
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Container, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Pagination } from "@mui/material";
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
////////     END  UI      ////////



export default function RelatedProduct(props) {
    const { productInfo } = props
    const { dataProducts, totalPages } = useSelector((state) => state.productsReducer);
    const dispatch = useDispatch();

    // const [relatedProduct, setRelatedProduct] = useState([])

    // const limit = 12; // Số lượng sản phẩm trên mỗi trang
    // const [currentPage, setCurrentPage] = useState(1);
    // const handlePageChange = (event, page) => {
    //     setCurrentPage(page);
    // };

    const relatedProduct = useMemo(() => {
        return dataProducts.filter(product => product._id !== productInfo._id
            && product.productFor == productInfo.productFor
            && product.type._id == productInfo.type)
    }, [productInfo, dataProducts])

    useEffect(() => {
        dispatch(api_products.getDataProduct());
        // dispatch(api_products.getDataProduct(limit, currentPage));
    }, []);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    return (
        <Container>
            <Grid item xs={12} mt={12}>
                <h3 className='text-color'>Sản phẩm liên quan</h3>
            </Grid>
            {/* <Grid container justifyContent="center" mt={4}>
                <Stack spacing={2}>
                    <Pagination
                        variant="outlined" color="warning"
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Stack>
            </Grid> */}

            <Grid container my={3}>
                {
                    relatedProduct.map((product, index) => {
                        return (
                            <Grid item key={product._id} lg={2} md={3} sm={4} xs={6} p={1} my={3}>
                                <Tooltip title={product.name}>
                                    <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }}>
                                        <div className='card-content'>
                                            <Card>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        width="100%"
                                                        image={product.photoUrl}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <h6 className='text-color text-center'>
                                                            {numberWithCommas(product.prices)}đ
                                                        </h6>

                                                        <Stack spacing={1} className="my-2"  >
                                                            <Rating name="half-rating-read" defaultValue={5} precision={0.5} size='small' readOnly />
                                                        </Stack>

                                                        <div style={{ height: '50px' }}>
                                                            <p className='name-product'>
                                                                {product.name}
                                                            </p>
                                                        </div>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </div>
                                    </Link>
                                </Tooltip>
                            </Grid>
                        )
                    })
                }
            </Grid>

            {/* <Grid container justifyContent="center" mt={3}>
                <Stack spacing={2}>
                    <Pagination
                        variant="outlined" color="warning"
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Stack>
            </Grid> */}
        </Container>
    )
}