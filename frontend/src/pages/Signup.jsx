import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import authService from "../services/authService"

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    authService.signup({username, email, password})
      .then((response) => {
        navigate('/login');
        // Handle successful signup (e.g., redirect or show a success message)
      })
      .catch((error) => {
        // Handle signup error (e.g., show an error message)
        setError(error.response?.data?.message || "Signup failed. Try again.");
      });

       // Reset form fields
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="username">Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
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
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-900 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup