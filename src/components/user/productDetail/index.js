import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import instances from '../../../api';
import './productDetail.css';
import * as api_auth from '../../../api/api_auth'
import * as api_products from '../../../api/api_products';
import Loading from '../../loading/Loading'
import swal from 'sweetalert';
import RelatedProduct from './RelatedProduct';

import ImageSizeTable from '../../../assets/images/bangsize.png'

import { Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Box, IconButton, Button, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

export default function ProductDetail() {
    const { dataAuth } = useSelector(state => (state.authReducer));
    const { user } = useSelector(state => (state.loginReducer));
    const { loading, dataProducts } = useSelector((state) => state.productsReducer);
    const { productId } = useParams();
    const dispatch = useDispatch();

    const [productInfo, setProductInfo] = useState(null);
    const getDataProductById = async () => {
        try {
            const response = await instances.get(`products/${productId}`);
            setProductInfo(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    ////////    BUY     ////////////
    const [selectedProduct, setSelectedProduct] = useState({
        productId: productId,
        image: '',
        name: '',
        size: '',
        color: '',
        number: 0,
        totalPrices: 0
    });

    const filterProduct = useMemo(() => {
        if (dataProducts && dataProducts.length > 0) {
            const product = dataProducts.find(item => item._id === productId);
            return product ? product : null;
        }
        return '';
    }, [dataProducts, productId]);

    const infoUser = useMemo(() => {
        if (dataAuth && dataAuth.length > 0 && user && user[0]?.id) {
            return dataAuth.find(item => item._id === user[0]?.id);
        }
        return [];
    }, [dataAuth, user]);

    const addToCart = () => {
        if (!selectedProduct.size || !selectedProduct.color || selectedProduct.number <= 0) {
            swal('Oops!', 'Hãy chọn đủ thông tin để mua sản phẩm.', 'error');
            return;
        }

        if (user !== null) {
            const existProductIndex = infoUser.cart.findIndex(item =>
                item.productId === selectedProduct.productId
                && item.size === selectedProduct.size
                && item.color === selectedProduct.color
            )
            if (existProductIndex !== -1) {
                const updatedCart = [...infoUser.cart];
                updatedCart[existProductIndex].number += selectedProduct.number
                updatedCart[existProductIndex].totalPrices = updatedCart[existProductIndex].number * filterProduct.prices
                dispatch(api_auth.patchDataAuth(user[0].id, { cart: updatedCart }));

                const newAmount = parseInt(filterProduct.amount - selectedProduct.number)
                dispatch(api_products.patchDataProduct(filterProduct._id, { amount: newAmount }));
                setSelectedProduct({ productId: productId, image: '', name: '', size: '', color: '', number: 0, totalPrices: 0 });
                swal("Đã thêm sản phẩm vào giỏ hàng!", "", "success");
            } else {
                const newCartItem = {
                    productId: selectedProduct.productId,
                    image: filterProduct.photoUrl,
                    name: filterProduct.name,
                    size: selectedProduct.size,
                    color: selectedProduct.color,
                    number: selectedProduct.number,
                    totalPrices: selectedProduct.number * filterProduct.prices,
                };
                const updatedCart = [...infoUser.cart, newCartItem];
                dispatch(api_auth.patchDataAuth(user[0].id, { cart: updatedCart }));

                const newAmount = parseInt(filterProduct.amount - selectedProduct.number)
                dispatch(api_products.patchDataProduct(filterProduct._id, { amount: newAmount }));
                setSelectedProduct({ productId: productId, image: '', name: '', size: '', color: '', number: 0, totalPrices: 0 });
                swal("Đã thêm sản phẩm vào giỏ hàng!", "", "success");
            }
        } else {
            swal("Hãy đăng nhập !", "", "error");
        }
    }
    ////////    BUY     ////////////

    useEffect(() => {
        getDataProductById();

        if (filterProduct) {
            setSelectedProduct({
                ...selectedProduct,
                name: filterProduct.name,
                image: filterProduct.photoUrl
            })
        }
        // Cuộn lên đầu trang
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [filterProduct]);


    const [showInstructionSize, setShowInstructionSize] = useState(false);
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }


    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            {loading ? <Loading /> : null}

            {
                productInfo !== null ?
                    <Container>
                        <Grid container p={2}>
                            <Grid item md={6} xs={12} p={1} className="animate__animated  animate__slideInLeft">
                                <img src={productInfo.photoUrl} alt="photo product" width="100%" />
                            </Grid>

                            <Grid item md={6} xs={12} p={2} className="animate__animated  animate__slideInRight">
                                <Typography variant="h6" fontWeight="bold">
                                    {productInfo.name}
                                </Typography>

                                {/* CHỌN KÍCH CỠ */}
                                <Grid container mt={4} className="align-items-center">
                                    <Grid item xs={7}>
                                        <Typography variant="subtitle1">
                                            Chọn kích cỡ
                                            <Button size='small' variant="contained"
                                                className='btn-contain mx-2'
                                                onClick={() => setShowInstructionSize(true)} >
                                                Cách chọn size
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

                                <Typography variant="subtitle2" mt={2}>
                                    Còn {productInfo.amount} sản phẩm
                                </Typography>

                                {/* SỐ LƯỢNG */}
                                <Grid container my={3} className="align-items-center">
                                    <Grid item xs={7}>
                                        <Typography variant="subtitle1">
                                            Chọn số lượng
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Box display="flex" alignItems="center">
                                            <IconButton aria-label="Decrease"
                                                onClick={() => {
                                                    if (selectedProduct.number > 0) {
                                                        setSelectedProduct({
                                                            ...selectedProduct,
                                                            number: selectedProduct.number - 1
                                                        });
                                                    }
                                                }}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <Input
                                                type="number"
                                                value={selectedProduct.number}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    if (!isNaN(value)) {
                                                        setSelectedProduct({
                                                            ...selectedProduct,
                                                            number: parseInt(e.target.value)
                                                        });
                                                    }
                                                }}
                                                inputProps={{ min: 0 }}
                                                sx={{ width: '50px', textAlign: 'center' }}
                                            />
                                            <IconButton aria-label="Increase"
                                                onClick={() => {
                                                    setSelectedProduct({
                                                        ...selectedProduct,
                                                        number: selectedProduct.number + 1
                                                    });
                                                }}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                </Grid>

                                {/* ADD TO CART */}
                                <Grid item xs={12}>
                                    <button
                                        className='w-100 my-4 fw-bold custom-btn_animate btn-animate'
                                        onClick={() => addToCart()}
                                    >
                                        <span style={{ fontSize: '18px' }}>THÊM VÀO GIỎ HÀNG</span>
                                    </button>
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

                        {/* MÔ TẢ */}
                        <div className="animate__animated  animate__slideInUp">
                            <Grid item xs={12} mt={5}>
                                <h3 className='text-color'>Thông tin sản phẩm</h3>
                            </Grid>
                            <ul className="ul-detail list-group">
                                <li className="li-detail list-group-item d-flex border border-0 p-3">
                                    <div style={{ minWidth: '120px' }}>Mã SP:</div>
                                    <span>{productInfo.infoCode}</span>
                                </li>

                                <li className="li-detail list-group-item d-flex border border-0 p-3">
                                    <div style={{ minWidth: '120px' }}>Độ tuổi:</div>
                                    <span>{productInfo.infoMinAge} - {productInfo.infoMaxAge}tuổi</span>
                                </li>

                                <li className="li-detail list-group-item d-flex border border-0 p-3">
                                    <div style={{ minWidth: '120px' }}>Độ tuổi:</div>
                                    <span>{productInfo.infoMinAge} - {productInfo.infoMaxAge}tuổi</span>
                                </li>

                                <li className="li-detail list-group-item d-flex border border-0 p-3">
                                    <div style={{ minWidth: '120px' }}>Cân nặng:</div>
                                    <span>{productInfo.infoMinWeight}kg - {productInfo.infoMaxWeight}kg</span>
                                </li>

                                <li className="li-detail list-group-item d-flex border border-0 p-3">
                                    <div style={{ minWidth: '120px' }}>Chất liệu:</div>
                                    <span>{productInfo.infoMaterial}</span>
                                </li>

                                <li className="li-detail list-group-item d-flex border border-0 p-3">
                                    <div style={{ minWidth: '120px' }}>Xuất sứ:</div>
                                    <span>{productInfo.infoMadeIn}</span>
                                </li>
                            </ul>
                        </div>

                        <RelatedProduct productInfo={productInfo} />

                        {/* BẢNG SIZE */}
                        <Modal size="md" centered
                            show={showInstructionSize} onHide={() => setShowInstructionSize(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    <h3>Bảng size cho bé</h3>
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <img src={ImageSizeTable} width='100%' />
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant='contained'
                                    className='btn-contain'
                                    onClick={() => setShowInstructionSize(false)}>
                                    Đã hiểu
                                </Button>
                            </Modal.Footer>
                        </Modal >
                    </Container>
                    : null
            }
        </div>
    )
}
