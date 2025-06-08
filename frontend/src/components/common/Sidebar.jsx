import { NavLink } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineClipboardList,
  HiOutlineLogout,
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext'; // ✅ Correct import

const Sidebar = () => {
  const { user, logout } = useAuth(); // ✅ No need to manually useContext

  const isAdmin = user?.role === 'admin';

  const handleLogout = () => logout();

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col shadow-lg">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">HMS</div>
      <nav className="flex-1 p-4 space-y-4">
        <NavLink to="/" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <HiOutlineHome /> Dashboard
        </NavLink>
        {isAdmin ? (
          <>
            <NavLink to="/admin/students" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
              <HiOutlineUsers /> Students
            </NavLink>
            <NavLink to="/admin/complaints" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
              <HiOutlineClipboardList /> Complaints
            </NavLink>
            {/* Add other admin links similarly */}
          </>
        ) : (
          <>
            <NavLink to="/student/complaints" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
              <HiOutlineClipboardList /> Complaints
            </NavLink>
            {/* Add other student links similarly */}
          </>
        )}
      </nav>
      <button onClick={handleLogout} className="p-4 hover:bg-red-600 w-full text-left">
        <HiOutlineLogout className="inline mr-2" /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
