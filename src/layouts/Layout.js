import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className="flex-1 p-8 pl-[272px] bg-[#F8F8F8]">
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
