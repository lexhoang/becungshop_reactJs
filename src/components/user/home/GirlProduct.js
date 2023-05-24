import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as api_products from '../../../api/api_products';
import * as api_productFor from '../../../api/api_productFor';
import * as act_filter from '../../../redux/actions/act_filter';

////////     START  UI      ////////
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
////////     END  UI      ////////



export default function GirlProduct() {
  const { dataProducts } = useSelector((state) => state.productsReducer);
  const { dataProductFor } = useSelector((state) => state.productForReducer);
  const [productForId, setProductForId] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickMore = () => {
    navigate('/products');
    dispatch(act_filter.filter_productFor(productForId));
  }

  useEffect(() => {
    dispatch(api_products.getDataProduct())
    dispatch(api_productFor.getDataProductFor());
  }, []);

  useEffect(() => {
    const filteredProductFor = dataProductFor.find((productFor) => {
      return productFor.name === 'Bé gái';
    });
    if (filteredProductFor) {
      setProductForId(filteredProductFor._id);
    }
  }, [dataProductFor]);

  return (
    <div className="m-5">
      <h2 className="text-center">Dành cho bé gái</h2>
      <Grid container my={4}>
        {
          dataProducts.map((product) => (
            (product.productFor == productForId) ?
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
              : null
          ))
        }
      </Grid>

      <div className='text-center'>
        <Button variant='outlined' onClick={() => clickMore()}>Xem thêm <ArrowDropDownIcon /></Button>
      </div>
      <hr />
    </div>
  )
}