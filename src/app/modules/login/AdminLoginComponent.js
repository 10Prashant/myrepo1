import { Link, redirect, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import axios from "axios";

export const AdminLoginComponent = () => {

    const [unauthorized, setUnauthorized] = useState(false);
    const navigator = useNavigate();

    const formik = useFormik({
        initialValues: {
            emailId: '',
            password: '',
        },
        validationSchema: Yup.object({
            emailId: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup
                .string()
                .required('Password is required')
        }),
        onSubmit: (values, { resetForm, setFieldError }) => {

            const data = {
                "emailId": values.emailId,
                "password": values.password
            }
            const apiUrl = "http://localhost:9090/api/admin/login";
            axios.post(apiUrl, data, {
              headers: {
                'Content-Type': 'application/json',
              }
            })
              .then((response) => {
                if (response.status === 200) {
                  return response.data;
                } else if (response.status === 401) {
                  setUnauthorized(true);
                } else {
                  throw new Error('Network response was not ok');
                }
              })
              .then((r) => {
                localStorage.setItem('user', JSON.stringify(r));
                navigator('/admin/product');
              })
              .catch((error) => {
                console.error(error);
              });
        }
    });


    return (

        // <form onSubmit={formik.handleSubmit} className="flex w-full h-screen items-center justify-center bg-gray-50">
        //     <div className="w-2/6 shadow-lg border border-gray-400 h-fit p-10 bg-white rounded-md">
        //         <h1 className="text-4xl mb-6 w-full text-center">
        //             Admin Login
        //         </h1>
        //         {unauthorized && <div className="py-4 text-red-500 text-center">Invalid email-id or password</div>}
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
        //             <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
        //             <input
        //                 type="password"
        //                 id="password"
        //                 name="password"
        //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
        //                 placeholder="6267525155355"
        //                 onChange={formik.handleChange}
        //                 value={formik.values.password}
        //             />
        //             <p className={`${(formik.errors.password && formik.touched.password) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.password && formik.touched.password) ? formik.errors.password : "no-error"}</p>
        //         </div>
        //         <div className="flex mb-6 text-center w-full justify-center">
        //             <button type="submit" className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-2/6 px-5 py-2.5 text-center">Login</button>
        //         </div>
        //         <div className="mb-1 text-center">
        //             Don't have account? <Link to='/admin-register' className="cursor-pointer text-teal-700 font-medium">Create admin account</Link>
        //         </div>
        //     </div>
        // </form>
<form onSubmit={formik.handleSubmit} className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
  <div className="w-50 shadow-lg border border-secondary p-4 bg-white rounded-md">
    <h1 className="text-4xl mb-4 text-center">
      Admin Login
    </h1>
    {unauthorized && <div className="py-4 text-danger text-center">Invalid email-id or password</div>}
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
        <p className="text-danger small">{formik.errors.emailId}</p>
      )}
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="form-label">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        className="form-control"
        placeholder="*****"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password && formik.touched.password && (
        <p className="text-danger small">{formik.errors.password}</p>
      )}
    </div>
    <div className="d-flex justify-content-center">
      <button type="submit" className="btn btn-primary">Login</button>
    </div>
    <div className="mt-2 text-center">
      Don't have an account? <Link to="/admin-register" className="text-teal font-weight-bold">Create admin account</Link>
    </div>
  </div>
</form>

    )
}