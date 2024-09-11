"use client";
import React, { useState } from "react";
import axios from "axios";
import { validateField } from "@/utils/formValidation";

const Login = () => {
  const [step, setStep] = useState(1); // 1: Email/Mobile, 2: Password, 3: OTP
  const [Mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleNext = async () => {
    if (step === 1) {
      // Validate mobile number before moving to the next step
      const mobileError = validateField("phone", Mobile);
      if (mobileError) {
        setError(mobileError);
        return;
      }

      setError(""); // Clear any previous errors

      try {
        // Check if the mobile number exists
        const response = await axios.get(
          "https://ovesh5667.pythonanywhere.com/api/user_profile/user_exist/",
          {
            params: { user_id: Mobile }
          }
        );

        if (response.data.exists) {
          setStep(2);
        } else {
          setError(" This Mobile number does not  exist.");
        }
      } catch (error) {
        setError("Error checking mobile number. Please try again.");
      }
    } else if (step === 2) {
      if (password !== "" && otp === "") {
        try {
          const response = await axios.post(
            "https://go-sang-initiative-backend.vercel.app/api/user/login",
            { Mobile, password }
          );

          if (response.status === 200) {
            localStorage.setItem("token", "12345");
            console.log("Logged in");
            // Redirect to the dashboard or home page
            // e.g., Router.push('/dashboard'); // Uncomment if routing is set up
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
    setStep(3);
    const countryCode = "+91"; // For India
    const formattedPhoneNumber = `${countryCode}${Mobile.replace(/\D/g, "")}`;
    try {
      const response = await axios.get(
        "https://getotp-co-send-otps-via-whatsapp-globally-for-free.p.rapidapi.com/api",
        {
          params: {
            key: "712bffad4amsh4602e17e5ea28cdp18ccfdjsnd18774d6b93d", // Your API Key
            otp: otp,
            to: formattedPhoneNumber,
          },
          headers: {
            "x-rapidapi-host":
              "getotp-co-send-otps-via-whatsapp-globally-for-free.p.rapidapi.com",
            "x-rapidapi-key":
              "712bffad4amsh4602e17e5ea28cdp18ccfdjsnd18774d6b93d",
          },
        }
      );

      if (response.status === 200) {
        setOtpSent(true);
      } else {
        setError("Failed to send OTP via WhatsApp.");
      }
    } catch (error) {
      setError("Error sending OTP. Please try again later.");
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
              value={Mobile}
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
