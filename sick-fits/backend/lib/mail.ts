import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process?.env?.MAIL_HOST,
  port: process?.env?.MAIL_PORT,
  auth: {
    user: process?.env?.MAIL_USER,
    pass: process?.env?.MAIL_PASS,
  },
});

function makeANiceEmail(text: string): string {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Heelo There!</h2>
      <p>${text}</p>
      <p>😍</p>
    </div>
    `;
}
export interface Envelope {
  from: string;
  to?: string[] | null;
}
export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = await transport.sendMail({
    to,
    from: 'whitebearentitlement@gmail.com',
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your password Reset Token is here!
    
      <a href="${process?.env?.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
    `),
  });
  if (process?.env.MAIL_USER.includes('ethereal.email')) {
    console.log('Message sent!', getTestMessageUrl(info));
  }
}

export { sendPasswordResetEmail };
