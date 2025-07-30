import { SignUp } from "@clerk/clerk-react";

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <SignUp
        signInUrl="/login"
        appearance={{
          elements: {
            card: "shadow-xl border border-gray-300 rounded-lg",
            headerTitle: "text-2xl font-bold text-center text-gray-800",
            formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white",
          },
        }}
      />
    </div>
  );
};

export default Register;
