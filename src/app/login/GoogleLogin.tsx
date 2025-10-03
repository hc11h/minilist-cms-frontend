"use client"
import { useState } from 'react'

export default function GoogleLogin() {
  const [isLoading, setIsLoading] = useState(false)

  const loginWithGoogle = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    

    if (!baseUrl) {
      console.error('NEXT_PUBLIC_API_BASE_URL is not defined')
      alert('Configuration error. Please contact support.')
      return
    }

    try {
      setIsLoading(true)
     
      window.location.href = `${baseUrl}/auth/google`
    } catch (error) {
      console.error('Login failed:', error)
      setIsLoading(false)
      alert('Failed to initiate login. Please try again.')
    }
  }

  return (
    <main className="flex-1 bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-white dark:bg-muted p-6 shadow-md transition-all duration-300 hover:shadow-lg">
     
        <div className="flex justify-center mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="font-mono text-sm font-bold text-primary-foreground">M</span>
          </div>
        </div>
        

        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-foreground font-sans">
            Welcome Back
          </h1>
          <p className="mt-1 text-sm text-muted-foreground font-sans">
            Sign in to your account to continue
          </p>
        </div>


        <button
          onClick={loginWithGoogle}
          disabled={isLoading}
          className="group w-full flex items-center justify-center gap-3 rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground transition-all duration-200 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              <span className="font-medium font-sans">Redirecting...</span>
            </>
          ) : (
            <>
              <GoogleIcon />
              <span className="font-medium font-sans">Continue with Google</span>
            </>
          )}
        </button>
      </div>
    </main>
  )
}

function GoogleIcon() {
  return (
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
  )
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}