"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';  // Use next/navigation in App Router, not 'next/router'
import axios from "axios";
import { validateField } from "@/utils/formValidation";
import useRedirectIfLoggedIn from '@/utils/useRedirectIfLoggedIn';

import bcrypt from "bcryptjs";
import { instance } from "@/constants/apis/instance";

const Login = () => {
  useRedirectIfLoggedIn('');
  const router = useRouter();
  const [step, setStep] = useState<number>(1); 
  const [mobile, setMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);

  const handleNext = async () => {
    if (step === 1) {
      const mobileError = validateField("phone", mobile);
      if (mobileError) {
        setError(mobileError);
        return;
      }

      setError(""); 

      try {
        const response = await instance.post('/user_profile/user_exist/', {
          user_id: mobile
        });
        if (response.data.user_exist) {
          setStep(2);  // Move to the password/OTP step
        } else {
          setError("This mobile number does not exist.");
        }
      } catch (error: any) {
        console.log(error)
        handleError(error);
      }
    } else if (step === 2) {
      if (password !== "" && otp === "") {
        try {
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(password, salt);

          const response = await instance.post('/user_profile/user_exist/', {
            user_id: mobile,
            password: password,
          });

          if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('mobile', mobile);
            router.push('/profile'); // Navigate to profile on successful login
          } else {
            setError("Login failed. Check your credentials.");
          }
        } catch (error) {
          setError("Failed to login.");
        }
      }
    }
  };

  const handleOtpLogin = async () => {
    const countryCode = "+91"; 
    const formattedPhoneNumber = `${countryCode}${mobile.replace(/\D/g, "")}`;
    try {
      const response = await axios.get("https://getotp-co-send-otps-via-whatsapp-globally-for-free.p.rapidapi.com/api", {
        params: {
          key: "712bffad4amsh4602e17e5ea28cdp18ccfdjsnd18774d6b93d",
          otp: otp,
          to: formattedPhoneNumber,
        },
        headers: {
          "x-rapidapi-host": "getotp-co-send-otps-via-whatsapp-globally-for-free.p.rapidapi.com",
          "x-rapidapi-key": "712bffad4amsh4602e17e5ea28cdp18ccfdjsnd18774d6b93d",
        },
      });

      if (response.status === 200) {
        setOtpSent(true);
        setStep(3); // Move to OTP verification step
      } else {
        setError("Failed to send OTP via WhatsApp.");
      }
    } catch (error) {
      setError("Error sending OTP. Please try again later.");
    }
  };

  const handleOtpVerify = () => {
    // Implement OTP verification logic here.
    // Once OTP is verified, you can redirect the user to the profile page or show success message.
    if (otp.length === 4) { // Check if OTP length is valid
      // Assuming verification passed
      router.push('/profile');  // Redirect to profile after OTP verification
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleError = (error: any) => {
    if (error.response) {
      if (error.response.status === 404) {
        setError("This mobile number does not exist.");
      } else {
        setError(`'Server responded with error': ${error.response.status}`);
      }
    } else if (error.request) {
      setError("No response from the server. Please try again later.");
    } else {
      setError("Network error. Please check your connection.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cyan-400">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md m-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {step === 1 && (
          <div>
            <input
              type="text"
              placeholder="Email or Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="bg-gray-100 text-gray-600 w-full p-2 rounded-full outline-none mb-4"
            />
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
                  maxLength={1}  // Restrict input to one digit
                  className="bg-gray-100 text-gray-600 w-12 p-2 text-center rounded-full outline-none"
                  value={otp[i - 1] || ""}
                  onChange={(e) => {
                    const newOtp = otp.split("");
                    newOtp[i - 1] = e.target.value;
                    setOtp(newOtp.join(""));
                  }}
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <button
              onClick={handleOtpVerify}  // OTP verification handler
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
