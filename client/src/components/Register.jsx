import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res= await fetch('http://localhost:5000/api/auth/register',{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({ username, password })
      });
      if(!res.ok){
        throw new Error("Nerwork problems")
      }
      const data= await res.json();
      navigate('/login')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Register
        </button>
      </form>
      <div className=' mt-3'>Already registered? <a className=' text-blue-700 font-medium' href="/login"> Login </a>to continue</div>
    </div>
  );
};

export default Register;
