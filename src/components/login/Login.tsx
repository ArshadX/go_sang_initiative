"use client";
export const revalidate = 'no-store';
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';  // Use next/navigation in App Router, not 'next/router'

import { validateField } from "@/utils/formValidation";
import { generateSession, getCredentials } from "@/app/actions/auth";
import { instance } from "@/constants/apis/instance";

const Login = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1); 
  const [mobile, setMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const fetchToken = useCallback(async () => {
    const session = await getCredentials();
    if (session.isAuth) {
      router.push("/profile");
    }
  }, []);

  useEffect(() => {
    fetchToken();
  }, []);

  const handleNext = async (e: any) => {
    if (loading) return; // Prevent multiple clicks

    if (step === 1) {
      const mobileError = validateField("phone", mobile);
      if (mobileError) {
        setError(mobileError);
        return;
      }

      setError(""); 
      setLoading(true); // Start loading

      try {
        const res = await instance.post('/user_profile/user_exist/', {
          user_id: mobile
        });
        if (res.data.user_exist) {
          setStep(2); // Move to the password/OTP step
        } else {
          setError("This mobile number does not exist.");
        }
      } catch (error: any) {
        handleError(error);
      } finally {
        setLoading(false); // Stop loading
      }
    } else if (step === 2) {
      if (password !== "" && otp === "") {
        setLoading(true); // Start loading

        try {
          const response = await instance.post('/user_profile/login/', {
            user_id: mobile,
            password: password,
          });

          if (response.status === 200) {
            await generateSession(response.data.token, mobile);
            router.push('/profile'); // Navigate to profile on successful login
          } else {
            setError("Login failed. Check your credentials.");
          }
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false); // Stop loading
        }
      }
    }
  };

  const handleOtpLogin = async () => {
    // OTP login logic
  };

  const handleOtpVerify = () => {
    // OTP verification logic
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

        {loading && <p className="text-center">Loading...</p>} {/* Loading message */}

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
              disabled={loading} // Disable button while loading
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <input
              type='text'
              hidden={false}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 text-gray-600 w-full p-2 rounded-full outline-none mb-4"
            />
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white w-full p-2 rounded-full active:bg-secondary"
              disabled={loading} // Disable button while loading
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
              onClick={handleOtpVerify}  
              className="bg-blue-500 text-white w-full p-2 rounded-full"
              disabled={loading} 
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
