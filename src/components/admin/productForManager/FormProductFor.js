import React, { useState, useEffect } from 'react';
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import * as api_productFor from '../../../api/api_productFor';
import * as Yup from 'yup';

////// START UI  /////
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Grid } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MyField from '../../MyField';

export const FormProductFor = (props) => {
    const { showForm, handleCloseForm, loadFormProductFor } = props;

    const dispatch = useDispatch();

    ////////// START  UPLOAD IMAGE FIREBASE   ///////////
    const [imageUrls, setImageUrls] = useState("");
    const uploadImage = (e) => {
        let imageUpload = e.target.files[0];
        if (imageUpload == null) return;
        const imageRef = ref(storage, `uploadImageProductFor/${imageUpload.name}${v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls(url);
            });
        });
    }
    ////////// END  UPLOAD IMAGE FIREBASE   ///////////

    const [productFor, setProductFor] = useState({ name: '', description: '' })
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập tên"),
        description: Yup.string().required("Vui lòng nhập mô tả")
    })

    ////////           CRUD          ////////////
    const handleSubmit = (values) => {
        if (loadFormProductFor.action === 'add') {
            dispatch(api_productFor.postDataProductFor({ ...values, photoUrl: imageUrls }));
        } else {
            dispatch(api_productFor.putDataProductFor({ ...values, photoUrl: imageUrls }));
        }
        props.handleCloseForm()
    }


    useEffect(() => {
        if (loadFormProductFor.value === '') {
            setProductFor({ name: '', description: '' });
            setImageUrls('')
        } else {
            setProductFor({ ...loadFormProductFor.value });
            setImageUrls(loadFormProductFor.value.photoUrl)
        }
    }, [loadFormProductFor]);


    return (
        <>
            <Modal size='xl' centered
                show={showForm} onHide={handleCloseForm}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {loadFormProductFor.value !== "" ? "Sửa Loại Sản Phẩm" : "Tạo Mới Loại Sản Phẩm"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={productFor}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}>
                        <Form>
                            <Grid container>
                                <Grid item md={6} xs={12} px={1}>
                                    <div className="mb-3 form-group">
                                        <label>Ảnh Sản Phẩm</label>
                                        <Field className="form-control" type="file" onChange={uploadImage}
                                            placeholder="Name Movie" name="imgUrl" />
                                    </div>

                                    <img src={imageUrls} alt="img" width={200} />
                                </Grid>

                                <Grid item md={6} xs={12} px={1}>
                                    <MyField type='text' name="name" id="name"
                                        label='Loại sản phẩm'
                                        placeholder="Name Type"
                                        className="form-control"
                                    />

                                    <div className="mb-3 form-group">
                                        <label>Mô Tả</label>
                                        <Field as="textarea" name="description" id="description" label="Mô Tả" placeholder="Description"
                                            style={{ height: '100px' }}
                                            className="form-control"
                                        />
                                        <ErrorMessage name="description" component="div" className="text-danger" />
                                    </div>
                                </Grid>

                                <div className="text-center mt-5">
                                    <Button className="w-100" variant="success" type='submit'>
                                        {loadFormProductFor.value == "" ? "Thêm mới" : "Cập nhật"}
                                    </Button>
                                </div>
                            </Grid>
                        </Form>
                    </Formik>
                    {/* <Form onSubmit={handleSubmit}>
                    </Form> */}
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
