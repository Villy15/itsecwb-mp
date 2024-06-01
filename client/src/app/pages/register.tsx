function RegisterPage() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="mb-4 flex flex-col items-center justify-center">
        <div className="mb-4 text-2xl font-bold">Create Your Account</div>
      </div>
      <div className="flex w-full max-w-sm items-center justify-center">
        {/* <RegisterForm /> */}
      </div>

      <a href="/login" className="mt-8 text-sm hover:underline">
        Go back to Login
      </a>
      <div className="mt-8 max-w-sm text-center text-xs font-light">
        By creating an account, you agree to our Terms of Service and have read
        and understood the Privacy Policy
      </div>
    </div>
  );
}

export default RegisterPage;
