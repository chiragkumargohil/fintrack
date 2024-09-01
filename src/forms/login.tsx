"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "@/lib/schema";
import { Button, Form, FormElement } from "@/components/ui";
import { toast } from "sonner";

export default function LoginForm({
  action,
}: {
  action: (data: FormData) => Promise<any>;
}) {
  // useForm is a custom hook that helps to create forms in React
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitForm: SubmitHandler<LoginSchemaType> = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const response = await action(formData);
    if (response?.error) {
      return toast.error(response.error);
    }
    toast.success("Login successful");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="space-y-4"
      >
        <FormElement
          elementType="input"
          label="Email"
          name="email"
          control={form.control}
          InputProps={{
            type: "email",
            placeholder: "Email",
          }}
        />
        <FormElement
          elementType="input"
          label="Password"
          name="password"
          control={form.control}
          InputProps={{
            type: "password",
            placeholder: "Password",
          }}
        />
        <div className="space-y-2">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Loading..." : "Login"}
          </Button>
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </div>
    </Form>
  );
}
