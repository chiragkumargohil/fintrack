"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchemaType, ForgotPasswordSchema } from "@/lib/schema";
import { Button, Form, FormElement } from "@/components/ui";
import { toast } from "sonner";

export default function ForgotForm({
  action,
}: {
  action: (data: FormData) => Promise<any>;
}) {
  // useForm is a custom hook that helps to create forms in React
  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmitForm: SubmitHandler<ForgotPasswordSchemaType> = async (
    data
  ) => {
    const formData = new FormData();
    formData.append("email", data.email);
    const response = await action(formData);

    if (response && response.error) {
      return toast.error(response.error);
    }
    toast.success("Email sent with reset link");
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
          label="Email"
          name="email"
          control={form.control}
          InputProps={{
            type: "email",
            placeholder: "Email",
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
