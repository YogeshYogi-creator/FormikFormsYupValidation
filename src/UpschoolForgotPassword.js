import React, { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';

const UpschoolForgotPassword = () => {
    const [_email, setEmail] = useState('');
    const [trueEmail, setIsTrueEmail] = useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleEmailSubmit = () => {
        setIsTrueEmail(true);
        sessionStorage.setItem('email', _email);
        console.log(_email);
    };

    const handleBackButtonPress = () => {
        setIsTrueEmail(false);
    };

    const validationSchema1 = Yup.object().shape({
        email: Yup.string()
            .email("*Must be a valid email address")
            .max(20, "*Email must be less than 20 characters")
            .required("*Email is required")
    });
    const validationSchema2 = Yup.object().shape({
        otp: Yup.number()
            .required('OTP is required!')
            .min(6, 'OTP must be atleast 6 characters'),
        changePassword: Yup.string()
            .required('Password is required')
            .min(8, 'Password must me atleast 8 charactres')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Password must have at least one uppercase letter, one lowercase letter, one number and one special character!'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('changePassword'), null], 'Password must match!')
            .required('Password is required!'),
    });
    return (
        <div>
            {trueEmail === false &&
                <Formik
                    initialValues={{ email: "" }}
                    validationSchema={validationSchema1}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        // When button submits form and form is in the process of submitting, submit button is disabled
                        setSubmitting(true);
                        // Simulate submitting to database, shows us values submitted, resets form
                        setTimeout(() => {
                            resetForm();
                            setSubmitting(false);
                        }, 500);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <>
                            <input
                                name='email'
                                type='email'
                                value={_email}
                                placeholder='Email'
                                onChange={(e) => { handleChange(e); handleEmailChange(e); }}
                                onBlur={handleBlur}
                                autoComplete='off' />
                            {touched.email && errors.email ? (
                                <div className="error-message">{errors.email}</div>
                            ) : null}
                            <button type='button' onClick={handleEmailSubmit}>Submit</button>
                        </>
                    )}
                </Formik>}

            {trueEmail === true &&
                <Formik
                    initialValues={{ otp: "", changePassword: "", confirmPassword: "" }}
                    validationSchema={validationSchema2}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        // When button submits form and form is in the process of submitting, submit button is disabled
                        setSubmitting(true);
                        console.log(values);

                        // Simulate submitting to database, shows us values submitted, resets form
                        // setIsTrueEmail(false);
                        setTimeout(() => {
                            resetForm();
                            setSubmitting(false);
                        }, 500);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <input
                                name='otp'
                                type='number'
                                value={values.otp}
                                placeholder='OTP'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete='off' />
                            {touched.otp && errors.otp ? (
                                <div className="error-message">{errors.otp}</div>
                            ) : null}
                            <input
                                name='changePassword'
                                type='password'
                                value={values.changePassword}
                                placeholder='New Password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete='off' />
                            {touched.changePassword && errors.changePassword ? (
                                <div className="error-message">{errors.changePassword}</div>
                            ) : null}
                            <input
                                name='confirmPassword'
                                type='password'
                                value={values.confirmPassword}
                                placeholder='Confirm Password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete='off' />
                            {touched.confirmPassword && errors.confirmPassword ? (
                                <div className="error-message">{errors.confirmPassword}</div>
                            ) : null}
                            <button type='button' onClick={handleBackButtonPress}>Back</button>
                            <button type='submit'>Submit</button>
                        </form>
                    )}
                </Formik>
            }
        </div>
    )
}

export default UpschoolForgotPassword