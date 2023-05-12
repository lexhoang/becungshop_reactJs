import React, { useState, useEffect } from 'react';
import { storage } from "../../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import * as api_product from '../../../../api/api_products';
import * as api_types from '../../../../api/api_types';


////// START UI  /////
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Grid } from '@mui/material';
import { KeyInfoProduct } from './KeyInfoProduct';
import { MoreInfoProduct } from './MoreInfoProduct';
import SelectColor from './select-color';
import SelectSize from './select-size';

export const FormProduct = (props) => {
    const { showForm, handleCloseForm, loadFormProduct } = props;
    const dispatch = useDispatch();

    ////////// START  UPLOAD IMAGE FIREBASE   ///////////
    const [imageUrls, setImageUrls] = useState("");
    const uploadImage = (e) => {
        let imageUpload = e.target.files[0];
        if (imageUpload == null) return;
        const imageRef = ref(storage, `uploadImageProduct/${imageUpload.name}${v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls(url);
            });
        });
    }
    ////////// END  UPLOAD IMAGE FIREBASE   ///////////

    const [product, setProduct] = useState({
        name: '', productFor: '', type: '', amount: 0, prices: 0, infoCode: '', infoMinAge: '', infoMaxAge: '', infoMinWeight: '', infoMaxWeight: '', infoMaterial: '', infoMadeIn: '', description: ''
    })
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loadFormProduct.action === 'add') {
            dispatch(api_product.postDataProduct({ ...product, photoUrl: imageUrls, color: colors, size: sizes }));
        } else {
            dispatch(api_product.putDataProduct({ ...product, photoUrl: imageUrls, color: colors, size: sizes }));
        }
        props.handleCloseForm()
    }

    useEffect(() => {
        if (loadFormProduct.value === '') {
            setImageUrls('');
            setProduct({ name: '', productFor: '', type: '', amount: 0, prices: 0, infoCode: '', infoMinAge: '', infoMaxAge: '', infoMinWeight: '', infoMaxWeight: '', infoMaterial: '', infoMadeIn: '', description: '' });
            setColors([]);
            setSizes([]);
        } else {
            setImageUrls(loadFormProduct.value.photoUrl);
            setProduct({ ...loadFormProduct.value, type: loadFormProduct.value.type._id });
            setColors(loadFormProduct.value.color);
            setSizes(loadFormProduct.value.size);
        }
    }, [loadFormProduct])

    return (
        <>
            <Modal size='xl' centered
                show={showForm} onHide={handleCloseForm}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {loadFormProduct.value !== "" ? "Sửa Loại Sản Phẩm" : "Tạo Mới Loại Sản Phẩm"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Grid container>
                            {/*START IMAGES UPLOAD */}
                            <Grid item md={6} xs={12} pr={8}>
                                <Grid container>
                                    <Grid item md={5} xs={12} px={1} sx={{ height: "150px", width: "150px" }}>
                                        <img src={imageUrls} alt="img" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                    </Grid>

                                    <Grid item md={7} xs={12} px={1}>
                                        <Form.Group>
                                            <Form.Label>Ảnh Sản Phẩm</Form.Label>
                                            <Form.Control type="file" onChange={uploadImage} name="imgUrl" />
                                        </Form.Group>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* END IMAGES UPLOAD */}

                            {/*START DESCRIPTION PRODUCT */}
                            <Grid item md={6} xs={12} pl={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mô Tả</Form.Label>
                                    <Form.Control as="textarea" style={{ height: '100px' }} placeholder="Description" name="description"
                                        value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                    />
                                </Form.Group>
                            </Grid>
                            {/*END DESCRIPTION PRODUCT */}
                        </Grid>


                        <Grid container>
                            <Grid item md={6} xs={12} pr={8}>
                                {/*START KEY INFO PRODUCT */}
                                <KeyInfoProduct product={product} setProduct={setProduct} />
                                {/*END KEY INFO PRODUCT */}
                            </Grid>

                            <Grid item md={6} xs={12} pl={8}>
                                {/*START MORE INFO PRODUCT */}
                                <MoreInfoProduct product={product} setProduct={setProduct} />
                                {/*END MORE INFO PRODUCT */}
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item md={6} xs={12} pr={8}>
                                {/*START COLOR PRODUCT */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Màu sắc</Form.Label>
                                    <SelectColor colors={colors} setColors={setColors} />
                                </Form.Group>
                                {/*END COLOR PRODUCT */}
                            </Grid>

                            <Grid item md={6} xs={12} pl={8}>
                                {/*START SIZE PRODUCT */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Kích cỡ</Form.Label>
                                    <SelectSize sizes={sizes} setSizes={setSizes} />
                                </Form.Group>
                                {/*END SIZE PRODUCT */}
                            </Grid>
                        </Grid>
                        <div className="text-center mt-5">
                            <Button className="w-100" variant="success" type='submit'>
                                {loadFormProduct.value == "" ? "Thêm mới" : "Cập nhật"}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseForm()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
