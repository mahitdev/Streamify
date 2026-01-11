import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom"; // Note: changed to react-router-dom just in case, revert if using v6.4+ specific
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden min-h-[600px]">
        
        {/* LEFT SIDE: LOGIN FORM */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          {/* LOGO */}
          <div className="mb-8 flex items-center gap-2">
            <ShipWheelIcon className="size-8 text-primary" />
            <span className="text-2xl font-bold font-mono tracking-wider">
              Streamify
            </span>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="alert alert-error mb-6 text-sm py-2">
              <span>{error.response?.data?.message || "Something went wrong"}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-base-content/70 mt-1">
                Sign in to your account to continue your journey
              </p>
            </div>

            <div className="space-y-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="input input-bordered w-full bg-base-200 focus:bg-base-100 transition-colors"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-base-200 focus:bg-base-100 transition-colors"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full text-lg" 
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-center text-sm text-base-content/70">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Create one
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT SIDE: IMAGE SECTION */}
        <div className="hidden lg:flex w-1/2 bg-base-200 items-center justify-center relative overflow-hidden">
          
          {/* Background Pattern (Optional overlay to blend the image better) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

          {/* The Image */}
          <img 
            src="/login-bg.jpg" /* Make sure file is named this in public folder */
            alt="Connection illustration" 
            className="w-full h-full object-cover"
          />

          {/* Text Overlay on Image */}
          <div className="absolute bottom-10 left-8 right-8 z-20 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Connect Worldwide</h3>
            <p className="text-sm opacity-90">
              Join thousands of users practicing languages together.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;