import { useState } from "react";
import { SuccessModalComponent } from "../../shared/SuccessModalComponent";
import { useJsonStore } from "../../shared/Store";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const PayementComponent = () => {

    const { cartData, updateCartData, clearCartData } = useJsonStore()
    const [err, setErr] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigator = useNavigate();

    const modalCloseHandler = () => {
        setSuccessMessage(null);
        clearCartData();
        localStorage.removeItem("cartId");
        navigator("/order");
    }


    const formik = useFormik({
        initialValues: {
            cardNumber: '',
            cardHolderName: '',
            expiryDate: '',
            cvv: ''

        },
        validationSchema: Yup.object({
            cardNumber: Yup.string()
                .required('Card number is required'),
            cardHolderName: Yup.string()
                .required('Card holder name is required'),
            expiryDate: Yup.string()
                .required("Expiry date is required"),
            cvv: Yup.string()
                .required("CVV is required")
        }),
        onSubmit: (values, { resetForm }) => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
            const day = currentDate.getDate().toString().padStart(2, '0');
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');
            const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

            const data = {
                "date": formattedDateTime,
                "status": "Completed",
                "cart": {
                    "cartId": localStorage.getItem("cartId"),
                },
                "payment": {
                    "paymentId": 1,
                }
            }


            const apiUrl = "http://localhost:9090/api/orders/placeorder";
            axios.post(apiUrl, data, {
                headers: {
                  'Content-Type': 'application/json',
                }
              })
                .then((response) => {
                  if (response.status === 201) {
                    setSuccessMessage("Order placed successfully!");
                  } else {
                    throw new Error('Network response was not ok');
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
              
              resetForm();
        }
    });


    return (
        <div className="container mt-2">
            <form onSubmit={formik.handleSubmit}>
                {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
                <div className="row g-5">
                    <div className="col-md-8">
                        {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
                        <div className="mb-3">
                            <label htmlFor="cardNumber" className="form-label mb-2">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                className="form-control"
                                placeholder="767854542442"
                                onChange={formik.handleChange}
                                value={formik.values.cardNumber}
                            />
                            <p className={`text-danger text-xs font-open-sans font-normal ${formik.errors.cardNumber && formik.touched.cardNumber ? '' : 'd-none'}`}>
                                {formik.errors.cardNumber ? formik.errors.cardNumber : "no-error"}
                            </p>
                        </div>
                        <div className="mb-3">
                            <div className="d-flex g">
                                <div className="mx-2 w-50">
                                    <label htmlFor="cardHolderName" className="form-label mb-2">Cardholder Name</label>
                                    <input
                                        type="text"
                                        id="cardHolderName"
                                        className="form-control"
                                        placeholder="Jhon Doe"
                                        onChange={formik.handleChange}
                                        value={formik.values.cardHolderName}
                                    />
                                    <p className={`text-danger text-xs font-open-sans font-normal ${formik.errors.cardHolderName && formik.touched.cardHolderName ? '' : 'd-none'}`}>
                                        {formik.errors.cardHolderName ? formik.errors.cardHolderName : "no-error"}
                                    </p>
                                </div>
                                <div className="mx-2 w-50">
                                    <label htmlFor="expiryDate" className="form-label mb-2">Expiry Date</label>
                                    <input
                                        type="text" id="expiryDate"
                                        className="form-control"
                                        placeholder="mm/yy"
                                        onChange={formik.handleChange}
                                        value={formik.values.expiryDate}
                                    />
                                    <p className={`text-danger text-xs font-open-sans font-normal ${formik.errors.expiryDate && formik.touched.expiryDate ? '' : 'd-none'}`}>
                                        {formik.errors.expiryDate ? formik.errors.expiryDate : "no-error"}
                                    </p>
                                </div>
                                <div className="mx-2 w-50">
                                    <label htmlFor="cvv" className="form-label mb-2">CVV</label>
                                    <input
                                        type="password"
                                        id="cvv"
                                        className="form-control"
                                        placeholder="***"
                                        onChange={formik.handleChange}
                                        value={formik.values.cvv}
                                    />
                                    <p className={`text-danger text-xs font-open-sans font-normal ${formik.errors.cvv && formik.touched.cvv ? '' : 'd-none'}`}>
                                        {formik.errors.cvv ? formik.errors.cvv : "no-error"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary text-sm">
                                Place Order
                            </button>
                        </div>
                    </div>


                    <div className="col-md-4 p-4 bg-light">
                        <div className="h2 font-weight-bold py-2 border-bottom">Summary</div>
                        <div className="row py-3 border-bottom">
                            <div className="col-6">
                                <h5>Total Products</h5>
                            </div>
                            <div className="col-6 text-end">
                                <h5>{cartData.length}</h5>
                            </div>
                        </div>
                        {cartData.map((cart, index) => (
                            <div className="row py-2">
                                <div className="col-md-6">
                                    {cart.productName}
                                </div>
                                <div className="col-md-3 text-end">
                                    {cart.qty} x {cart.price}
                                </div>
                                <div className="col-md-3 text-end">
                                    {cart.qty * cart.price}
                                </div>
                            </div>
                        ))}
                        <div className="row py-2 border-top">
                            <div className="col-6">
                                <h5>Total Amount</h5>
                            </div>
                            <div className="col-6 text-end">
                                <h5>{cartData.reduce((acc, item) => {
                                    return acc + (item.price * item.qty);
                                }, 0)}</h5>
                            </div>
                        </div>
                        <div className="py-3text-center">

                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}