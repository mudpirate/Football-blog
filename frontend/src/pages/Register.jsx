import React from "react";
import { SignUp } from "@clerk/clerk-react";

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignUp
        signInUrl="/login"
        appearance={{
          variables: {
            // primary buttons and links (indigo)
            colorText: "#1f2937", // text (gray-800)
            colorBackground: "#ffffff", // background of the sign-up card
          },
          elements: {
            card: "shadow-lg rounded-xl p-6", // Tailwind classes for the card
            formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white",
            headerTitle: "text-xl text-gray-900",
          },
        }}
      />
    </div>
  );
};

export default Register;
