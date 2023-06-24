import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import * as api_products from '../../../api/api_products';
import * as act_filter from '../../../redux/actions/act_filter';

import { productForData } from '../../text/TextProductFor'

////////     START  UI      ////////
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
////////     END  UI      ////////



export default function GirlProduct(props) {
  const { limit, currentPage } = props;

  const { dataProducts } = useSelector((state) => state.productsReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickMore = () => {
    navigate('/products');
    dispatch(act_filter.filter_productFor(productForData[2].value));
  }


  useEffect(() => {
    dispatch(api_products.getDataProduct(limit, currentPage))
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <div className="m-5">
      <h2 className="text-center">Dành cho bé trai</h2>
      <Grid container my={4}>
        {
          dataProducts.map((product) => (
            (product.productFor == productForData[2].value) ?
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
                        <Typography variant="body1" color="error" textAlign='center' className='fw-bold'>
                          {numberWithCommas(product.prices)}đ
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
        <Button
          variant='outlined' color='secondary'
          className='btn-outline'
          onClick={() => clickMore()}>
          Xem thêm <ArrowDropDownIcon />
        </Button>
      </div>
      <hr />
    </div>
  )
}