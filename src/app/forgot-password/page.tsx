import { forgotPassword } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ForgotPasswordForm } from "@/forms";

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center h-screen px-2">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">FinTrack | Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm action={forgotPassword} />
        </CardContent>
      </Card>
    </div>
  );
}
