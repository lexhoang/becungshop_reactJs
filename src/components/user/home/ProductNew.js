import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import * as api_products from '../../../api/api_products';


export default function ProductNew() {

  const { dataProducts } = useSelector((state) => state.productsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(api_products.getDataProduct())
  }, []);
  return (
    <Grid container>
      {
        dataProducts.map((product, index) => {
          return (
            <Grid item key={product._id} xl={2} md={3} xs={6} p={3}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.photoUrl}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })
      }
    </Grid>
  )
}