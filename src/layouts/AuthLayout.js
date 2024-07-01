import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <div className="w-screen h-screen flex items-center bg-gray-100 justify-center">
            <Outlet />
        </div>
    )
}
export default AuthLayout;