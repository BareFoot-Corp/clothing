import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE, // Use your email provider
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        logger: true,
        debug: true
    });

    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
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