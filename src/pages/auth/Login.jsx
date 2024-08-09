import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import Swal from "sweetalert2";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || "");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://backend-superapps.newus.id/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { token } = data?.data;
        Cookies.set("token", token, { expires: 1 });
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Login berhasil!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-w-[360px]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {{ message } && <p className="text-red-500 text-center">{message}</p>}
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <h2 className="text-lg font-bold mb-6 text-center">Admin Ramatranz</h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 text-gray-600 rounded-md border border-main shadow-sm focus:outline-none  sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-main rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              autoComplete="true"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading ? true : false}
            onClick={handleSubmit}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {isLoading ? <Loader className="animate-spin" /> : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className=" text-sm text-main hover:text-blue-700">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;