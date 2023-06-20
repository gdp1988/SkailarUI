import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export default async function handler(req: any, res: any) {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'authsmtp.securemail.pro',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: process.env.EMAIL_SUBJECT,
    html: `
      <div style="max-width: 500px; margin: 0 auto; padding: 16px;">
        <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.06); padding: 16px;">
          <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 16px;">Thank You for Registering to Skailar!</h1>
          <p style="margin-bottom: 16px;">Dear user,</p>
          <p style="margin-bottom: 16px;">We are delighted to have you as a new member of Skailar. Your registration is complete, and we
            look forward to providing you with a great experience on our platform.</p>
          <p style="margin-bottom: 16px;">If you have any questions or need assistance, please don't hesitate to reach out to us. You can
            contact us through <a href="">Discord</a> or <a href="">Email</a></p>
          <p style="margin-bottom: 16px;">Please note that the source code is not accessible directly from GitHub, but you can get access
            by contacting us through Discord.</p>
          <p style="margin-bottom: 16px;">Thank you once again for joining Skailar!</p>
          <p>Best regards,</p>
          <p>Your Skailar Team</p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
}
