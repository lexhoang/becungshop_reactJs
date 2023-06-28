import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api_types from '../../../api/api_types';
import { productForData } from '../../constant_string/TextProductFor'
////////     START  UI      ////////
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

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
                        <Tooltip TransitionComponent={Zoom} title={productFor.name}>
                            <div className='icon-img'
                                style={{
                                    background: productFor.value === searchProductFor && productFor.value !== "" ?
                                        "linear-gradient(0deg, #ff6600 0%, #ffb366 100%)"
                                        : "white",
                                }}
                            >
                                <img src={productFor.photoUrl} alt="" width="100%" onClick={() => handleSearchProductFor(productFor.value)} />
                            </div>
                        </Tooltip>
                        <span
                            style={{ fontSize: '12px' }}
                            className='text-light text-color'
                        >{productFor.name}
                        </span>
                    </div >
                ))
            }
            <hr />
            <div className='icon-content'>
                <Tooltip TransitionComponent={Zoom} title="Tất cả">
                    <div className='icon-img'>
                        <img src={IconAll} alt="" width="100%"
                            onClick={() => handleAllType()} />
                    </div>
                </Tooltip>
                <span style={{ fontSize: '12px' }} className='text-light text-color'>Tất cả</span>
            </div>
            {
                dataTypes.map(type => {
                    return (
                        <div key={type._id} className='icon-content'>
                            <Tooltip TransitionComponent={Zoom} title={type.name}>
                                <div className='icon-img'
                                    style={{
                                        background: type._id === searchType ?
                                            "linear-gradient(0deg, #ff6600 0%, #ffb366 100%)"
                                            : "white",
                                    }}
                                >
                                    <img src={type.photoUrl} alt="" width="100%" onClick={() => handleSearchType(type._id)} />
                                </div>
                            </Tooltip>
                            <span
                                style={{ fontSize: '12px' }}
                                className='text-light text-color'
                            >{type.name}
                            </span>
                        </div>
                    )
                })
            }
        </>
    )
}
