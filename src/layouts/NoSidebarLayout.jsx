import React from 'react'
import { Outlet } from "react-router-dom"

export default function NoSidebarLayout() {
    return (
        <div className="container">
            <div className="h-svh flex-1 justify-center">
                <Outlet />
            </div>
        </div>
    )
}
