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
                        <div className='icon-img'
                            style={{
                                backgroundColor: productFor.value === searchProductFor && productFor.value !== "" ? "#d79c5a " : "white"
                            }}
                        >
                            <img src={productFor.photoUrl} alt="" width="100%" onClick={() => handleSearchProductFor(productFor.value)} />
                        </div>
                        <span
                            style={{
                                fontSize: '12px', fontWeight: "700",color: 'white',
                                // color: productFor.value === searchProductFor && productFor.value !== "" ? "#d79c5a " : "white"
                            }}
                        >
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
                <span style={{ fontSize: '12px', fontWeight: "700",color: 'white' }} className='text-white'>Tất cả</span>
            </div>
            {
                dataTypes.map(type => {
                    return (
                        <div key={type._id} className='icon-content'>
                            <div className='icon-img'
                                style={{
                                    backgroundColor: type._id === searchType ? "#d79c5a " : "white"
                                }}
                            >
                                <img src={type.photoUrl} alt="" width="100%" onClick={() => handleSearchType(type._id)} />
                            </div>
                            <span
                                style={{
                                    fontSize: '12px', fontWeight: "700",color: 'white',
                                    // color: type._id === searchType ? "#d79c5a " : "white"
                                }}
                            >{type.name}
                            </span>
                        </div>
                    )
                })
            }
        </>
    )
}
