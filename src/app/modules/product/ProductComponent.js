import { useEffect, useState } from "react"
import { useJsonStore } from "../../shared/Store";
import axios from 'axios';

export const ProductComponent = () => {

    const [productList, setProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const { cartData, addInCartData } = useJsonStore();
    const [filteredCategory, setFilteredCategory] = useState(-1);

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
        getAllProduct();
        getAllCategory();
    }, [])

    const addToCartHandler = (product) => {
        const data = {
            productId: product.productId,
            productName: product.productName,
            quantity: product.quantity,
            productImage: product.productImage,
            price: product.price,
            qty: 1,
        };
        let isFound = false;
        for (let i = 0; i < cartData.length; i++) {
            if (cartData[i].productId === product.productId) {
                isFound = true;
                break;
            }
        }
        if (isFound === false) {
            addInCartData(data);
        }

    }

    useEffect(() => {

    }, [productList])

    const filterHandler = (ev) => {
        setFilteredCategory(Number(ev.target.value));
    }

    return (
        // <div className="bg-white">
        //     <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        //         <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers can purchased</h2>
        //         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        //             {
        //                 productList.map((product, index) => {
        //                     return (
        //                         <div className="group relative border border-gray-200 shadow-md">
        //                             <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-72">
        //                                 <img src={product.productImage} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full lg:h-full lg:w-full" />
        //                             </div>
        //                             <div className="mt-4 flex justify-between px-4">
        //                                 <div>
        //                                     <h3 className="text-sm text-gray-700">
        //                                         <div href="#">
        //                                             <span aria-hidden="true" className="absolute inset-0"></span>
        //                                             {product.productName}
        //                                         </div>
        //                                     </h3>
        //                                 </div>
        //                                 <p className="text-sm font-medium text-gray-900">{product.price} Rs</p>
        //                             </div>
        //                             <div className="w-full text-right px-4 pb-2">
        //                                 <button class=" mt-2 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
        //                                     Add
        //                                 </button>
        //                             </div>
        //                         </div>
        //                     )
        //                 })
        //             }
        //         </div>
        //     </div>
        // </div>
        <div className="bg-white">
            <div className="container mx-auto p-4 py-16">
                <div className="w-100 text-end">
                    <div
                        className="d-inline-flex align-items-center bg-warning rounded-lg p-4"
                        style={{ borderRadius: "20px" }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ width: "25px", height: "25px" }}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <span className="ms-2">{cartData.length}</span>
                    </div>
                    <div className="mt-2 w-100 text-start">
                        <select
                            className="p-1 w-25"
                            onChange={filterHandler}
                        >
                            <option value={-1}>No Filter</option>
                            {
                                categoryList.map((c) => {
                                    return (
                                        <option value={c.id}>{c.categoryName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <h2 className="text-2xl font-weight-bold text-gray-900 mb-5">Customers can purchased</h2>
                <div className="mt-6 row gap-4">
                    {productList.map((product, index) => {
                        return (
                            <>
                                {
                                    (filteredCategory === -1 || Number(product.category.id) === Number(filteredCategory)) && (<div className="col-md-3">
                                        <div className="border border-secondary shadow">
                                            <div className="bg-light d-flex align-items-center justify-content-center overflow-hidden rounded-md">
                                                <img src={product.productImage} alt="Front of men's Basic Tee in black." className="img-fluid" style={{ width: "100%", height: "250px" }} />
                                            </div>
                                            <div className="mt-4 d-flex justify-content-between px-2">
                                                <div>
                                                    <h3 className="fs-5 text-gray-700">
                                                        {product.productName}
                                                    </h3>
                                                </div>
                                                <p className="fs-6 font-weight-medium text-gray-900">{product.price} Rs</p>
                                            </div>
                                            <div className="d-flex justify-content-center p-2">
                                                <button onClick={() => {
                                                    addToCartHandler(product)
                                                }} className="btn btn-primary btn-md w-25">
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>)
                                }
                            </>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}