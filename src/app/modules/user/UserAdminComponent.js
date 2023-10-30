import { useEffect, useState } from "react";
import axios from "axios";


export const UserAdminComponent = () => {

    const [currentView, setCurrentView] = useState('A');

    return (
        <div className="container-fluid p-4 w-full">
            <div className="row">
                <div className="col-lg">
                    <div className="py-4 px-3 fs-3">
                        {currentView === 'A' && "Admins"}
                        {currentView === 'C' && "Customers"}
                    </div>
                    <div className="py-4 px-3 text-md text-end">
                        <button
                            onClick={() => setCurrentView('A')}
                            className="mt-2 mx-2 btn btn-primary"
                        >
                            Admins
                        </button>
                        <button
                            onClick={() => {
                                setCurrentView('C');
                            }}
                            className="mt-2 btn btn-primary"
                        >
                            Customer
                        </button>
                    </div>
                    {currentView === 'C' && <CustomerListComponent />}
                    {currentView === 'A' && <AdminListComponent />}

                </div>
            </div>
        </div>
    )
}





const CustomerListComponent = () => {
    const [customerList, setCustomerList] = useState([]);

    const getAllCustomer = () => {
        const apiUrl = "http://localhost:9090/api/customers/getallcustomers";
        axios.get(apiUrl)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    setCustomerList([]);
                    throw new Error('Network response was not ok');
                }
            })
            .then((responseData) => {
                setCustomerList([...responseData]);
                console.log(customerList); // Note: The console.log here might not display the updated value of customerList immediately due to the asynchronous nature of this code.
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getAllCustomer();
    }, [])

    return (
        <div>
            <div className="container mt-5" style={{ width: "100%" }}>
                {customerList.length === 0 && (
                    <div className="w-full text-2xl py-10 text-center text-gray-500">No customer added yet</div>
                )}
                {customerList.length > 0 && (
                    <table className="table table-lg w-full table-responsive text-sm text-left text-gray-500">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    S.No.
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    First name
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Last name
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Email-Id
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Mobile number
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerList.map((customer, index) => {
                                return (
                                    <tr key={customer.userId}>
                                        <td className="px-6 py-4 font-weight-normal text-center">
                                            {index + 1}
                                        </td>
                                        <td className="px-20 py-4 font-weight-normal text-center">
                                            {customer.customerFirstName}
                                        </td>
                                        <td className="px-20 py-4 font-weight-normal text-center">
                                            {customer.customerLastName}
                                        </td>
                                        <td className="px-20 py-4 text-center">
                                            {customer.emailId}
                                        </td>
                                        <td className="px-20 py-4 text-center">
                                            {customer.mobilenumber}
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


const AdminListComponent = () => {
    const [adminList, setAdminList] = useState([]);

    const getAllCustomer = () => {
        const apiUrl = "http://localhost:9090/api/admin/getalladmins";
        axios.get(apiUrl)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    setAdminList([]);
                    throw new Error('Network response was not ok');
                }
            })
            .then((responseData) => {
                setAdminList([...responseData]);
                console.log(adminList); // Note: The console.log here might not display the updated value of adminList immediately due to the asynchronous nature of this code.
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getAllCustomer();
    }, [])

    return (
        <div>
            <div className="container mt-5" style={{ width: "100%" }}>
                {adminList.length === 0 && (
                    <div className="w-full text-2xl py-10 text-center text-gray-500">No admin added yet</div>
                )}
                {adminList.length > 0 && (
                    <table className="table table-lg w-full table-responsive text-sm text-left text-gray-500">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    S.No.
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Email-Id
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Mobile number
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminList.map((admin, index) => {
                                return (
                                    <tr key={admin.userId}>
                                        <td className="px-6 py-4 font-weight-normal text-center">
                                            {index + 1}
                                        </td>
                                        <td className="px-20 py-4 font-weight-normal text-center">
                                            {admin.adminName}
                                        </td>
                                        <td className="px-20 py-4 text-center">
                                            {admin.emailId}
                                        </td>
                                        <td className="px-20 py-4 text-center">
                                            {admin.contactNo}
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