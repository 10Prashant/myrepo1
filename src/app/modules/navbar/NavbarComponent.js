import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const NavbarComponent = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setIsLoggedIn(true);
        } else {
            console.log("asd")
        }
    }, [isLoggedIn])

    const logoutHandler = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("cartId");
        navigator("/login");
    }

    return (
        // <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        //     <div className="flex items-center flex-shrink-0 text-white mr-6">
        //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="fill-current h-8 w-8 mr-2" width="54" height="54">
        //             <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        //         </svg>
        //         <span className="font-semibold text-xl tracking-tight">Jwellery Shop</span>
        //     </div>
        //     <div className="block hidden">
        //         <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        //             <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        //         </button>
        //     </div>

        //     <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto pl-20">
        //         <div className="text-sm lg:flex-grow gap-12">

        //             <Link to="/" className="pr-4 block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        //                 <div className="flex items-center text-lg gap-1 font-medium text-white">
        //                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        //                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        //                     </svg>
        //                     Home
        //                 </div>
        //             </Link>


        //             <Link to="/order" className="pr-4 block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        //                 <div className="flex items-center text-lg gap-1 font-medium text-white">
        //                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        //                         <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        //                         <line x1="12" y1="2" x2="12" y2="6" />
        //                         <line x1="7" y1="6" x2="17" y2="6" />
        //                         <line x1="9" y1="11" x2="15" y2="11" />
        //                         <line x1="8" y1="16" x2="16" y2="16" />
        //                     </svg>
        //                     Orders
        //                 </div>
        //             </Link>

        //             <Link to="/cart" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        //                 <div className="flex items-center text-lg gap-1 font-medium text-white">
        //                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        //                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        //                     </svg>
        //                     Cart
        //                 </div>
        //             </Link>

        //         </div>
        //         <div className="flex gap-2">
        //             {isLoggedIn && <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</button>}
        //             {!isLoggedIn && <Link to="/admin-login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Admin Login</Link>}
        //             {!isLoggedIn && <Link to="/login" className=" text-white inline-block text-sm px-4 py-2 leading-none border rounded border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Customer Login</Link>}
        //         </div>
        //     </div>
        // </nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="fill-current h-8 w-8 mr-2" width="54" height="54">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                    </svg>
                    <span className="font-weight-bold text-xl">Jewelry Shop</span>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <div className="d-flex align-items-center text-lg font-weight-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="current-color" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                    Home
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/order" className="nav-link">
                                <div className="d-flex align-items-center text-lg font-weight-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                                        <line x1="12" y1="2" x2="12" y2="6" />
                                        <line x1="7" y1="6" x2="17" y2="6" />
                                        <line x1="9" y1="11" x2="15" y2="11" />
                                        <line x1="8" y1="16" x2="16" y2="16" />
                                    </svg>
                                    Orders
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link">
                                <div className="d-flex align-items-center text-lg font-weight-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                    Cart
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item ml-4 d-flex justify-content-center">
                            {isLoggedIn && <button onClick={logoutHandler} className="btn btn-danger ml-4" >Logout</button>}
                            {!isLoggedIn && <Link to="/admin-login" className="nav-link btn btn-primary ml-4">Admin Login</Link>}
                            {!isLoggedIn && <Link to="/login" className="nav-link btn btn-primary ml-4">Customer Login</Link>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
}