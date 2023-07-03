import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const BackOnePage = ({ history }) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Điều hướng trở lại với giá trị -1
    };

    return (
        <Button variant='outlined' color='warning' className='my-4 btn-outline' onClick={goBack}>
            <KeyboardBackspaceIcon />
        </Button>
    );
};

export default BackOnePage;
