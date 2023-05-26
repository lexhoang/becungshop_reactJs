import React, { useState, useEffect } from 'react';
import { storage } from "../../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import * as api_product from '../../../../api/api_products';
import * as api_types from '../../../../api/api_types';
import * as Yup from 'yup';

import SelectColor from './select-color';
import SelectSize from './select-size';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MyField from '../../../MyField';
import { productForData } from '../../../text/TextProductFor'

////// START UI  /////
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Grid } from '@mui/material';




export const FormProduct = (props) => {
    const { showForm, handleCloseForm, loadFormProduct } = props;

    const { dataTypes } = useSelector(state => state.typesReducer);
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Vui lòng điền tên sản phẩm'),
        productFor: Yup.string().required('Vui lòng điền sản phảm dành cho ai'),
        type: Yup.string().required('Vui lòng điền loại sản phẩm'),
        amount: Yup.string().required('Vui lòng điền số lượng sản phẩm'),
        prices: Yup.string().required('Vui lòng điền giá sản phẩm'),
        infoCode: Yup.string().required('Vui lòng điền mã sản phẩm'),
        infoMinAge: Yup.string().required('Vui lòng điền tuổi nhỏ nhất'),
        infoMaxAge: Yup.string().required('Vui lòng điền tên tuổi lớn nhất'),
        infoMinWeight: Yup.string().required('Vui lòng điền cân nặng'),
        infoMaxWeight: Yup.string().required('Vui lòng điền cân nặng'),
        infoMaterial: Yup.string().required('Vui lòng điền chất liệu'),
        infoMadeIn: Yup.string().required('Vui lòng điền  xuất sứ')
    })

    const [product, setProduct] = useState({
        name: '', productFor: '', type: '', amount: 0, prices: 0,
        infoCode: '', infoMinAge: 0, infoMaxAge: 0, infoMinWeight: 0, infoMaxWeight: 0,
        infoMaterial: '', infoMadeIn: '', description: ''
    });


    //////////  COLOR, SIZE, PHOTO_URL  ///////////
    const [textError, setTextError] = useState({ image: '', color: '', size: '' })
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
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


    const handleSubmit = (values) => {
        const cloneError = { image: '', color: '', size: '' }
        let haveError = false;
        if (imageUrls === "") {
            cloneError.image = "Vui lòng chọn ảnh sản phẩm"
            haveError = true
        }
        if (colors.length === 0) {
            cloneError.color = "Vui lòng chọn màu cho sản phẩm"
            haveError = true
        }
        if (sizes.length === 0) {
            cloneError.size = "Vui lòng chọn kích cỡ sản phẩm"
            haveError = true
        }
        setTextError(cloneError);
        if (haveError == true) {
            return
        } else {
            if (loadFormProduct.action === 'add') {
                // console.log(values);
                dispatch(api_product.postDataProduct({
                    ...values,
                    photoUrl: imageUrls, color: colors, size: sizes
                }));
            } else {
                dispatch(api_product.putDataProduct({
                    ...values,
                    photoUrl: imageUrls, color: colors, size: sizes
                }));
            }
        }
        props.handleCloseForm()
    }

    useEffect(() => {
        dispatch(api_types.getDataType());

        if (loadFormProduct.value === '') {
            setImageUrls('');
            setProduct({ name: '', productFor: '', type: '', amount: '', prices: '', infoCode: '', infoMinAge: '', infoMaxAge: '', infoMinWeight: '', infoMaxWeight: '', infoMaterial: '', infoMadeIn: '', description: '' });
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
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={product}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        <Form >
                            <Grid container>
                                {/*START IMAGES UPLOAD */}
                                <Grid item md={6} xs={12} pr={8}>
                                    <Grid container>
                                        <Grid item md={5} xs={12} px={1} sx={{ height: "150px", width: "150px" }}>
                                            <img src={imageUrls} alt="img" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                        </Grid>

                                        <Grid item md={7} xs={12} px={1}>
                                            <div>
                                                <label>Ảnh Sản Phẩm</label>
                                                <input type="file" onChange={uploadImage} name="imgUrl" className="form-control" />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <p className='text-danger'>{textError.image}</p>
                                </Grid>
                                {/* END IMAGES UPLOAD */}

                                {/*START DESCRIPTION PRODUCT */}
                                <Grid item md={6} xs={12} pl={8}>
                                    <div className="mb-3">
                                        <label htmlFor="description">Mô Tả</label>
                                        <Field as="textarea" name="description" id="description"
                                            className="form-control"
                                            placeholder="Description"
                                            style={{ height: '100px' }}
                                        />
                                        <ErrorMessage name='description' component="div" className="text-danger" />
                                    </div>
                                </Grid>
                                {/*END DESCRIPTION PRODUCT */}
                            </Grid>


                            <Grid container>
                                {/*START KEY INFO PRODUCT */}
                                <Grid item md={6} xs={12} pr={8}>
                                    <MyField type="text" name="name" label="Tên sản phẩm"
                                        placeholder="Name Product"
                                        className="form-control"
                                    />

                                    <div className="mt-4">
                                        <label>Sản phẩm dành cho</label>
                                        <Field aria-label="Sản Phẩm Dành Cho" name="productFor" label="Sản Phẩm Dành Cho"
                                            component="select"
                                            className="form-select"
                                        >
                                            {
                                                productForData.map((productFor) => (
                                                    <option key={productFor.id} value={productFor.value}>{productFor.name}</option>
                                                ))
                                            }
                                        </Field>
                                        <ErrorMessage name='productFor' component="div" className="text-danger" />
                                    </div>

                                    <div className="my-4">
                                        <label>Loại sản phẩm</label>
                                        <Field aria-label="Loại sản phẩm" name="type" label="Loại sản phẩm"
                                            component="select"
                                            className="form-select"
                                        >
                                            <option value="">Loại sản phẩm</option>
                                            {
                                                dataTypes.map((type) => {
                                                    return (
                                                        <option key={type._id} value={type._id}>{type.name}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage name='type' component="div" className="text-danger" />
                                    </div>

                                    <MyField type="number" name="amount" label="Số lượng"
                                        placeholder="Amount Product"
                                        className="form-control"
                                    />

                                    <MyField type="number" name="prices" label="Giá"
                                        placeholder="Prices Product"
                                        className="form-control"
                                    />
                                </Grid>
                                {/*END KEY INFO PRODUCT */}

                                {/*START MORE INFO PRODUCT */}
                                <Grid item md={6} xs={12} pl={8}>
                                    <MyField type="text" name="infoCode" id="infoCode" label="Mã sản phẩm"
                                        placeholder="Name Product"
                                        className="form-control"
                                    />

                                    <div className="mb-4">
                                        <label>Dành cho độ tuổi...</label>
                                        <div className="d-flex justify-content-evenly">
                                            <div className="d-flex align-items-center" >
                                                <label htmlFor='infoMinAge' className="mx-2">Từ:</label>
                                                <Field type="number" name="infoMinAge" id="infoMinAge"
                                                    className="form-control"
                                                    placeholder="Min age"
                                                    style={{ width: "120px" }}
                                                />
                                                <ErrorMessage name='infoMinAge' component="div" className="text-danger" />
                                            </div>

                                            <div className="d-flex align-items-center" >
                                                <label htmlFor='infoMaxAge' className="mx-2">Đến:</label>
                                                <Field type="number" name="infoMaxAge" id="infoMaxAge"
                                                    className="form-control"
                                                    placeholder="Max age"
                                                    style={{ width: "120px" }}
                                                />
                                                <ErrorMessage name='infoMaxAge' component="div" className="text-danger" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label>Dành cho cân nặng từ...</label>
                                        <div className="d-flex justify-content-evenly">
                                            <div className="d-flex align-items-center" >
                                                <label htmlFor="infoMinWeight" className="mx-2">Từ:</label>
                                                <Field type="number" name="infoMinWeight" id="infoMinWeight"
                                                    className="form-control"
                                                    placeholder="Min Weight"
                                                    style={{ width: "120px" }}
                                                />
                                                <ErrorMessage name='infoMinWeight' component="div" className="text-danger" />
                                            </div>

                                            <div className="d-flex align-items-center" >
                                                <label htmlFor='infoMaxWeight' className="mx-2">Đến:</label>
                                                <Field type="number" name="infoMaxWeight" id="infoMaxWeight"
                                                    className="form-control"
                                                    placeholder="Max weight"
                                                    style={{ width: "120px" }}
                                                />
                                                <ErrorMessage name='infoMaxWeight' component="div" className="text-danger" />
                                            </div>
                                        </div>

                                    </div>

                                    <MyField type="text" name="infoMaterial" id="infoMaterial" label="Chất liệu"
                                        className="form-control"
                                        placeholder="Info Material Product"
                                    />

                                    <MyField type="text" name="infoMadeIn" id="infoMadeIn" label="Xuất sứ"
                                        className="form-control"
                                        placeholder="Info MadeIn Product"
                                    />
                                </Grid>
                                {/*END MORE INFO PRODUCT */}
                            </Grid>

                            <Grid container>
                                {/*START COLOR PRODUCT */}
                                <Grid item md={6} xs={12} pr={8}>
                                    <div className="mb-3">
                                        <label>Màu sắc</label>
                                        <SelectColor colors={colors} setColors={setColors} />
                                        <p className='text-danger'>{textError.color}</p>
                                    </div>
                                </Grid>
                                {/*END COLOR PRODUCT */}

                                {/*START SIZE PRODUCT */}
                                <Grid item md={6} xs={12} pl={8}>
                                    <div className="mb-3">
                                        <label>Kích cỡ</label>
                                        <SelectSize sizes={sizes} setSizes={setSizes} />
                                        <p className='text-danger'>{textError.size}</p>
                                    </div>
                                </Grid>
                                {/*END SIZE PRODUCT */}
                            </Grid>
                            <div className="text-center mt-5">
                                <Button className="w-100" variant="success" type='submit'>
                                    {loadFormProduct.value == "" ? "Thêm mới" : "Cập nhật"}
                                </Button>
                            </div>
                        </Form>
                    </Formik>
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
