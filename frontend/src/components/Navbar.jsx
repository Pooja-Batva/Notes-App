import { Link } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

  return (
    <nav className='bg-gray-900 text-white px-6 py-3 flex justify-between items-center'>
        {/* left side */}
        <Link to="/" className="text-xl font-bold hover:text-yellow-300">
            📝 NoteApp
        </Link>

        {/* right side */}
        <div className='space-x-4'>
            {
                isLoggedIn ? (
                    <>
                        <Link to='/add-note' className="hover:text-yellow-300">
                            My Notes
                        </Link>
                        <button 
                            onClick={handleLogout}
                            className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-yellow-300">
                            Login
                        </Link>
                        <Link to='/signup' className='hover:text-yellow-300'>
                            Signup
                        </Link>
                    </>
                )
            }
        </div>
    </nav>
  )
}

export default Navbar