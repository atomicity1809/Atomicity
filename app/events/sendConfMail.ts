"use server";

import { compileConfTicket, sendMail } from "@/lib/mail";

export async function sendConfMail({
  user,
  event,
  eventDate,
  eventTime,
  eventLocation,
  confirmationNumber,
  eventImg,
  eventOrgName,
  current_date,
  userID
}: {
  user: any;
  event: any;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  confirmationNumber: string;
  eventImg: string;
  eventOrgName: string;
  current_date: string;
  userID: string;
}) {
  const userMail =
    user?.emailAddresses[0]?.emailAddress || "default@example.com";
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
      `${eventImg}`,
      `${eventOrgName}`,
      `${current_date}`,
      `${userID}`,      
    ), // Pass HTML content here
  });
}
