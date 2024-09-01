import { signup } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "@/forms";

export default function Signup() {
  return (
    <div className="flex items-center justify-center h-screen px-2">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">FinTrack | Signup</CardTitle>
          <CardDescription>
            Enter your details below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm action={signup} />
        </CardContent>
      </Card>
    </div>
  );
}
