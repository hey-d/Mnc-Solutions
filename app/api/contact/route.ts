import nodemailer from "nodemailer";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, company, message, service, plan } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "-"}`,
    `Service: ${service}`,
    `Plan: ${plan}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Project Inquiry - ${service}`,
      text: mailBody,
    });
    return NextResponse.json({ success: true });
  } catch (error: Error | any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
