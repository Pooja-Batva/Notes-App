import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function Navbar() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

  return (
    <nav className='bg-gray-900 text-white px-6 py-3 flex justify-between items-center'>
        {/* left side */}
        <Link to="/" className="text-xl font-bold hover:text-yellow-300">
            📝 NoteApp
        </Link>

        {/* right side */}
        <div className='space-x-4'>
            {
                isAuthenticated ? (
                    <>
                        <Link to='/notes' className="hover:text-yellow-300">
                            My Notes
                        </Link>
                        <button 
                            onClick={() => {
                                Cookies.remove("token");
                                setIsAuthenticated(false);
                            }}
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