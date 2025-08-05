import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useContext(AppContext);

  const [isModel, setIsMOdel] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleModelClose = () => {
    setIsMOdel(false);
    navigate("/");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(formData.name, formData.email, formData.password);
    setIsMOdel(false);
    navigate("/");
  };
  return (
    <>
      {isModel && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Register</h2>
              <button
                onClick={handleModelClose}
                className="text-gray-600 hover:text-gray-900 text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rouded hover:bg-green-700 cursor-pointer"
              >
                Register
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              Already have an Account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
