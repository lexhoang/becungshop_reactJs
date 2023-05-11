import { Grid } from '@mui/material';
import React from 'react'
import Form from 'react-bootstrap/Form';

export const MoreInfoProduct = (props) => {
  const { product, setProduct } = props;

  return (
    <>
      <Form.Group className="mb-4">
        <Form.Label>Mã sản phẩm</Form.Label>
        <Form.Control type="text" placeholder="Name Product" name="infoCode"
          value={product.infoCode} onChange={(e) => setProduct({ ...product, infoCode: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Dành cho độ tuổi</Form.Label>
        <div className="d-flex justify-content-evenly">
          <div className="d-flex align-items-center" >
            <label className="mx-2">Từ:</label>
            <Form.Control type="number" placeholder="Min age" name="infoMinAge" style={{ width: "120px" }}
              value={product.infoMinAge} onChange={(e) => setProduct({ ...product, infoMinAge: parseInt(e.target.value) })}
            />
          </div>

          <div className="d-flex align-items-center" >
            <label className="mx-2">Đến:</label>
            <Form.Control type="number" placeholder="Max age" name="infoMaxAge" style={{ width: "120px" }}
              value={product.infoMaxAge} onChange={(e) => setProduct({ ...product, infoMaxAge: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Dành cho cân nặng từ...</Form.Label>
        <div className="d-flex justify-content-evenly">
          <div className="d-flex align-items-center" >
            <label className="mx-2">Từ:</label>
            <Form.Control type="number" placeholder="Min Weight" name="infoMinWeight" style={{ width: "120px" }}
              value={product.infoMinWeight} onChange={(e) => setProduct({ ...product, infoMinWeight: parseInt(e.target.value) })}
            />
          </div>

          <div className="d-flex align-items-center" >
            <label className="mx-2">Đến:</label>
            <Form.Control type="number" placeholder="Max weight" name="infoMaxWeight" style={{ width: "120px" }}
              value={product.infoMaxWeight} onChange={(e) => setProduct({ ...product, infoMaxWeight: parseInt(e.target.value) })}
            />
          </div>
        </div>

      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Chất liệu</Form.Label>
        <Form.Control type="text" placeholder="Info Material Product" name="infoMaterial"
          value={product.infoMaterial} onChange={(e) => setProduct({ ...product, infoMaterial: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Xuất sứ</Form.Label>
        <Form.Control type="text" placeholder="Info MadeIn Product" name="infoMadeIn"
          value={product.infoMadeIn} onChange={(e) => setProduct({ ...product, infoMadeIn: e.target.value })}
        />
      </Form.Group>
    </>
  )
}
