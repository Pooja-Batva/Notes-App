import {Link} from "react-router-dom"
import {useState} from "react"
import authService from "../services/authService"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // Api call
    authService.login({email, password})
      .then((response) => {
        login(response.data.accessToken);
        navigate('/');
        // Handle successful login (e.g., redirect or show a success message)
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Login failed. Try again.");
        // Handle login error (e.g., show an error message)
      });


    // Reset form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-gray-800 rounded-lg hover:bg-gray-900"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-gray-900 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login