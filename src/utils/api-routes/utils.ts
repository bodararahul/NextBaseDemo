// import sendgrid from '@sendgrid/mail';
import { Resend } from 'resend';
import { errors } from '../errors';

type EmailOptions = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

export async function sendEmail(options: EmailOptions) {
  try {
    // sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    const resend = new Resend(process.env.RESEND_API_KEY);
    // return sendgrid.send(options);
    return resend.emails.send(options);
  } catch (error) {
    errors.add(error);
  }
}
