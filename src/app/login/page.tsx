"use client";

export default function GoogleLogin() {
  const loginWithGoogle = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    window.location.href = `${baseUrl}/auth/google`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col items-center space-y-6">
          <div className="mb-2">
            <img
              src="/logo.svg" // Optional: replace with your logo
              alt="Logo"
              className="h-12 transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
            <p className="mt-1 text-gray-600">Sign in to your account to continue</p>
          </div>
          <button
            onClick={loginWithGoogle}
            className="group flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.3H272v95.2h146.9c-6.3 33.9-25.1 62.5-53.6 81.7v67.7h86.7c50.7-46.7 81.5-115.5 81.5-194.3z"
                fill="#4285f4"
              />
              <path
                d="M272 544.3c72.6 0 133.6-24.1 178.1-65.5l-86.7-67.7c-24.1 16.2-54.8 25.7-91.4 25.7-70.3 0-129.9-47.6-151.3-111.3H32.4v69.9c44.8 88.6 137.1 148.9 239.6 148.9z"
                fill="#34a853"
              />
              <path
                d="M120.7 325.5c-10.5-31.1-10.5-64.4 0-95.5V160.1H32.4c-37.3 73.9-37.3 161.5 0 235.4l88.3-69.9z"
                fill="#fbbc04"
              />
              <path
                d="M272 107.7c39.5-.6 77.4 13.8 106.4 39.5l79.4-79.4C414.8 24.1 353.8 0 272 0 169.5 0 77.2 60.3 32.4 148.9l88.3 69.9C142.1 155.3 201.7 107.7 272 107.7z"
                fill="#ea4335"
              />
            </svg>
            <span className="font-medium">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}