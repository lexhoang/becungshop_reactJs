import React from 'react'
import { Field, ErrorMessage } from 'formik';

export default function MyField(props) {
    return (
        <div className="mb-3 form-group">
            <label htmlFor={props.id} style={{ letterSpacing: '2px' }} className="fw-bold text-color">{props.label}</label>
            <Field type={props.type} name={props.name} id={props.id} placeholder={props.placeholder}
                className={props.className}
            />
            <ErrorMessage name={props.name} component="div" style={{ color: 'red' }} />
        </div>
    )
}
