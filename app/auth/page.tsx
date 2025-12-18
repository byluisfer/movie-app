import LoginForm from "@/app/components/LoginForm";
import RegisterForm from "@/app/components/RegisterForm";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="w-full max-w-md rounded-lg bg-zinc-900 p-6 text-white">
        <h1 className="mb-6 text-center text-2xl font-semibold">Welcome</h1>

        <div className="flex flex-col gap-8">
          <div>
            <h2 className="mb-2 text-lg font-medium">Login</h2>
            <LoginForm />
          </div>

          <div>
            <h2 className="mb-2 text-lg font-medium">Register</h2>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
