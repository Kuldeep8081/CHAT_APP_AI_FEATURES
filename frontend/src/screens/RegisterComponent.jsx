import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { useUser } from '../context/user.context';
const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    axios.post('/users/register', { email, password })
      .then(response => {
        console.log('Sign up successful:', response.data);
        localStorage.setItem('token', response.data.token);
        login({token: response.data.token, user: response.data.user});
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error signing up!', error);
      });
  };

  return (
    <div className="w-full h-screen bg-linear-to-r from-blue-400 to-purple-500 place-items-center place-content-center  ">
      <div className="bg-white shadow-lg shadow-gray -500/50 rounded-lg  overflow-hidden p-10!">

        {/* Header */}
        <div className="w-full flex flex-col items-center justify-center mb-10! ">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome
          </h2>
          <p className="text-2xl font-medium text-gray-600 mt-10">
            Please sign up to continue
          </p>
        </div>

        {/* Registration Form */}
        <form className="" onSubmit={handleSignUp}>

          {/* Email Input */}
          <div className="flex flex-col mb-5">
            <label htmlFor="email" className=" text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-md px-2! mt-1! mb-2! "
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col mb-5">
            <label htmlFor="password" className="text-gray-700 ">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-md px-2! mt-1! mb-2!"
              placeholder="Enter your password"
            />
          </div>
          {/* Sign Up Button */}
          <div className="mt-3!">
            <button
              type="submit"
              className="bg-linear-to-r from-blue-400 to-purple-500 text-white w-full py-1! cursor-pointer rounded-md font-semibold hover:from-blue-500 hover:to-purple-600"
            >
              Sign up
            </button>
          </div>
        </form>

        {/* SignIn Link */}
        <div className="text-center mt-5!">
          <p className="">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-500"
            >
              SignIn
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterComponent;