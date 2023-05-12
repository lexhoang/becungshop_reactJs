import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import * as api_types from '../../../../api/api_types';
import * as api_productFor from '../../../../api/api_productFor';


export const KeyInfoProduct = (props) => {
    const { product, setProduct } = props;

    const { dataTypes } = useSelector(state => state.typesReducer);
    const { dataProductFor } = useSelector(state => state.productForReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(api_types.getDataType());
        dispatch(api_productFor.getDataProductFor());
    }, []);



    return (
        <>
            <Form.Group className="mb-4">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control type="text" placeholder="Name Product" name="name"
                    value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Sản Phẩm Dành Cho</Form.Label>
                <Form.Select aria-label="Sản Phẩm Dành Cho"
                    value={product.productFor} onChange={(e) => setProduct({ ...product, productFor: e.target.value })}
                >
                    <option value="">Sản Phẩm Dành Cho</option>
                    {
                        dataProductFor.map((productFor) => {
                            return (
                                <option key={productFor._id} value={productFor._id}>{productFor.name}</option>
                            )
                        })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Loại sản phẩm</Form.Label>
                <Form.Select aria-label="Loại sản phẩm"
                    value={product.type} onChange={(e) => setProduct({ ...product, type: e.target.value })}
                >
                    <option value="">Loại sản phẩm</option>
                    {
                        dataTypes.map((type) => {
                            return (
                                <option key={type._id} value={type._id}>{type.name} - {type.productFor.name}</option>
                            )
                        })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control type="number" placeholder="Amount Product" name="amount"
                    value={product.amount} onChange={(e) => setProduct({ ...product, amount: parseInt(e.target.value) })}
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Giá</Form.Label>
                <Form.Control type="number" placeholder="Prices Product" name="prices"
                    value={product.prices} onChange={(e) => setProduct({ ...product, prices: parseInt(e.target.value) })}
                />
            </Form.Group>
        </>
    )
}
