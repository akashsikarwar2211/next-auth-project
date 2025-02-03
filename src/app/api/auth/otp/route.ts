import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const otpStore = new Map<string, string>(); // Store OTP temporarily

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    otpStore.set(email, otp);

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    });

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error sending OTP' }, { status: 500 });
  }
}
