import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import { SuccessModalComponent } from "../../shared/SuccessModalComponent";
import axios from "axios";

export const RegistrationComponent = () => {

    const [successMessage, setSuccessMessage] = useState(null);

    const modalCloseHandler = () => {
        setSuccessMessage(null);
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            mobileNumber: '',
            emailId: '',
            address: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(25, 'Must be 25 characters or less')
                .required('Username is required'),
            firstName: Yup.string()
                .max(25, 'Must be 25 characters or less')
                .required('First name is required'),
            lastName: Yup.string()
                .max(25, 'Must be 25 characters or less')
                .required('Last name is required'),
            emailId: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            address: Yup.string()
                .required('Address is required'),
            mobileNumber: Yup.string()
                .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
                .required('Mobile number is required'),
            password: Yup
                .string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required')
            ,
            confirmPassword: Yup
                .string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Confirm password is required')
        }),
        onSubmit: (values, { resetForm, setFieldError }) => {

            const data = {
                "customerFirstName": values.firstName,
                "customerLastName": values.lastName,
                "address": values.address,
                "mobilenumber": Number(values.mobileNumber),
                "emailId": values.emailId,
                "username": values.username,
                "password": values.password,
                "role": "customer"
            }
            const apiUrl = "http://localhost:9090/api/customers/createcustomer";
            axios.post(apiUrl, data, {
                headers: {
                  'Content-Type': 'application/json',
                }
              })
                .then((response) => {
                  if (response.status === 201) {
                    setSuccessMessage("User registered successfully!");
                    resetForm();
                  } else if (response.status === 400) {
                    setFieldError("emailId", "Email already exists");
                  } else {
                    throw new Error('Network response was not ok');
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
        }
    });


    return (
        // <form onSubmit={formik.handleSubmit} className="flex w-full h-screen items-center justify-center bg-gray-50">
        //     {successMessage && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
        //     <div className="w-3/6 shadow-lg border border-gray-400 h-fit p-10 bg-white rounded-md">
        //         <h1 className="text-4xl mb-6 w-full text-center">
        //             Create Account
        //         </h1>
        //         <div className="grid gap-6 mb-6 md:grid-cols-2">
        //             <div>
        //                 <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
        //                 <input
        //                     type="text"
        //                     id="firstName"
        //                     name="firstName"
        //                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
        //                     placeholder="John"
        //                     onChange={formik.handleChange}
        //                     value={formik.values.firstName}
        //                 />
        //                 <p className={`${(formik.errors.firstName && formik.touched.firstName) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.firstName && formik.touched.firstName) ? formik.errors.firstName : "no-error"}</p>
        //             </div>
        //             <div>
        //                 <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
        //                 <input
        //                     type="text"
        //                     id="lastName"
        //                     name="lastName"
        //                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
        //                     placeholder="Doe"
        //                     onChange={formik.handleChange}
        //                     value={formik.values.lastName}
        //                 />
        //                 <p className={`${(formik.errors.lastName && formik.touched.lastName) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.lastName && formik.touched.lastName) ? formik.errors.lastName : "no-error"}</p>
        //             </div>
        //             <div>
        //                 <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
        //                 <input
        //                     type="text"
        //                     id="username"
        //                     name="username"
        //                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
        //                     placeholder="jhon2278"
        //                     onChange={formik.handleChange}
        //                     value={formik.values.username}
        //                 />
        //                 <p className={`${(formik.errors.username && formik.touched.username) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.username && formik.touched.username) ? formik.errors.username : "no-error"}</p>
        //             </div>
        //             <div>
        //                 <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900">Mobile number</label>
        //                 <input
        //                     type="text"
        //                     id="mobileNumber"
        //                     name="mobileNumber"
        //                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
        //                     placeholder="9988542266"
        //                     onChange={formik.handleChange}
        //                     value={formik.values.mobileNumber}
        //                 />
        //                 <p className={`${(formik.errors.mobileNumber && formik.touched.mobileNumber) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.mobileNumber && formik.touched.mobileNumber) ? formik.errors.mobileNumber : "no-error"}</p>
        //             </div>
        //         </div>
        //         <div className="mb-6">
        //             <label htmlFor="emailId" className="block mb-2 text-sm font-medium text-gray-900">Email-Id</label>
        //             <input
        //                 type="text"
        //                 id="emailId"
        //                 name="emailId"
        //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
        //                 placeholder="jhon@gmail.com"
        //                 onChange={formik.handleChange}
        //                 value={formik.values.emailId}
        //             />
        //             <p className={`${(formik.errors.emailId && formik.touched.emailId) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.emailId && formik.touched.emailId) ? formik.errors.emailId : "no-error"}</p>
        //         </div>
        //         <div className="mb-6">
        //             <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
        //             <input
        //                 type="text"
        //                 id="address"
        //                 name="address"
        //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
        //                 placeholder="6267525155355"
        //                 onChange={formik.handleChange}
        //                 value={formik.values.address}
        //             />
        //             <p className={`${(formik.errors.address && formik.touched.address) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.address && formik.touched.address) ? formik.errors.address : "no-error"}</p>
        //         </div>
        //         <div className="grid gap-6 mb-6 md:grid-cols-2">
        //             <div>
        //                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
        //                 <input
        //                     type="password"
        //                     id="password"
        //                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
        //                     placeholder="•••••••••"
        //                     onChange={formik.handleChange}
        //                     value={formik.values.password}
        //                 />
        //                 <p className={`${(formik.errors.password && formik.touched.password) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.password && formik.touched.password) ? formik.errors.password : "no-error"}</p>
        //             </div>
        //             <div>
        //                 <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
        //                 <input
        //                     type="password"
        //                     id="confirmPassword"
        //                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
        //                     placeholder="•••••••••"
        //                     onChange={formik.handleChange}
        //                     value={formik.values.confirmPassword}
        //                 />
        //                 <p className={`${(formik.errors.confirmPassword && formik.touched.confirmPassword) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.confirmPassword && formik.touched.confirmPassword) ? formik.errors.confirmPassword : "no-error"}</p>
        //             </div>
        //         </div>
        //         <div className="flex mb-6 text-center w-full justify-center">
        //             <button type="submit" className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-2/6 px-5 py-2.5 text-center">Register</button>
        //         </div>
        //         <div className="mb-1 text-center">
        //             Already have account? <Link to='/login' className="cursor-pointer text-teal-700 font-medium">Sign In</Link>
        //         </div>
        //     </div>
        // </form>
        <form onSubmit={formik.handleSubmit} className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            {successMessage && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
            <div className="w-50 shadow-lg border border-secondary p-4 bg-white rounded-md">
                <h1 className="text-4xl mb-4 text-center">
                    Create Account
                </h1>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">First name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control"
                            placeholder="John"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                        {formik.errors.firstName && formik.touched.firstName && (
                            <p className="text-danger text-small font-weight-normal">
                                {formik.errors.firstName}
                            </p>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Last name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="form-control"
                            placeholder="Doe"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                        {formik.errors.lastName && formik.touched.lastName && (
                            <p className="text-danger text-small font-weight-normal">
                                {formik.errors.lastName}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        placeholder="jhon2278"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    {formik.errors.username && formik.touched.username && (
                        <p className="text-danger text-small font-weight-normal">
                            {formik.errors.username}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="mobileNumber" className="form-label">Mobile number</label>
                    <input
                        type="text"
                        id="mobileNumber"
                        name="mobileNumber"
                        className="form-control"
                        placeholder="9988542266"
                        onChange={formik.handleChange}
                        value={formik.values.mobileNumber}
                    />
                    {formik.errors.mobileNumber && formik.touched.mobileNumber && (
                        <p className="text-danger text-small font-weight-normal">
                            {formik.errors.mobileNumber}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="emailId" className="form-label">Email-Id</label>
                    <input
                        type="text"
                        id="emailId"
                        name="emailId"
                        className="form-control"
                        placeholder="jhon@gmail.com"
                        onChange={formik.handleChange}
                        value={formik.values.emailId}
                    />
                    {formik.errors.emailId && formik.touched.emailId && (
                        <p className="text-danger text-small font-weight-normal">
                            {formik.errors.emailId}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control"
                        placeholder="6267525155355"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                    />
                    {formik.errors.address && formik.touched.address && (
                        <p className="text-danger text-small font-weight-normal">
                            {formik.errors.address}
                        </p>
                    )}
                </div>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="•••••••••"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <p className="text-danger text-small font-weight-normal">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            placeholder="•••••••••"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                        />
                        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                            <p className="text-danger text-small font-weight-normal">
                                {formik.errors.confirmPassword}
                            </p>
                        )}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
                <div className="mt-2 text-center">
                    Already have an account? <Link to="/login" className="text-teal font-weight-bold">Sign In</Link>
                </div>
            </div>
        </form>


    )
}