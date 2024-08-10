import { Outlet } from "react-router-dom";
import Sidebar from "../elements/sidebar/Sidebar";

export default function Layout() {
  return (
    <>
      <Sidebar />
      <div className="flex-1 p-8 pl-[272px] bg-gray-50 min-h-screen">
        <Outlet />
      </div>
    </>
  );
}
