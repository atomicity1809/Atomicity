"use server";

import { sendMail } from "@/lib/mail";

export async function sendConfMail({ user, event, confirmationNumber }: { user: any; event: any; confirmationNumber: string }) {
    const userMail = user?.emailAddresses[0]?.emailAddress || "default@example.com";
    const userName = user?.fullName || "Default Name";
    const eventTitle = event?.title || "Default Event Title";

    // HTML content for the email
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    color: #333;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 10px 0;
                    background-color: #6c63ff;
                    color: #fff;
                    border-radius: 8px 8px 0 0;
                }
                .header img {
                    width: 150px;
                    height: auto;
                }
                .content {
                    padding: 20px;
                }
                .ticket {
                    padding: 20px;
                    background-color: #f4f4f4;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    margin-bottom: 20px;
                }
                .ticket h2 {
                    margin: 0 0 10px;
                    color: #333;
                }
                .ticket p {
                    margin: 0 0 10px;
                    color: #555;
                }
                .footer {
                    text-align: center;
                    padding: 10px;
                    font-size: 12px;
                    color: #777;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://drive.google.com/file/d/1-GyatYsXUNwT9XcGSqXSg57cnWOqicSC/view?usp=sharing" alt="Atomicity Logo">
                </div>
                <div class="content">
                    <div class="ticket">
                        <h2>${eventTitle}</h2>
                        <p>Dear ${userName},</p>
                        <p>Thank you for registering for the event!</p>
                        <p>Your registration has been successfully confirmed. Here are the details:</p>
                        <p><strong>Event:</strong> ${eventTitle}</p>
                        <p><strong>Confirmation Number:</strong> ${confirmationNumber}</p>
                        <p>We look forward to seeing you at the event!</p>
                        <p>Best regards,</p>
                        <p>© 2024-25 Atomicity Events</p>
                    </div>
                </div>
                <div class="footer">
                    <p>If you have any questions, please contact us at atomicity1809@gmail.com.</p>
                </div>
            </div>
        </body>
        </html>
    `;

    await sendMail({
        to: userMail,
        name: userName,
        subject: `Successful registration`,
        body: htmlContent, // Pass HTML content here
    });
}
