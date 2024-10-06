import AuthLayout from "@/components/layouts/auth-layout";
import { signup } from "./actions";
import { SignupForm } from "@/forms";

export default function Signup() {
  return (
    <AuthLayout
      title="FinTrack | Signup"
      description="Enter your details below to create an account"
    >
      <SignupForm action={signup} />
    </AuthLayout>
  );
}
