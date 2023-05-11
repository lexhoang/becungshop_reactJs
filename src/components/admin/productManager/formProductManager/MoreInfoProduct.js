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
        <Form.Label>Dành cho tuổi từ...</Form.Label>
        <Form.Control type="text" placeholder="Info Age Product" name="infoAge"
          value={product.infoAge} onChange={(e) => setProduct({ ...product, infoAge: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Dành cho cân nặng từ...</Form.Label>
        <Form.Control type="text" placeholder="Info Weight Product" name="infoWeight"
          value={product.infoWeight} onChange={(e) => setProduct({ ...product, infoWeight: e.target.value })}
        />
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
