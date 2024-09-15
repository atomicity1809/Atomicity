"use server";

import { compileConfTicket, sendMail } from "@/lib/mail";

export async function sendConfMail({ user, event, eventDate, eventTime, eventLocation, confirmationNumber }: { user: any; event: any; eventDate: string; eventTime: string; eventLocation: string ; confirmationNumber: string }) {
    const userMail = user?.emailAddresses[0]?.emailAddress || "default@example.com";
    const userName = user?.fullName || "Default Name";
    const eventTitle = event?.title || "Default Event Title";

    // HTML content for the email
    

    await sendMail({
        to: userMail,
        name: userName,
        subject: `Successful registration for ${eventTitle}`,
        body: compileConfTicket(
            `${userName}`,
            `${eventTitle}`,
            `${confirmationNumber}`,
            `${eventDate}`,
            `${eventTime}`,
            `${eventLocation}`,
        ), // Pass HTML content here
    });
}
