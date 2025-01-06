import { config } from "@/config/config.js";
import resend from "@/config/resend.js";

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

const getFromEmail = () =>
  config.NODE_ENV === "development" ? "onboarding@resend.dev" : "T";

const getToEmail = (to: string) =>
  config.NODE_ENV === "development" ? "delivered@resend.dev" : to;

export const sendMail = async ({ to, subject, text, html }: Params) =>
  await resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
  });
