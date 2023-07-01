import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'
import { useDispatch } from 'react-redux';
import * as api_types from '../../../api/api_types';
import MyField from '../../MyField';
import * as Yup from 'yup'
import Loading from '../../loading/Loading'
////// START UI  /////
import Modal from 'react-bootstrap/Modal';
import { Grid, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const FormType = (props) => {
  const { showForm, handleCloseForm, loadFormType } = props;

  const dispatch = useDispatch();

  ////////// START  UPLOAD IMAGE FIREBASE   ///////////
  const [imageUrls, setImageUrls] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = (e) => {
    let imageUpload = e.target.files[0];
    if (imageUpload == null) return;
    setLoading(true)
    const imageRef = ref(storage, `uploadImageTypes/${imageUpload.name}${v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls(url);
        setLoading(false)
      });
    });
  }
  ////////// END  UPLOAD IMAGE FIREBASE   ///////////

  const [type, setType] = useState({ name: '', description: '' })

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng điền loại sản phẩm"),
    description: Yup.string().required("Vui lòng điền mô tả loại sản phẩm")
  })

  ////////           CRUD          ////////////
  const handleSubmit = (values) => {
    if (loadFormType.action === 'add') {
      dispatch(api_types.postDataType({ ...values, photoUrl: imageUrls }));
      swal("Loại sản phẩm đã thêm thành công!!!", "", "success");
    } else {
      dispatch(api_types.putDataType({ ...values, photoUrl: imageUrls }));
      swal("Thông tin Loại sản phẩm đã được thay đổi!!!", "", "success");
    }
    props.handleCloseForm()
  }


  useEffect(() => {
    if (loadFormType.value === '') {
      setType({ name: '', description: '' });
      setImageUrls('');
    } else {
      setType({ ...loadFormType.value });
      setImageUrls(loadFormType.value.photoUrl);
    }
  }, [loadFormType]);


  return (
    <>
      <Modal size='lg' centered
        show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title className='text-color fw-bold'>
            {loadFormType.value !== "" ? "SỬA LOẠI SẢN PHẨM" : "THÊM LOẠI SẢN PHẨM"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={validationSchema}
            initialValues={type}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            <Form>
              <Grid container>
                <Grid item md={6} xs={12} px={1}>
                  <div className="mb-3">
                    <label className='fw-bold text-color'>Ảnh Sản Phẩm</label>
                    <input type="file" onChange={uploadImage}
                      placeholder="Name Movie" name="imgUrl" className='form-control' />
                  </div>

                  {loading ? <Loading /> : null}
                  <img src={imageUrls} alt="img" width={200} />
                </Grid>

                <Grid item md={6} xs={12} px={1}>
                  <MyField type='text' name="name" id="name" label="Loại sản phẩm" placeholder="Name Type"
                    className='form-control'
                  />

                  <div className="mb-3">
                    <label className='fw-bold text-color'>Mô Tả</label>
                    <Field as="textarea" name="description" label="Mô tả" placeholder="Description"
                      style={{ height: '100px' }} className='form-control'
                    />
                    <ErrorMessage name="description" component="div" className="text-danger" />
                  </div>
                </Grid>
              </Grid>

              <div className="text-center mt-5 d-flex justify-content-between">
                <Button variant="contained" type='submit'
                  className="w-50 mx-5 btn-contain">
                  {loadFormType.value == "" ? "Xác nhận" : "Cập nhật"}
                </Button>

                <Button variant="contained"
                  className='btn-close_modal w-50 mx-5'
                  onClick={() => handleCloseForm()}>
                  Đóng
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>

        <Modal.Footer>

        </Modal.Footer>
      </Modal >
    </>
  )
}
