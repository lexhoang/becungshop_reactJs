import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import * as api_products from '../../../api/api_products';
import Loading from '../../loading/Loading';
import { productForData } from '../../constant_string/TextProductFor'

////////     START  UI      ////////
// import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Pagination } from "@mui/material";
////////     END  UI      ////////


export default function ProductsPage() {
    const { searchProduct, searchCodeProduct, searchType, searchProductFor } = useSelector(state => state.filterReducer);
    const { loading, dataProducts, totalPages } = useSelector((state) => state.productsReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const limit = 12; // Số lượng sản phẩm trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (searchProduct == '' && searchType == '' && searchProductFor == '') {
            dispatch(api_products.getDataProduct(limit, currentPage));
        } else {
            navigate("/products")
            dispatch(api_products.filterDataProduct(searchProduct, searchCodeProduct, searchType, searchProductFor, limit, currentPage));
        }


        // Cuộn lên đầu trang
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [searchProduct, searchCodeProduct, searchType, searchProductFor, totalPages, limit, currentPage]);




    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    return (
        <div className="product-layout animate__animated animate__zoomIn">
            {loading ? <Loading /> : null}

            <Grid item xs={12} mt={24}>
                {
                    productForData.map(productFor => (
                        <h3 className='text-color' key={productFor.id}>{searchProductFor === productFor.value ? `Dành cho ${productFor.name}` : ''} </h3>
                    ))
                }
            </Grid>

            <Grid container justifyContent="center" mt={3}>
                <Stack spacing={2}>
                    <Pagination
                        variant="outlined" color="warning"
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Stack>
            </Grid>

            <Grid container my={3}>
                {
                    dataProducts.map((product, index) => {
                        return (
                            <Grid item key={product._id} xl={2} md={3} sm={4} xs={6} p={1} my={3}>
                                <Tooltip title={product.name}>
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
                                                    <h6 className='text-color text-center'>
                                                        {numberWithCommas(product.prices)}đ
                                                    </h6>
                                                    <Stack spacing={1} className="my-2"  >
                                                        <Rating name="half-rating-read" defaultValue={5} precision={0.5} size='small' readOnly />
                                                    </Stack>

                                                    <div style={{ height: '40px' }}>
                                                        <Typography gutterBottom variant="subtitle2 me-1" component="div" className='name-product'>
                                                            {product.name}
                                                        </Typography>
                                                    </div>

                                                </CardContent>
                                            </CardActionArea>
                                            {/* </Card> */}
                                        </div>
                                    </Link>
                                </Tooltip>
                                {/* <button onClick={() => clickOke(product.prices)}>Oke</button> */}
                            </Grid>
                        )
                    })
                }
            </Grid>

            <Grid container justifyContent="center">
                <Stack spacing={2}>
                    <Pagination
                        variant="outlined" color="warning"
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Stack>
            </Grid>
        </div >
    )
}