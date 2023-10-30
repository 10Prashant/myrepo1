import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { SuccessModalComponent } from "../../shared/SuccessModalComponent";
import { DeleteModalComponent } from "../../shared/DeleteModalComponent";
import axios from "axios";


export const ProductAdminComponent = () => {

    const [currentView, setCurrentView] = useState('L');
    const [productToEdit, setProductToEdit] = useState(null);

    const productEditHandler = (product) => {
        setCurrentView('E');
        setProductToEdit(product);
    }

    return (
        <div className="container-fluid p-4 w-full">
            <div className="row">
                <div className="col-lg">
                    <div className="py-4 px-3 fs-3">
                        {currentView === 'L' && 'Products'}
                        {currentView === 'A' && 'Add Product'}
                        {currentView === 'E' && 'Edit Product'}
                    </div>
                    <div className="py-4 px-3 text-md text-end">
                        {currentView === 'L' && (
                            <button
                                onClick={() => setCurrentView('A')}
                                className="mt-2 btn btn-primary"
                            >
                                Add Product
                            </button>
                        )}
                        {(currentView === 'A' || currentView === 'E') && (
                            <button
                                onClick={() => {
                                    setCurrentView('L');
                                    setProductToEdit(null);
                                }}
                                className="mt-2 btn btn-primary"
                            >
                                List Product
                            </button>
                        )}
                    </div>
                    {currentView === 'L' && (
                        <ProductListComponent productEditHandler={productEditHandler} />
                    )}
                    {currentView === 'A' && <ProductAddFormComponent setCurrentView={setCurrentView} />}
                    {currentView === 'E' && (
                        <ProductEditFormComponent
                            setCurrentView={setCurrentView}
                            product={productToEdit}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}



const ProductListComponent = (props) => {

    const [productList, setProductList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [productId, setProductId] = useState(null);

    const [successMessage, setSuccessMessage] = useState(null);

    const modalCloseHandler = () => {
        setSuccessMessage(null);
    }

    const onDeleteModalCloseHandler = (deleteConfirmation) => {
        setOpenModal(false);
        if (deleteConfirmation) {
            const apiUrl = "http://localhost:9090/api/product/deleteproductbyid/" + productId;
            axios.delete(apiUrl)
                .then((response) => {
                    if (response.status === 204) {
                        setSuccessMessage("Category deleted successfully!");
                        getAllProduct();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    const deleteProductHandler = (pid) => {
        setOpenModal(true);
        setProductId(pid);
    }


    const getAllProduct = () => {
        const apiUrl = "http://localhost:9090/api/product/getproduct";
        axios.get(apiUrl)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    setProductList([]);
                    throw new Error('Network response was not ok');
                }
            })
            .then((responseData) => {
                setProductList([...responseData]);
                console.log(productList); // Note: The console.log here might not display the updated value of productList immediately due to the asynchronous nature of this code.
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getAllProduct()
    }, [])


    return (
        // <React.Fragment>
        //     {openModal && <DeleteModalComponent onCloseHandler={onDeleteModalCloseHandler} />}
        //     {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
        //     <div className="relative overflow-x-auto">
        //         {productList.length === 0 && <div className="w-full text-2xl py-10 text-center text-gray-500 h-auto dark:text-gray-400">No product added yet</div>}
        //         {productList.length > 0 && <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        //             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        //                 <tr>
        // <th scope="col" className="px-6 py-3">
        //     Product Image
        // </th>
        // <th scope="col" className="px-6 py-3">
        //     Product name
        // </th>
        // <th scope="col" className="px-6 py-3">
        //     Category
        // </th>
        // <th scope="col" className="px-6 py-3">
        //     Quantity
        // </th>
        // <th scope="col" className="px-6 py-3">
        //     Price
        // </th>
        // <th scope="col" className="px-6 py-3">

        // </th>
        // <th scope="col" className="px-6 py-3">

        // </th>
        //                 </tr>
        //             </thead>
        //             <tbody>

        //                 {
        //                     productList.map((product) => {
        //                         return (
        //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        //                                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        //                                     <img src={product.productImage} alt="product" className="w-20 h-20" />
        //                                 </td>
        //                                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        //                                     {product.productName}
        //                                 </td>
        //                                 <td className="px-6 py-4">
        //                                     {product.category.categoryName}
        //                                 </td>
        //                                 <td className="px-6 py-4">
        //                                     {product.quantity}
        //                                 </td>
        //                                 <td className="px-6 py-4">
        //                                     {product.price + " Rs"}
        //                                 </td>
        //                                 <td className="px-6 py-4">
        //                                     <svg onClick={(ev) => props.productEditHandler(product)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-500 cursor-pointer">
        //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        //                                     </svg>
        //                                 </td>
        //                                 <td className="px-6 py-4">
        //                                     <svg onClick={() => {
        //                                         deleteProductHandler(product.productId)
        //                                     }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-400 cursor-pointer">
        //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        //                                     </svg>
        //                                 </td>
        //                             </tr>
        //                         )
        //                     })
        //                 }

        //             </tbody>
        //         </table>}
        //     </div>
        // </React.Fragment>
        <React.Fragment>
            {openModal && <DeleteModalComponent onCloseHandler={onDeleteModalCloseHandler} />}
            {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
            <div className="container" style={{ width: "100%" }}>
                {productList.length === 0 && (
                    <div className="w-full text-2xl py-10 text-center text-gray-500">No product added yet</div>
                )}
                {productList.length > 0 && (
                    <table className="table table-lg w-full table-responsive text-sm text-left text-gray-500">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList.map((product, index) => {
                                return (
                                    <tr key={product.productId}>
                                        <td className="px-6 py-4 font-weight-normal">
                                            <img src={product.productImage} alt="product" style={{ width: "90px", height: "90px" }} />
                                        </td>
                                        <td className="px-20 py-4 font-weight-normal">
                                            {product.productName}
                                        </td>
                                        <td className="px-20 py-4 font-weight-normal">
                                            {product.category.categoryName}
                                        </td>
                                        <td className="px-20 py-4 font-weight-normal">
                                            {product.quantity}
                                        </td>
                                        <td className="px-20 py-4 font-weight-normal">
                                            {product.price}
                                        </td>
                                        <td className="px-4 py-4">
                                            <svg onClick={(ev) => props.productEditHandler(product)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-primary cursor-pointer" style={{ width: '25px', height: '25px' }}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                        </td>
                                        <td className="px-4 py-4">
                                            <svg onClick={() => {
                                                deleteProductHandler(product.productId)
                                            }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-danger cursor-pointer" style={{ width: '20px', height: '20px' }}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </React.Fragment>
    )
}

const ProductAddFormComponent = (props) => {

    const [categoryList, setCategoryList] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);

    const modalCloseHandler = () => {
        setSuccessMessage(null);
        props.setCurrentView('L');
    }

    const formik = useFormik({
        initialValues: {
            productName: '',
            categoryId: "-1",
            quantity: '',
            price: '',
            productImage: ''
        },
        validationSchema: Yup.object({
            productName: Yup.string()
                .max(255, 'Product name must be less than or equal to 255 characters')
                .required('Product name is required'),
            categoryId: Yup.string()
                .required('Select field is required')
                .test('is-not-zero', 'Select field is required', (value) => value !== "-1"),
            quantity: Yup.number()
                .required('Quantity is required') // Show "required" message for empty fields
                .min(1, 'Quantity should be greater than 0'),
            price: Yup.number()
                .required('Price is required') // Show "required" message for empty fields
                .min(1, 'Price should be greater than 0'),
            productImage: Yup.string()
                .max(255, 'Product image url must be less than or equal to 255 characters')
                .required('Product image is required')
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(typeof values.categoryId, values.categoryId);
            console.log(typeof categoryList[0].categoryId, categoryList[0].categoryId);
            const data = {
                productName: values.productName,
                category: {
                    id: parseInt(values.categoryId),
                },
                quantity: values.quantity,
                price: values.price,
                productImage: values.productImage,
            }
            const apiUrl = "http://localhost:9090/api/product/createproduct";
            axios.post(apiUrl, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    if (response.status === 201) {
                        setSuccessMessage("Product added successfully!");
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

    const getAllCategory = () => {
        const apiUrl = "http://localhost:9090/api/categories/getallcategories";
        axios.get(apiUrl)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then((responseData) => {
                setCategoryList([...responseData]);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    return (

        // <form onSubmit={formik.handleSubmit}>
        //     {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
        //     <div className="grid gap-6 mb-6 md:grid-cols-2">
        //         <div>
        //             <label for="productName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
        //             <input
        //                 type="text"
        //                 id="productName"
        //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        //                 placeholder="Diamond ring"
        //                 onChange={formik.handleChange}
        //                 value={formik.values.productName}
        //             />
        //             <p className={`${(formik.errors.productName && formik.touched.productName) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.productName && formik.touched.productName) ? formik.errors.productName : "no-error"}</p>
        //         </div>
        //         <div>
        //             <label for="categoryId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
        //             <select
        //                 type="text"
        //                 id="categoryId"
        //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        //                 onChange={formik.handleChange}
        //                 value={formik.values.categoryId}
        //             >
        //                 <option value={-1}>Select category</option>
        //                 {
        //                     categoryList.map((category) => {
        //                         return (
        //                             <option value={category.id}>{category.categoryName}</option>
        //                         )
        //                     })
        //                 }
        //             </select>
        //             <p className={`${(formik.errors.categoryId && formik.touched.categoryId) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.categoryId && formik.touched.categoryId) ? formik.errors.categoryId : "no-error"}</p>
        //         </div>
        //         <div>
        //             <label for="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
        //             <input
        //                 type="number"
        //                 id="quantity"
        //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        //                 placeholder="10"
        //                 onChange={formik.handleChange}
        //                 value={formik.values.quantity}
        //             />
        //             <p className={`${(formik.errors.quantity && formik.touched.quantity) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.quantity && formik.touched.quantity) ? formik.errors.quantity : "no-error"}</p>
        //         </div>
        //         <div>
        //             <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
        //             <input
        //                 type="number"
        //                 id="price"
        //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        //                 placeholder="1000"
        //                 onChange={formik.handleChange}
        //                 value={formik.values.price}
        //             />
        //             <p className={`${(formik.errors.price && formik.touched.price) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.price && formik.touched.price) ? formik.errors.price : "no-error"}</p>
        //         </div>
        //     </div>
        //     <div className="mb-6">
        //         <label for="productImage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Image URL</label>
        //         <input
        //             type="text"
        //             id="productImage"
        //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        //             placeholder="https://image1.com"
        //             onChange={formik.handleChange}
        //             value={formik.values.productImage}
        //         />
        //         <p className={`${(formik.errors.productImage && formik.touched.productImage) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.productImage && formik.touched.productImage) ? formik.errors.productImage : "no-error"}</p>
        //     </div>
        //     <div className="w-full text-center">
        //         <button type="submit" className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
        //     </div>
        // </form>
        <form onSubmit={formik.handleSubmit}>
            {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
            <div className="row g-3 mb-4">
                <div className="col-md">
                    <label htmlFor="productName" className="form-label">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        className="form-control"
                        placeholder="Diamond ring"
                        onChange={formik.handleChange}
                        value={formik.values.productName}
                    />
                    <p className={`text-danger ${formik.errors.productName && formik.touched.productName ? '' : 'invisible'}`}>
                        {formik.errors.productName ? formik.errors.productName : 'no-error'}
                    </p>
                </div>
                <div className="col-md">
                    <label htmlFor="categoryId" className="form-label">
                        Category
                    </label>
                    <select
                        type="text"
                        id="categoryId"
                        className="form-select"
                        onChange={formik.handleChange}
                        value={formik.values.categoryId}
                    >
                        <option value={-1}>Select category</option>
                        {categoryList.map((category) => (
                            <option value={category.id}>{category.categoryName}</option>
                        ))}
                    </select>
                    <p className={`text-danger ${formik.errors.categoryId && formik.touched.categoryId ? '' : 'invisible'}`}>
                        {formik.errors.categoryId ? formik.errors.categoryId : 'no-error'}
                    </p>
                </div>
                <div className="col-md">
                    <label htmlFor="quantity" className="form-label">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        className="form-control"
                        placeholder="10"
                        onChange={formik.handleChange}
                        value={formik.values.quantity}
                    />
                    <p className={`text-danger ${formik.errors.quantity && formik.touched.quantity ? '' : 'invisible'}`}>
                        {formik.errors.quantity ? formik.errors.quantity : 'no-error'}
                    </p>
                </div>
                <div className="col-md">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        className="form-control"
                        placeholder="1000"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    <p className={`text-danger ${formik.errors.price && formik.touched.price ? '' : 'invisible'}`}>
                        {formik.errors.price ? formik.errors.price : 'no-error'}
                    </p>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="productImage" className="form-label">
                    Product Image URL
                </label>
                <input
                    type="text"
                    id="productImage"
                    className="form-control"
                    placeholder="https://image1.com"
                    onChange={formik.handleChange}
                    value={formik.values.productImage}
                />
                <p className={`text-danger ${formik.errors.productImage && formik.touched.productImage ? '' : 'invisible'}`}>
                    {formik.errors.productImage ? formik.errors.productImage : 'no-error'}
                </p>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary">
                    Add
                </button>
            </div>
        </form>


    )
}

const ProductEditFormComponent = (props) => {


    const [categoryList, setCategoryList] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);

    const modalCloseHandler = () => {
        setSuccessMessage(null);
        props.setCurrentView('L');
    }

    const formik = useFormik({
        initialValues: {
            productName: props.product.productName,
            categoryId: props.product.category.id,
            quantity: props.product.quantity,
            price: props.product.price,
            productImage: props.product.productImage
        },
        validationSchema: Yup.object({
            productName: Yup.string()
                .max(255, 'Product name must be less than or equal to 255 characters')
                .required('Product name is required'),
            categoryId: Yup.string()
                .required('Select field is required')
                .test('is-not-zero', 'Select field is required', (value) => value !== "-1"),
            quantity: Yup.number()
                .required('Quantity is required') // Show "required" message for empty fields
                .min(1, 'Quantity should be greater than 0'),
            price: Yup.number()
                .required('Price is required') // Show "required" message for empty fields
                .min(1, 'Price should be greater than 0'),
            productImage: Yup.string()
                .max(255, 'Product image url must be less than or equal to 255 characters')
                .required('Product image is required')
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(typeof values.categoryId, values.categoryId);
            console.log(typeof categoryList[0].categoryId, categoryList[0].categoryId);
            const data = {
                productId: props.product.productId,
                productName: values.productName,
                category: {
                    id: parseInt(values.categoryId),
                },
                quantity: values.quantity,
                price: values.price,
                productImage: values.productImage,
            }
            const apiUrl = "http://localhost:9090/api/product/updateproductbyid/" + props.product.productId;
            axios.put(apiUrl, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        setSuccessMessage("Product updated successfully!");
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    });

    const getAllCategory = () => {
        const apiUrl = "http://localhost:9090/api/categories/getallcategories";
        axios.get(apiUrl)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then((responseData) => {
                setCategoryList([...responseData]);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    return (

        // <form onSubmit={formik.handleSubmit}>
        //     {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
        //     <div className="grid gap-6 mb-6 md:grid-cols-2">
        //         <div>
        //             <label for="productName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
        //             <input
        //                 type="text"
        //                 id="productName"
        //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        //                 placeholder="Diamond ring"
        //                 onChange={formik.handleChange}
        //                 value={formik.values.productName}
        //             />
        //             <p className={`${(formik.errors.productName && formik.touched.productName) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.productName && formik.touched.productName) ? formik.errors.productName : "no-error"}</p>
        //         </div>
        //         <div>
        //             <label for="categoryId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
        //             <select
        //                 type="text"
        //                 id="categoryId"
        //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        //                 onChange={formik.handleChange}
        //                 value={formik.values.categoryId}
        //             >
        //                 <option value={-1}>Select category</option>
        //                 {
        //                     categoryList.map((category) => {
        //                         return (
        //                             <option value={category.id}>{category.categoryName}</option>
        //                         )
        //                     })
        //                 }
        //             </select>
        //             <p className={`${(formik.errors.categoryId && formik.touched.categoryId) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.categoryId && formik.touched.categoryId) ? formik.errors.categoryId : "no-error"}</p>
        //         </div>
        //         <div>
        //             <label for="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
        //             <input
        //                 type="number"
        //                 id="quantity"
        //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        //                 placeholder="10"
        //                 onChange={formik.handleChange}
        //                 value={formik.values.quantity}
        //             />
        //             <p className={`${(formik.errors.quantity && formik.touched.quantity) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.quantity && formik.touched.quantity) ? formik.errors.quantity : "no-error"}</p>
        //         </div>
        //         <div>
        //             <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
        //             <input
        //                 type="number"
        //                 id="price"
        //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        //                 placeholder="1000"
        //                 onChange={formik.handleChange}
        //                 value={formik.values.price}
        //             />
        //             <p className={`${(formik.errors.price && formik.touched.price) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.price && formik.touched.price) ? formik.errors.price : "no-error"}</p>
        //         </div>
        //     </div>
        //     <div className="mb-6">
        //         <label for="productImage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Image URL</label>
        //         <input
        //             type="text"
        //             id="productImage"
        //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        //             placeholder="https://image1.com"
        //             onChange={formik.handleChange}
        //             value={formik.values.productImage}
        //         />
        //         <p className={`${(formik.errors.productImage && formik.touched.productImage) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.productImage && formik.touched.productImage) ? formik.errors.productImage : "no-error"}</p>
        //     </div>
        //     <div className="w-full text-center">
        //         <button type="submit" className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
        //     </div>
        // </form>
        <form onSubmit={formik.handleSubmit}>
            {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
            <div className="row g-3 mb-4">
                <div className="col-md-6">
                    <label htmlFor="productName" className="form-label">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        className="form-control"
                        placeholder="Diamond ring"
                        onChange={formik.handleChange}
                        value={formik.values.productName}
                    />
                    <p className={`text-danger ${formik.errors.productName && formik.touched.productName ? '' : 'invisible'}`}>
                        {formik.errors.productName ? formik.errors.productName : 'no-error'}
                    </p>
                </div>
                <div className="col-md-6">
                    <label htmlFor="categoryId" className="form-label">
                        Category
                    </label>
                    <select
                        type="text"
                        id="categoryId"
                        className="form-select"
                        onChange={formik.handleChange}
                        value={formik.values.categoryId}
                    >
                        <option value={-1}>Select category</option>
                        {categoryList.map((category) => (
                            <option value={category.id}>{category.categoryName}</option>
                        ))}
                    </select>
                    <p className={`text-danger ${formik.errors.categoryId && formik.touched.categoryId ? '' : 'invisible'}`}>
                        {formik.errors.categoryId ? formik.errors.categoryId : 'no-error'}
                    </p>
                </div>
                <div className="col-md-6">
                    <label htmlFor="quantity" className="form-label">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        className="form-control"
                        placeholder="10"
                        onChange={formik.handleChange}
                        value={formik.values.quantity}
                    />
                    <p className={`text-danger ${formik.errors.quantity && formik.touched.quantity ? '' : 'invisible'}`}>
                        {formik.errors.quantity ? formik.errors.quantity : 'no-error'}
                    </p>
                </div>
                <div className="col-md-6">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        className="form-control"
                        placeholder="1000"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    <p className={`text-danger ${formik.errors.price && formik.touched.price ? '' : 'invisible'}`}>
                        {formik.errors.price ? formik.errors.price : 'no-error'}
                    </p>
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="productImage" className="form-label">
                    Product Image URL
                </label>
                <input
                    type="text"
                    id="productImage"
                    className="form-control"
                    placeholder="https://image1.com"
                    onChange={formik.handleChange}
                    value={formik.values.productImage}
                />
                <p className={`text-danger ${formik.errors.productImage && formik.touched.productImage ? '' : 'invisible'}`}>
                    {formik.errors.productImage ? formik.errors.productImage : 'no-error'}
                </p>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </div>
        </form>


    )
}


export const ProductDeleteModal = (props) => {
    return (
        <React.Fragment>
            <div className="fixed inset-0 bg-gray-900 opacity-50 z-50"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white w-[440px] p-4 rounded-lg shadow-lg">
                    <p className="text-2xl font-medium py-2 text-red-500">Confirm Delete</p>
                    <p className="text-lg pt-4 pl-2">Are sure you want to delete?</p>
                    <div className="mt-4 flex pb-2 justify-end">
                        <button className="px-4 py-2 mr-2 bg-red-500 text-white rounded hover:bg-red-600" id="openModalButton">Delete</button>
                        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" id="closeModalButton">Cancel</button>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}