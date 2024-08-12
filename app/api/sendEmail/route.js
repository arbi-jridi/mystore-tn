import nodemailer from 'nodemailer';

export async function POST(req) {
    const { to, from, subject, text, html } = await req.json();

    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // or your email provider's SMTP server
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // Your email password or app password
        },
    });

    // Email options
    const mailOptions = {
        from,
        to,
        subject,
        text,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }
}