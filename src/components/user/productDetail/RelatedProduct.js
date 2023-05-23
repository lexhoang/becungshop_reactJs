import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as api_products from '../../../api/api_products';

////////     START  UI      ////////
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
////////     END  UI      ////////



export default function RelatedProduct(props) {
    const { productInfo } = props
    const { dataProducts } = useSelector((state) => state.productsReducer);
    const [relatedProduct, setRelatedProduct] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(api_products.getDataProduct());

        let relate = dataProducts.filter(product => product.productFor == productInfo.productFor && product.type._id == productInfo.type)
        setRelatedProduct(relate);
    }, [productInfo]);

    return (
        <Container>
            <Grid container my={12}>
                {
                    relatedProduct.map((product, index) => {
                        return (
                            <Grid item key={product._id} lg={2} md={3} sm={4} xs={6} p={1}>
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
                                                    <Typography variant="body1" color="error" textAlign='center'>
                                                        {product.prices} đ
                                                    </Typography>

                                                    <Stack spacing={1} className="my-2"  >
                                                        <Rating name="half-rating-read" defaultValue={5} precision={0.5} size='small' readOnly />
                                                    </Stack>

                                                    <div style={{ height: '50px' }}>
                                                        <Typography gutterBottom variant="body2" component="div" className='name-product'>
                                                            {product.name}
                                                        </Typography>
                                                    </div>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                </Link>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>
    )
}