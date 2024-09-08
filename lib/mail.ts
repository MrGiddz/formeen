import Handlebars from "handlebars";
import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_GMAIL_PASS, SMTP_USER, SMTP_PASS, SMTP_EMAIL, NODE_ENV } = process.env;

const transport =
  NODE_ENV !== "test"
    ? nodemailer.createTransport({
        service: "gmail",
        host: SMTP_HOST,
        auth: {
          user: SMTP_EMAIL,
          pass: SMTP_GMAIL_PASS,
        },
      })
    : nodemailer.createTransport({
        pool: true,
        host: SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

type MailResponse = {
  success?: string;
  error?: string;
};

export const sendTwoFactorTokenEmail = async (to: string, token: string) => {
  return await transport
    .sendMail({
      from: SMTP_EMAIL,
      to,
      subject: "Two factor authentication",
      html: `<p>Your 2FA code ${token}</p>`,
    })
    .then((response) => {
      console.log({ response });
      return { success: "2FA code sent!" };
    })
    .catch((error) => {
      throw new Error(
        "There was an error sending your 2FA code, please try again or contact support."
      );
    });
};

export const sendPasswordResetEmail = async (
  to: string,
  token: string
): Promise<MailResponse> => {
  const resetLink = `${process.env.NEXT_PUBLIC_DOMAINNAME}/auth/new-password?token=${token}`;
  return await transport
    .sendMail({
      from: SMTP_EMAIL,
      to,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    })
    .then((response) => {
      console.log({ response });
      return { success: "Password reset link sent!" };
    })
    .catch((error) => {
      throw new Error(
        "There was an error sending your reset email, please try again or contact support."
      );
    });
};

export const sendVerficationEmail = async (to: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_DOMAINNAME}/auth/new-verification?token=${token}`;
  console.log("sending mail to: ", to);
  return await transport
    .sendMail({
      from: SMTP_EMAIL,
      to,
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    })
    .then((response) => {
      console.log({ response });
      return { success: "Verification link link sent!" };
    })
    .catch((error) => {
      console.log({error})
      throw new Error("There was an error sending your verification email");
    });
};
