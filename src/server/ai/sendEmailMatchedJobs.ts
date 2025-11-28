import { MatchedJobInterface } from "@/types/jobs";
import { log } from "console";
import nodemailer from 'nodemailer';
import { matchEmailTemplate } from '../templates/matchEmailTemplate';

export async function sendMatchEmail(email: string, matched: MatchedJobInterface[]) {
    const html = matchEmailTemplate(matched);

    try {
        // 1️⃣ Create Gmail transporter using App Password
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "jobfound.ai@gmail.com",
                pass: process.env.GMAIL_APP_PASSWORD!,
            },
        });

        // 2️⃣ Send email
        const info = await transporter.sendMail({
            from: "JobFound AI <jobfound.ai@gmail.com>",
            to: email,
            subject: "Your Matched Jobs + Custom Cover Letters",
            html,
        });

        log("Email sent successfully:", info);

        return info;
    } catch (error) {
        log("Error sending matched jobs email:", error);
        throw error;
    }
}
