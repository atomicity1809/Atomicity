import nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import { confTicket } from './template/confTicket';
import { confTicketNew } from './template/confTicketNew';

export async function sendMail({
    to,
    name,
    subject,
    body,
}: {
    to: string;
    name: string;
    subject: string;
    body: string; // This will be HTML content
}) {
    const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;
    
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD,
        },
    });

    try {
        const testResult = await transport.verify();
        console.log("SMTP Server is ready:", testResult);
    } catch (error) {
        console.error("Error verifying SMTP server:", error);
        return;
    }

    try {
        const sendResult = await transport.sendMail({
            from: SMTP_EMAIL,
            to,
            subject,
            html: body, // Use HTML content for the email body
        });
        console.log("Email sent:", sendResult);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

export function compileConfTicket(user_name:string, event_title:string, confirmation_number:string, event_date:string, event_time:string, event_location:string ,event_coverimg:string, event_organiser:string, current_date:string ) {
    const template=handlebars.compile(confTicketNew);
    const htmlBody=template({
        user_name:user_name,
        event_title:event_title,
        confirmation_number:confirmation_number,
        event_date:event_date,
        event_time:event_time,
        event_location:event_location,
        event_coverimg:event_coverimg,
        event_organiser:event_organiser,
        current_date:current_date,
    })
    return htmlBody;
}