"use client"; 
import React, { useState } from 'react';

const Login = () => {
  const [step, setStep] = useState(1); // 1: Email/Mobile, 2: Password, 3: OTP
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const handleNext = () => {
    if (step === 1) {
        console.log(emailOrMobile);
      // Validate email/mobile before moving to the next step
      setStep(2);
    } else if (step === 2) {
        console.log(password);
        console.log(otp);
      // Validate password or send OTP
      // If user clicks "Login with OTP", move to the OTP step
    }
  };

  const handleOtpLogin = () => {
    setStep(3);
    // Trigger OTP sending logic here
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cyan-400">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {step === 1 && (
          <div>
            <input
              type="text"
              placeholder="Email or Mobile Number"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              className="bg-gray-100 text-gray-600 w-full p-2 rounded-full outline-none mb-4"
            />
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white w-full p-2 rounded-full"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 text-gray-600 w-full p-2 rounded-full outline-none mb-4"
            />
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white w-full p-2 rounded-full"
            >
              Login
            </button>
            <p
              onClick={handleOtpLogin}
              className="text-blue-500 text-sm mt-4 cursor-pointer text-center"
            >
              Login with OTP
            </p>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4].map((i) => (
                <input
                  key={i}
                  type="text"
                  
                  className="bg-gray-100 text-gray-600 w-12 p-2 text-center rounded-full outline-none"
                  value={otp[i - 1] || ''}
                  onChange={(e) => {
                    const newOtp = otp.split('');
                    newOtp[i - 1] = e.target.value;
                    setOtp(newOtp.join(''));
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => {
                // Handle OTP verification here
              }}
              className="bg-blue-500 text-white w-full p-2 rounded-full"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
