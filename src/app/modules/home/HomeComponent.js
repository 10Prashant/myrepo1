import { Outlet, useNavigate } from "react-router-dom"
import { NavbarComponent } from "../navbar/NavbarComponent"
import { useEffect } from "react";

export const HomeComponent = () => {

    const navigator = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("user") == null) {
            navigator("/login");
        }
    },[])

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-12">
                <nav className="navbar sticky-top navbar-light bg-light">
                    <NavbarComponent />
                </nav>
            </div>
        </div>
        <div className="row p-4">
            <div className="col-md-12">
                <Outlet />
            </div>
        </div>
    </div>
    
    )
}