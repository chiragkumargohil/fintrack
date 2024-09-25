import AuthLayout from "@/components/layouts/auth-layout";
import { resetPassword, validate } from "./actions";
import { ResetPasswordForm } from "@/forms";

type ResetPasswordProps = {
  searchParams: any;
};

export default async function ResetPassword({
  searchParams,
}: ResetPasswordProps) {
  const token = searchParams.token;
  const isValid = await validate(token);

  return (
    <AuthLayout
      title="FinTrack | Reset Password"
      description={
        isValid.error
          ? `${isValid.error}. Please try again`
          : "Enter your new password below to reset your password"
      }
    >
      <ResetPasswordForm
        action={async (data) => {
          "use server";
          return await resetPassword(token, data);
        }}
      />
    </AuthLayout>
  );
}
