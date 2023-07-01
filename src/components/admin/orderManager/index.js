import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

import * as api_orders from '../../../api/api_orders';
import SearchOrder from './SearchOrder';

import { Button, ButtonGroup, Grid, Pagination, Stack } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import OrderDetail from './OrderDetail';
import Loading from '../../loading/Loading';

const OrderManager = () => {
    const { loading, totalPagesOrder, dataOrder } = useSelector(state => state.orderReducer);

    const dispatch = useDispatch();

    const [limit, setLimit] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const [selectedOrder, setSelectedOrder] = useState([]);
    const [showOrderDetail, setShowOrderDetail] = useState(false);

    const handleCloseOrderDetail = () => {
        setShowOrderDetail(false);
    }

    const handleOpenOrder = (order) => {
        setSelectedOrder(order);
        setShowOrderDetail(true);
    }


    const handleDeleteOrder = (orderID) => {
        swal({
            title: "Xóa đơn hàng này?",
            text: "Bạn chắc chắn muốn xóa đơn hàng này chứ, không thể khôi phục sau khi xóa!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(api_orders.deleteDataOrder(orderID));
                    swal("Thành công! Đơn hàng đã được xóa!", {
                        icon: "success",
                    });
                } else {
                    swal("Đơn hàng này chưa được xóa!", "", "error");
                }
            });
    }

    useEffect(() => {
        dispatch(api_orders.getDataOrder(limit, currentPage))
    }, [limit, currentPage]);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    function formatDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);
        const formattedDate = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`;
        const formattedTime = `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
        return `${formattedDate} ${formattedTime}`;
    }

    return (
        <div>
            {loading ? <Loading /> : null}

            <h3 className="text-center text-color">QUẢN LÝ ĐƠN HÀNG</h3>

            <SearchOrder limit={limit} currentPage={currentPage} />

            <div className='d-flex justify-content-around'>
                <Grid item xs={12}>
                    <Button variant="contained" color="success"
                        className='btn-contain'
                    >+ Thêm mới
                    </Button>
                </Grid>
                <select className='px-2 form-select text-center' style={{ width: '100px' }}
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}>
                    <option value={5}>5</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <table className="mt-2 table table-striped table-inverse table-responsive">
                <thead className="thead-inverse text-center bg-info text-light" style={{ fontSize: "18px" }}>
                    <tr className='text-font'>
                        <th>Tài khoản</th>
                        <th>Tên người dùng</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Thành tiền</th>
                        <th>Ngày tạo</th>
                        <th>Đơn hàng</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody className='text-center text-font'>
                    {
                        dataOrder.map((order) => (
                            <tr key={order._id}>
                                <td> {order.accountName} </td>
                                <td> {order.name} </td>
                                <td>+84 {order.phone} </td>
                                <td> {order.address} </td>
                                <td> {numberWithCommas(order.bill)}đ </td>
                                <td> {formatDateTime(order.timeCreated)}</td>
                                <td>
                                    <ButtonGroup aria-label="outlined primary button group">
                                        <Button variant='contained' className='btn-contain'
                                            onClick={() => handleOpenOrder(order)}
                                        ><ShoppingCartIcon />
                                        </Button>
                                    </ButtonGroup>
                                </td>

                                <td>
                                    <ButtonGroup aria-label="outlined primary button group">
                                        <Button variant='outlined' color="error"
                                            onClick={() => handleDeleteOrder(order._id)}
                                        ><DeleteIcon />
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <OrderDetail
                showOrderDetail={showOrderDetail} handleCloseOrderDetail={handleCloseOrderDetail}
                selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder}
                limit={limit} currentPage={currentPage}
            />

            <Grid container justifyContent="center">
                <Stack spacing={2}>
                    <Pagination
                        variant="outlined" color="warning"
                        count={totalPagesOrder}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Stack>
            </Grid>
        </div>
    );
}

export default OrderManager;
