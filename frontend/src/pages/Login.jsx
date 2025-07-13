import { SignIn } from "@clerk/clerk-react";
import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <SignIn
        signUpUrl="/register"
        appearance={{
          elements: {
            card: "shadow-xl border border-gray-300 rounded-lg",
            headerTitle: "text-2xl font-bold text-center text-gray-800",
            formButtonPrimary: "bg-green-500 hover:bg-green-600 text-white",
          },
        }}
      />
    </div>
  );
};

export default Login;
