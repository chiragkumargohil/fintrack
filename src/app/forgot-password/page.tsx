import AuthLayout from "@/components/layouts/auth-layout";
import { forgotPassword } from "./actions";
import { ForgotPasswordForm } from "@/forms";

export default function ForgotPassword() {
  return (
    <AuthLayout
      title="FinTrack | Forgot Password"
      description="Enter your email below to reset your password"
    >
      <ForgotPasswordForm action={forgotPassword} />
    </AuthLayout>
  );
}
