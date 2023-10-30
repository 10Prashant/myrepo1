import { Link, useNavigate } from "react-router-dom"

export const SidebarComponent = () => {

    const navigator = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("cartId");
        navigator("/admin-login");
    }

    return (
        // <div className="w-1/6 border border-y-0 border-l-0 border-gray-200 shadow-md h-screen">
        //     <div className="w-full bg-teal-500 text-white text-2xl text-center py-4 font-semibold border-b border-gray-200">
        //         Admin
        //     </div>
        //     <div className="flex flex-wrap w-full">
        //         <Link to="/admin/product" className="w-full text-justify pl-2 text-md py-3 invisible">
        //             Product
        //         </Link>
        //         <Link to="/admin/product" className="w-full text-justify pl-2 text-md py-3 text-teal-400 border border-gray-50 hover:bg-gray-50">
        //             Product
        //         </Link>
        //         <Link to="/admin/category" className="w-full text-justify pl-2 text-md py-3 text-teal-400 border border-gray-50  hover:bg-gray-50">
        //             Category
        //         </Link>
        //         <Link to="/admin/order" className="w-full text-justify pl-2 text-md py-3 text-teal-400 border border-gray-50  hover:bg-gray-50">
        //             Order
        //         </Link>
        //         <Link to="/admin/users" className="w-full text-justify pl-2 text-md py-3 text-teal-400 border border-gray-50  hover:bg-gray-50">
        //             Users
        //         </Link>
        //     </div>
        //     <div className="w-full text-center px-4 text-md py-40">
        //         <button class="flex w-full justify-center items-center gap-2 mt-2 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        //                 <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        //             </svg>
        //             Logout
        //         </button>
        //     </div>
        // </div>
        <div className="col-md-2 border border-end-0 border-secondary shadow d-flex flex-column" style={{ height: '100vh' }}>
            <div className="bg-primary text-white text-center py-4 font-weight-bold border-bottom border-secondary">
                Admin
            </div>
            <div className="flex-grow-1">
                <Link to="/admin/product" className="nav-link text-dark py-3">
                    Products
                </Link>
                <Link to="/admin/category" className="nav-link text-dark py-3">
                    Categories
                </Link>
                <Link to="/admin/order" className="nav-link text-dark py-3">
                    Orders
                </Link>
                <Link to="/admin/users" className="nav-link text-dark py-3">
                    Users
                </Link>
            </div>
            <div className="text-center py-5">
                <button onClick={logoutHandler} className="btn btn-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 me-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    Logout
                </button>
            </div>
        </div>

    )
}