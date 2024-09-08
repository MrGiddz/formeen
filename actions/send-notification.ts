import axios from "axios";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

class SendingError extends Error {
  constructor() {
    super("An error occured while sending message");

    Object.setPrototypeOf(this, SendingError.prototype);
  }
}

class BadMethodError extends Error {
  constructor() {
    super("Incorrect or invalid fields detected");

    Object.setPrototypeOf(this, BadMethodError.prototype);
  }
}

export const sendSMS = async (message: string, to: string) => {
  var payload = {
    to,
    from: "Ventech457" || "RCCG Ceaseless Joy Makogi",
    sms: message,
    type: "plain",
    api_key: "TLts1YBtlYishbeporWsgJj7LpXkWc6xkF9bHTYuLrIgi2rURNtzYCtPmiVqze",
    channel: "generic",
  };

  console.log("sending sms");
  try {
    const { data } = await axios.post(
      "https://api.ng.termii.com/api/sms/send",
      payload
    );

    console.log({ data });

    if (data) {
      return data;
    }
  } catch (error) {
    throw new SendingError();
  }
};

export async function sendmail({
  to,
  fromName,
  subject,
  html,
  text,
}: {
  to: string;
  fromName: string;
  subject: string;
  html: string;
  text: string;
}) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAINNAME}/api/mail`,
      {
        to,
        subject,
        text,
        html,
        fromName,
      }
    );

    console.log("Email sent successfully", data);

    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new SendingError();
  }
}
