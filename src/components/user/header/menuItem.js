import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api_types from '../../../api/api_types';
import * as api_productFor from '../../../api/api_productFor';

////////     START  UI      ////////

import IconAll from '../../../assets/images/icon-all.jpg';

////////     END  UI      ////////


export default function MenuItem(props) {
    const { handleAllType, handleAllProductFor, handleSearchType, handleSearchProductFor } = props;

    const { dataTypes } = useSelector(state => state.typesReducer);
    const { dataProductFor } = useSelector(state => state.productForReducer);
    const { searchType, searchProductFor } = useSelector(state => state.filterReducer);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(api_types.getDataType());
        dispatch(api_productFor.getDataProductFor());
    }, []);

    return (
        <>
            <div className='icon-content'>
                <div className='icon-img'>
                    <img src={IconAll} alt="" width="100%"
                        onClick={() => handleAllProductFor()}
                    />
                </div>
                <span style={{ fontSize: '13px' }} className='text-white'>Tất cả</span>
            </div>
            {
                dataProductFor.map(productFor => {
                    return (
                        <div key={productFor._id} className='icon-content'>
                            <div className={`icon-img bg-${productFor._id === searchProductFor ? "warning" : "white"}`}
                            >
                                <img src={productFor.photoUrl} alt="" width="100%" onClick={() => handleSearchProductFor(productFor._id)} />
                            </div>
                            <span style={{ fontSize: '13px' }} className={`text-${productFor._id === searchProductFor ? "warning" : "white"}`}>
                                {productFor.name}
                            </span>
                        </div>
                    )
                })
            }
            <hr />

            <div className='icon-content'>
                <div className='icon-img'>
                    <img src={IconAll} alt="" width="100%"
                        onClick={() => handleAllType()}
                    />
                </div>
                <span style={{ fontSize: '13px' }} className='text-white'>Tất cả</span>
            </div>
            {
                dataTypes.map(type => {
                    return (
                        <div key={type._id} className='icon-content'>
                            <div className={`icon-img bg-${type._id === searchType ? "warning" : "white"}`}
                            >
                                <img src={type.photoUrl} alt="" width="100%" onClick={() => handleSearchType(type._id)} />
                            </div>
                            <span style={{ fontSize: '13px' }} className={`text-${type._id === searchType ? "warning" : "white"}`}>{type.name}</span>
                        </div>
                    )
                })
            }
        </>
    )
}
