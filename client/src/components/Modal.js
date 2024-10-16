import React, { useState } from "react";
import { loginUser, signupUser } from "../api/api";
import { MdClose } from "react-icons/md";
import { setUser, setIsLoggedIn } from "../redux/Reducers/userSlice";
import { useDispatch } from "react-redux";

const Modal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch =  useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const response = isLogin
        ? await loginUser(userData)
        : await signupUser(userData);

      if (response.success) {
        if (isLogin) {
          dispatch(setUser(response.data.user));
          dispatch(setIsLoggedIn(true));
          onClose();
        } else {
          alert("Registration successful! Please log in.");
          setIsLogin(true);
          setName(""); 
          setConfirmPassword(""); 
          setEmail(""); 
          setPassword(""); 
        }
      } else {
        alert(response.message || "An error occurred during authentication.");
      }
    } catch (error) {
      alert(
        "Error during authentication: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3 relative">
            <h2 className="text-xl mb-4">{isLogin ? "Login" : "Register"}</h2>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              <MdClose size={24} />
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Enter User Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border p-2 rounded outline-none"
                />
              )}
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-2 rounded outline-none"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border p-2 rounded outline-none"
              />
              {!isLogin && (
                <input
                  type="password" 
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border p-2 rounded outline-none"
                />
              )}
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                {isLogin ? "Login" : "Sign Up"}
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500 underline"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
