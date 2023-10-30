import { useEffect, useState } from "react";
import axios from "axios";


export const OrderComponent = () => {


    const [orderList, setOrderList] = useState([]);

    const getAllOrders = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const apiUrl = "http://localhost:9090/api/orders/getallordersuser/" + user.userId;
        axios.get(apiUrl)
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          } else {
            setOrderList([]);
            throw new Error('Network response was not ok');
          }
        })
        .then((responseData) => {
          setOrderList([...responseData]);
          console.log(orderList); // Note: The console.log here might not display the updated value of orderList immediately due to the asynchronous nature of this code.
        })
        .catch((error) => {
          console.error(error);
        });
    }

    useEffect(() => {
        getAllOrders();
    }, [])

    return (
        <div>
            <div className="container mt-5" style={{ width: "100%" }}>
                {orderList.length === 0 && (
                    <div className="w-full text-2xl py-10 text-center text-gray-500">No category added yet</div>
                )}
                {orderList.length > 0 && (
                    <table className="table table-lg w-full table-responsive text-sm text-left text-gray-500">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Order No.
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Order Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Total Amount
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Payment Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.map((product, index) => {
                                return (
                                    <tr key={product.orderId}>
                                        <td className="px-6 py-4 font-weight-normal text-center">
                                            {product.orderId}
                                        </td>
                                        <td className="px-20 py-4 font-weight-normal text-center">
                                            {product.date}
                                        </td>
                                        <td className="px-20 py-4 font-weight-normal text-center">
                                            {product.cart.totalprice}
                                        </td>
                                        <td className="px-20 py-4 text-info text-center">
                                            {product.payment.status}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    )
}