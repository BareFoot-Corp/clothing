import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email provider
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        auth: {
            user: 'beta.tester14369@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
        },
        logger: true,
        debug: true
    });

    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${token}`;

    const mailOptions = {
        from: 'beta.tester14369@example.com',
        to: email,
        subject: 'Verify Your Email Address',
        html: `
        <h1>Email Verification</h1>
        <p>Please click the link below to verify your email:</p>
        <a href="${verificationLink}" target="_blank">${verificationLink}</a>
        `,
    };

    await transporter.sendMail(mailOptions);
}