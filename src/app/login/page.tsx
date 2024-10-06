import { login } from "./actions";
import AuthLayout from "@/components/layouts/auth-layout";
import { LoginForm } from "@/forms";

export default function Login() {
  return (
    <AuthLayout
      title="FinTrack | Login"
      description="Enter your email below to login to your account"
    >
      <LoginForm action={login} />
    </AuthLayout>
  );
}
