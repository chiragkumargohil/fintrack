"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormElement } from "@/components/ui";
import { toast } from "sonner";
import { SignupSchema, SignupSchemaType } from "@/lib/schema";

export default function SignupForm({
  action,
}: {
  action: (data: FormData) => Promise<any>;
}) {
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    shouldFocusError: true,
  });

  const handleSubmitForm: SubmitHandler<SignupSchemaType> = async (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName as string);
    formData.append("email", data.email);
    formData.append("password", data.password);
    const response = await action(formData);
    if (response?.error) {
      return toast.error(response.error);
    }
    toast.success("Sign up successful");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            elementType="input"
            label="First name"
            name="firstName"
            control={form.control}
            InputProps={{
              placeholder: "First name",
            }}
          />
          <FormElement
            elementType="input"
            label="Last name"
            name="lastName"
            control={form.control}
            InputProps={{
              placeholder: "Last name",
            }}
          />
        </div>
        <FormElement
          elementType="input"
          label="Email"
          name="email"
          control={form.control}
          InputProps={{
            type: "email",
            placeholder: "Email",
          }}
          rules={{ required: "Email is required" }}
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
          rules={{ required: "Password is required" }}
        />
        <div className="space-y-2">
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </Form>
  );
}
