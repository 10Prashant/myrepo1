import { Outlet, useNavigate } from "react-router-dom"
import { SidebarComponent } from "../sidebar/SidebarComponent"
import { useEffect } from "react"

export const AdminPanelComponent = () => {

    const navigator = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("user") == null) {
            navigator("/admin-login");
        } else {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user.role === "customer") {
                navigator("/admin-login");
            }
        }
        
    }, [])

    return (
        // <div className="flex">
        //     <SidebarComponent />
        //     <div className="w-5/6 h-screen overflow-y-auto">
        //         <Outlet />
        //     </div>
        // </div>
        <div className="d-flex">
            <SidebarComponent />
            <div className="col-10 overflow-auto" style={{ height: '100vh' }}>
                <Outlet />
            </div>
        </div>

    )
}