import React, { useState, useEffect } from 'react';
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import * as api_productFor from '../../../api/api_productFor';


////// START UI  /////
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Grid } from '@mui/material';

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


    ////////           CRUD          ////////////
    const handleSubmit = (e) => {
        e.preventDefault();

        if (loadFormProductFor.action === 'add') {
            dispatch(api_productFor.postDataProductFor({ ...productFor, photoUrl: imageUrls }));
        } else {
            dispatch(api_productFor.putDataProductFor({ ...productFor, photoUrl: imageUrls }));
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
                    <Form onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item md={6} xs={12} px={1}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Ảnh Sản Phẩm</Form.Label>
                                    <Form.Control type="file" onChange={uploadImage}
                                        placeholder="Name Movie" name="imgUrl" />
                                </Form.Group>

                                <img src={imageUrls} alt="img" width={200} />
                            </Grid>

                            <Grid item md={6} xs={12} px={1}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Loại sản phẩm</Form.Label>
                                    <Form.Control type='text' placeholder="Name Type" name="name-type"
                                        value={productFor.name} onChange={(e) => setProductFor({ ...productFor, name: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Mô Tả</Form.Label>
                                    <Form.Control as="textarea" style={{ height: '100px' }} placeholder="Description" name="description"
                                        value={productFor.description} onChange={(e) => setProductFor({ ...productFor, description: e.target.value })}
                                    />
                                </Form.Group>
                            </Grid>
                        </Grid>

                        <div className="text-center mt-5">
                            <Button className="w-100" variant="success" type='submit'>
                                {loadFormProductFor.value == "" ? "Thêm mới" : "Cập nhật"}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseForm()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
