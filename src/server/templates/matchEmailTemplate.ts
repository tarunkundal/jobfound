import { MatchedJobInterface } from "@/types/jobs";

export function matchEmailTemplate(matched: MatchedJobInterface[]) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 20px;">

        <h2 style="color: #2563eb;">🔥 Your AI-Matched Jobs</h2>
        <p style="font-size: 15px; color: #444;">Here are your top opportunities for today based on your resume.</p>

        ${matched
            .map(
                (m) => `
            <div style="
                border: 1px solid #eee;
                border-radius: 8px;
                padding: 16px;
                margin: 15px 0;
                background: #fafafa;
            ">
                <h3 style="margin: 0; color:#111;">${m.title}</h3>
                <p style="margin: 5px 0 10px; color: #555; font-size: 15px;">
                    <strong>${m.company}</strong> — ${m.location}
                </p>

                <p style="font-size: 14px;">
                    ⭐ <strong>Match Score:</strong> ${(m.match_score * 100).toFixed(1)}%
                </p>

                <a href="${m.url}" 
                    style="
                        display: inline-block;
                        margin: 10px 0;
                        padding: 10px 14px;
                        background: #2563eb;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 6px;
                        font-size: 14px;
                    "
                    target="_blank"
                >
                    View Job
                </a>

                <h4 style="margin-top: 16px; color: #333;">✉️ Custom Cover Letter</h4>
                <div style="font-size: 14px; color: #444; line-height: 1.6;">
                    ${m.coverLetter?.replace(/\n/g, "<br/>")}
                </div>
                <p style="font-size: 12px; color: #888; margin-top: 4px;">Select and copy your cover letter above.</p>
            </div>
        `
            )
            .join("")}

        <p style="margin-top: 25px; font-size: 13px; color: #777;">
            You received this email because you enabled AI job alerts in JobFound.ai.
        </p>
    </div>
    `;
}
