import { useJsonStore } from "../../shared/Store"
import { useEffect, useState } from "react"
import { SuccessModalComponent } from "../../shared/SuccessModalComponent"
import { Link } from "react-router-dom"
import axios from "axios"

export const CartComponent = () => {

    const { cartData, updateCartData, clearCartData } = useJsonStore()
    const [err, setErr] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);

    const modalCloseHandler = () => {
        setSuccessMessage(null);
    }

    const deleteProductFromCartHandler = (productId) => {
        console.log(productId);
        let updatedCartList = [];
        for (let i = 0; i < cartData.length; i++) {
            if (cartData[i].productId !== productId) {
                updatedCartList.push(cartData[i]);
            }
        }
        updateCartData(updatedCartList);
    }

    const clearCartHandler = () => {
        if (Number(localStorage.getItem("cartId")) === 0) {
            return;
        }
        const apiUrl = "http://localhost:9090/api/carts/deletecart/" + localStorage.getItem("cartId");
        axios.delete(apiUrl)
            .then((response) => {
                if (response.status === 204) {
                    clearCartData();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then((responseData) => {
                updateCartData(responseData.cartProduct);
                localStorage.setItem("cartId", responseData.cartId);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const getActiveCart = () => {
        console.log(localStorage.getItem('user'));
        console.log(typeof localStorage.getItem('user'));
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user);
        console.log(typeof user);
        const apiUrl = "http://localhost:9090/api/carts/getactivecart/" + user.userId;
        axios.get(apiUrl)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then((responseData) => {
                updateCartData(responseData.cartProduct);
                localStorage.setItem("cartId", responseData.cartId);
            })
            .catch((error) => {
                console.error(error);
            });
    }


    useEffect(() => {
        console.log(cartData);
        if (cartData.length === 0) {
            getActiveCart()
        }
    }, [])

    const updateQty = (productId, qty) => {
        let newCart = []
        for (let i = 0; i < cartData.length; i++) {
            if (cartData[i].productId === productId) {
                cartData[i].qty = qty
            }
            newCart.push(cartData[i]);
        }
        updateCartData(newCart)
    }

    useEffect(() => {

    }, [cartData])


    const isValidCart = () => {
        let errList = []
        for (let i = 0; i < cartData.length; i++) {
            if (cartData[i].qty <= 0) {
                errList.push("Invalid qty for " + cartData[i].productName);
            } else if (cartData[i].qty > cartData[i].quantity) {
                errList.push("Available qty for " + cartData[i].productName + " is " + cartData[i].quantity);
            }
        }
        if (cartData.length === 0) {
            errList.push("You can't save empty cart");
        }
        setErr(errList);
        return errList.length === 0;
    }
    const saveCart = () => {

        if (isValidCart()) {
            let cartProducts = []
            for (let i = 0; i < cartData.length; i++) {
                const p = {
                    "productId": cartData[i].productId,
                    "quantity": cartData[i].qty,
                    "productPrice": cartData[i].price,
                }
                cartProducts.push(p);
            }

            const user = JSON.parse(localStorage.getItem("user"))
            const data = {
                "cartId": localStorage.getItem("cartId"),
                "cartQuantity": cartData.reduce((acc, item) => {
                    return acc + item.qty;
                }, 0),
                "totalprice": cartData.reduce((acc, item) => {
                    return acc + (item.price * item.qty);
                }, 0),
                "isOrderPlaced": false,
                "userId": user.userId,
                "cartProductList": cartProducts
            };
            const apiUrl = "http://localhost:9090/api/carts/createCart";
            axios.post(apiUrl, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    if (response.status === 201) {
                        return response.data;
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then((r) => {
                    localStorage.setItem("cartId", r.cartId);
                    setSuccessMessage("Cart saved successfully!");
                })
                .catch((error) => {
                    console.error(error);
                });

        }
    }


    return (
        // <div className="flex gap-2">
        //     <div className="w-4/6">
        //         {
        //             Array.from({ length: 50 }, () => 0).map((v, index) => {
        //                 return (
        //                     <div className="flex w-full gap-2 border border-gray-200 my-1 p-2">
        //                         <div className="w-1/6 border">
        //                             <img src={"https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwa55b2189/images/hi-res/741188FVHAA02_1.jpg"} alt="image1" className="w-40 h-40" />
        //                         </div>
        //                         <div className="flex items-center justify-center w-2/6 text-lg">
        //                             Necklace
        //                         </div>
        //                         <div className="flex items-center w-1/6 justify-center">
        //                             <input
        //                                 type="number"
        //                                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-3/6 p-2.5"
        //                                 value={10}
        //                             />
        //                         </div>
        //                         <div className="flex items-center w-2/6 justify-center">
        //                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-400 cursor-pointer">
        //                                 <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        //                             </svg>
        //                         </div>
        //                     </div>
        //                 )
        //             })
        //         }
        //     </div>
        //     <div className="w-2/6 h-fit p-4 bg-gray-100">
        //         <div className="text-2xl font-medium py-2 border-b border-gray-200">Summary</div>
        //         <div className="grid grid-cols-2 py-6 px-4 border-b border-gray-200 mb-2">
        //             <div className=" text-lg font-medium">Total Products</div>
        //             <div className=" text-lg font-medium text-right">2</div>
        //         </div>
        //         {
        //             Array.from({ length: 50 }, () => 0).map((v, index) => {
        //                 return (
        //                     <div className="grid grid-cols-3 pb-2 px-4">
        //                         <div className=" text-md">Necklace</div>
        //                         <div className=" text-md text-right">2 x 20000</div>
        //                         <div className=" text-md text-right">40000</div>
        //                     </div>

        //                 )
        //             })
        //         }
        //         <div className="grid grid-cols-2 py-2 px-4 border-t border-gray-200 mt-2">
        //             <div className=" text-lg font-medium">Total Amount</div>
        //             <div className=" text-lg font-medium text-right">60000 Rs</div>
        //         </div>
        //         <div className="py-6 px-4 mb-2 text-center">
        //             <button class=" mt-2 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
        //                 Checkout
        //             </button>
        //         </div>
        //     </div>
        // </div>
        <div className="container mt-2">
            {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
            <div className="w-100 text-end">
                <button
                    onClick={() => {
                        clearCartHandler()
                    }}
                    className="btn btn-danger btn-md my-2 mx-2" // Add mx-2 class for horizontal margin
                >
                    Clear cart
                </button>
            </div>
            <div className="w-100 text-start">
                <ul className="text-danger">
                    {
                        err.map((error) => {
                            return (
                                <li>{error}</li>
                            )
                        })
                    }
                </ul>

            </div>
            <div className="row g-5">

                <div className="col-md-8">
                    <div className="row mb-2 p-3 fw-bold bg-primary text-white" style={{ border: "1px solid #ddd" }}>
                        <div className="col-3">

                        </div>
                        <div className="col-3 d-flex align-items-center">
                            Product
                        </div>
                        <div className="col-2 d-flex align-items-center">
                            Qty
                        </div>
                        <div className="col-1 d-flex align-items-center">
                            Price
                        </div>
                        <div className="col-3 d-flex align-items-center justify-content-center">
                        </div>
                    </div>
                    {cartData.map((cart, index) => (
                        <div className="row mb-2 p-3" style={{ border: "1px solid #ddd" }}>
                            <div className="col-3">
                                <img
                                    src={cart.productImage}
                                    alt={cart.productName}
                                    className="img-fluid"
                                    style={{ width: "150px", height: "150px" }}
                                />
                            </div>
                            <div className="col-3 d-flex align-items-center">
                                {cart.productName}
                            </div>
                            <div className="col-2 d-flex align-items-center">
                                <input
                                    type="number"
                                    className="form-control"
                                    value={cart.qty}
                                    onChange={(ev) => {
                                        updateQty(cart.productId, ev.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-1 d-flex align-items-center">
                                {cart.price}
                            </div>
                            <div className="col-3 d-flex align-items-center justify-content-center">
                                <svg
                                    onClick={(ev) => {
                                        deleteProductFromCartHandler(cart.productId);
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="text-danger cursor-pointer"
                                    style={{ width: "25px", height: "25px" }}
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </div>
                        </div>
                    ))}
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
                    <div className="py-3 text-end">
                        <button onClick={saveCart} className="btn btn-primary mx-2">Save cart</button>
                        <Link to="/checkout" className="btn btn-primary">Checkout</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}