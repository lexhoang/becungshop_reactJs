import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instances from '../../../api';
import * as api_products from '../../../api/api_products';
import { useDispatch, useSelector } from 'react-redux';

import ImageSizeTable from '../../../assets/images/bangsize.png'

import { Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Box, Button, IconButton, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Modal from 'react-bootstrap/Modal';

export default function ProductDetail() {
    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => {
        setShowForm(false);
    }


    const { productId } = useParams();
    const [productInfo, setProductInfo] = useState({});
    const [selectedProduct, setSelectedProduct] = useState({
        productId: '',
        size: '',
        color: '',
        quantity: ''
    });

    const [quantity, setQuantity] = useState(0);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };
    const handleChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value)) {
            setQuantity(value);
        }
    };

    const addToCart = () => {
        console.log(selectedProduct);
    }


    useEffect(() => {
        const fetchDataById = async () => {
            try {
                const response = await instances.get(`products/${productId}`);
                setProductInfo(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataById();

        setSelectedProduct({ ...selectedProduct, productId: productInfo._id, quantity: quantity })
    }, [quantity]);

    return (
        <div className="bg-white">
            <Container>
                <Grid container p={2}>
                    <Grid item md={6} xs={12} p={1}>
                        <img src={productInfo.photoUrl} alt="photo product" width="100%" />
                    </Grid>

                    <Grid item md={6} xs={12} p={2}>
                        <Typography variant="h6" fontWeight="bold">
                            {productInfo.name}
                        </Typography>

                        {/* CHỌN KÍCH CỠ */}
                        <Grid container mt={4} className="align-items-center">
                            <Grid item xs={7}>
                                <Typography variant="subtitle1">
                                    Chọn kích cỡ
                                    <Button onClick={() => setShowForm(true)} >
                                        (Cách chọn size)
                                    </Button>
                                </Typography>

                            </Grid>
                            <Grid item xs={5}>
                                <FormControl size='small' fullWidth>
                                    <InputLabel id="demo-simple-select-label">Chọn kích cỡ</InputLabel>
                                    <Select
                                        label="Chọn kích cỡ"
                                        value={selectedProduct.size}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, size: e.target.value })}
                                    >
                                        {
                                            productInfo.size && productInfo.size.map(size => (
                                                <MenuItem key={size} value={size}>{size}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* CHỌN MÀU */}
                        <Grid container mt={4} className="align-items-center">
                            <Grid item xs={7}>
                                <Typography variant="subtitle1">
                                    Chọn màu sắc
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl size='small' fullWidth>
                                    <InputLabel id="demo-simple-select-label">Chọn màu sắc</InputLabel>
                                    <Select
                                        label="Chọn màu sắc"
                                        value={selectedProduct.color}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, color: e.target.value })}
                                    >
                                        {
                                            productInfo.color && productInfo.color.map(color => (
                                                <MenuItem key={color} value={color}>{color}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* SỐ LƯỢNG */}
                        <Grid container mt={4} className="align-items-center">
                            <Grid item xs={7}>
                                <Typography variant="subtitle1">
                                    Chọn số lượng
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Box display="flex" alignItems="center">
                                    <IconButton aria-label="Decrease" onClick={handleDecrease}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Input
                                        type="number"
                                        value={quantity}
                                        onChange={handleChange}
                                        inputProps={{ min: 0 }}
                                        sx={{ width: '50px', textAlign: 'center' }}
                                    />
                                    <IconButton aria-label="Increase" onClick={handleIncrease}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>

                        {/* ADD TO CART */}
                        <Grid item xs={12}>
                            <Button variant='contained' color='warning'
                                className='w-100 my-4 p-3'
                                onClick={() => addToCart()}
                            >
                                Mua sản phẩm với giá {productInfo.prices} đ
                            </Button>
                        </Grid>

                        {/* BONUS */}
                        <Grid item xs={12} className="border p-2 my-3">
                            <Typography variant="subtitle2" fontWeight="bold">
                                Chính sách vận chuyển:
                            </Typography>
                            <Typography variant="subtitle2">
                                <ArrowCircleRightIcon color='success' fontSize="medium" /> Giao hàng tận nhà, cho kiểm tra hàng trước khi nhận. <br />
                                <ArrowCircleRightIcon color='success' fontSize="medium" /> Cước phí vận chuyển từ 25k đến 35K tùy khu vực. <br />
                                <ArrowCircleRightIcon color='success' fontSize="medium" /> <span className="text-danger fw-bold">FREESHIP TOÀN QUỐC </span>
                                cho đơn hàng từ
                                <span className="text-danger fw-bold"> 500K.</span>
                            </Typography>
                        </Grid>

                        <Grid item xs={12} className="border p-2">
                            <Typography variant="subtitle2" fontWeight="bold">
                                Bé Cưng cam kết:
                            </Typography>
                            <Typography variant="subtitle2">
                                <CheckCircleIcon color='success' fontSize="medium" /> Sản phẩm 100% như hình. <br />
                                <CheckCircleIcon color='success' fontSize="medium" /> Vải bền đẹp, giặt không ra màu, không bong tróc. <br />
                                <CheckCircleIcon color='success' fontSize="medium" /> Đổi trả nhanh tận nhà nếu không vừa ý.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Typography p={2} variant="subtitle1" fontWeight="bold">Thông tin sản phẩm</Typography>
                <ul className="list-group">
                    <li className="list-group-item d-flex border border-0 p-3">
                        <div style={{ minWidth: '120px' }}>Mã SP:</div>
                        <span>{productInfo.infoCode}</span>
                    </li>

                    <li className="list-group-item d-flex border border-0 p-3">
                        <div style={{ minWidth: '120px' }}>Độ tuổi:</div>
                        <span>{productInfo.infoMinAge} - {productInfo.infoMaxAge}tuổi</span>
                    </li>

                    <li className="list-group-item d-flex border border-0 p-3">
                        <div style={{ minWidth: '120px' }}>Độ tuổi:</div>
                        <span>{productInfo.infoMinAge} - {productInfo.infoMaxAge}tuổi</span>
                    </li>

                    <li className="list-group-item d-flex border border-0 p-3">
                        <div style={{ minWidth: '120px' }}>Cân nặng:</div>
                        <span>{productInfo.infoMinWeight}kg - {productInfo.infoMaxWeight}kg</span>
                    </li>

                    <li className="list-group-item d-flex border border-0 p-3">
                        <div style={{ minWidth: '120px' }}>Chất liệu:</div>
                        <span>{productInfo.infoMaterial}</span>
                    </li>

                    <li className="list-group-item d-flex border border-0 p-3">
                        <div style={{ minWidth: '120px' }}>Xuất sứ:</div>
                        <span>{productInfo.infoMadeIn}</span>
                    </li>
                </ul>

                <Modal size="md" centered
                    show={showForm} onHide={handleCloseForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h3>Bảng size cho bé</h3>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <img src={ImageSizeTable} width='100%' />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="contained" onClick={() => handleCloseForm()}>
                            Đã hiểu
                        </Button>
                    </Modal.Footer>
                </Modal >
            </Container>
        </div>
    )
}
