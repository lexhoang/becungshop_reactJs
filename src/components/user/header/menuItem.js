import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api_types from '../../../api/api_types';
import { productForData } from '../../text/TextProductFor'
////////     START  UI      ////////

import IconAll from '../../../assets/images/icon-all.jpg';

////////     END  UI      ////////


export default function MenuItem(props) {
    const { handleAllType, handleSearchType, handleSearchProductFor } = props;

    const { dataTypes } = useSelector(state => state.typesReducer);
    const { searchType, searchProductFor } = useSelector(state => state.filterReducer);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(api_types.getDataType());
    }, []);

    return (
        <>
            {
                productForData.map((productFor, index) => (
                    <div key={productFor.id} className='icon-content'>
                        <div className={`icon-img bg-${(productFor.value === searchProductFor && productFor.value !== "") ? "warning" : "white"}`}
                        >
                            <img src={productFor.photoUrl} alt="" width="100%" onClick={() => handleSearchProductFor(productFor.value)} />
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: "700" }} className={`text-${productFor.value === searchProductFor ? "warning" : "white"}`}>
                            {productFor.name}
                        </span>
                    </div>
                ))
            }
            <hr />
            <div className='icon-content'>
                <div className='icon-img'>
                    <img src={IconAll} alt="" width="100%"
                        onClick={() => handleAllType()}
                    />
                </div>
                <span style={{ fontSize: '11px', fontWeight: "700" }} className='text-white'>Tất cả</span>
            </div>
            {
                dataTypes.map(type => {
                    return (
                        <div key={type._id} className='icon-content'>
                            <div className={`icon-img bg-${type._id === searchType ? "warning" : "white"}`}
                            >
                                <img src={type.photoUrl} alt="" width="100%" onClick={() => handleSearchType(type._id)} />
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: "700" }} className={`text-${type._id === searchType ? "warning" : "white"}`}>{type.name}</span>
                        </div>
                    )
                })
            }
        </>
    )
}
