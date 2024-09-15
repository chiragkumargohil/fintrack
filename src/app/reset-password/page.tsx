import { resetPassword, validate } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResetPasswordForm } from "@/forms";

type ResetPasswordProps = {
  searchParams: any;
};

export default async function ResetPassword({
  searchParams,
}: ResetPasswordProps) {
  const token = searchParams.token;
  const isValid = await validate(token);

  if (isValid.error) {
    return (
      <div className="flex items-center justify-center h-screen px-2">
        <Card className="mx-auto max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-2xl">
              FinTrack | Reset Password
            </CardTitle>
            <CardDescription>{isValid.error}. Please try again</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen px-2">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">FinTrack | Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm
            action={async (data) => {
              "use server";
              return await resetPassword(token, data);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
