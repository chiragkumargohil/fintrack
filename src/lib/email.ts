type EmailProps = {
  to: string;
  subject: string;
  htmlContent: string;
};

const sendEmail = async ({ to, subject, htmlContent }: EmailProps) => {
  const url = "https://api.brevo.com/v3/smtp/email";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": process.env.BREVO_API_KEY as string,
    },
    body: JSON.stringify({
      to: [{ email: to }],
      sender: {
        email: "no-reply@fintrack-in.vercel.app",
        name: "Fintrack",
      },
      replyTo: { email: "cmgohil07@gmail.com", name: "Fintrack" },
      subject,
      htmlContent,
    }),
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export default sendEmail;
