import React, { useState, useContext } from "react";
import { googleProvider, auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { backendUrl, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 Firebase Auth Handler
  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      let userCredential;

      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      // 🔥 Get Firebase Token
      const firebaseToken = await userCredential.user.getIdToken();

      // 🔥 Send to backend
      const { data } = await axios.post(`${backendUrl}/api/user/firebase-auth`, {
        token: firebaseToken
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Welcome to Life Saver 🏥");
        navigate("/");
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // 🔥 Get Firebase Token
      const firebaseToken = await result.user.getIdToken();

      // 🔥 Send to backend
      const { data } = await axios.post(`${backendUrl}/api/user/firebase-auth`, {
        token: firebaseToken
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Logged in with Google 🏥");
        navigate("/");
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side - Branding */}
      <div className="hidden md:flex w-1/2 bg-primary text-white flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Life Saver</h1>
        <p className="mt-4 text-lg">Your Health, Our Priority</p>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <form
          onSubmit={handleAuth}
          className="w-[350px] p-8 shadow-xl rounded-xl border"
        >
          <h2 className="text-2xl font-bold text-center mb-2">
            {isSignup ? "Patient Registration" : "Patient Login"}
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Access your medical dashboard
          </p>

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-3 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-3 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-primary text-white py-3 rounded">
            {isSignup ? "Register" : "Login"}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border py-3 rounded mt-3 flex items-center justify-center gap-2 hover:bg-gray-100"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="text-sm mt-4 text-center">
            {isSignup ? "Already registered?" : "New patient?"}
            <span
              onClick={() => setIsSignup(!isSignup)}
              className="text-primary cursor-pointer ml-2"
            >
              {isSignup ? "Login" : "Create Account"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;