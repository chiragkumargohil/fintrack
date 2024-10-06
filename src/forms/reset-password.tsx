"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchemaType, ResetPasswordSchema } from "@/lib/schema";
import { Button, Form, FormElement } from "@/components/ui";
import { toast } from "sonner";

export default function ResetPassword({
  action,
}: {
  action: (data: FormData) => Promise<any>;
}) {
  // useForm is a custom hook that helps to create forms in React
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmitForm: SubmitHandler<ResetPasswordSchemaType> = async (
    data
  ) => {
    const formData = new FormData();
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    const response = await action(formData);

    if (response && response.error) {
      return toast.error(response.error);
    }
    toast.success("Password updated successfully");
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="space-y-4"
      >
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
        <FormElement
          elementType="input"
          label="Confirm password"
          name="confirmPassword"
          control={form.control}
          InputProps={{
            type: "password",
            placeholder: "Confirm password",
          }}
        />
        <div className="space-y-2">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        <Link href="/login" className="underline">
          Back to login
        </Link>
      </div>
    </Form>
  );
}
