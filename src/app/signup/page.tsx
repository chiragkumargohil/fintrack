import { signup } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignupForm from "@/forms/signup-form";

export default function Signup() {
  return (
    <main className="flex items-center justify-center h-screen px-2">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Enter your details below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm action={signup} />
        </CardContent>
      </Card>
    </main>
  );
}
