
import { generateCoverLetter } from './generateCoverLetter';
import { matchJobsByAi } from './matchJobsByAi';
import { sendMatchEmail } from './sendEmailMatchedJobs';

interface MatchJobsByAiProps {
    id: string
    email: string
}

export async function sendMatchingJobsEmailCoverletterWithAiScore(user: MatchJobsByAiProps) {
    const userId = user.id
    const userEmail = user.email
    const highPriorityJobs = await matchJobsByAi(user)

    if (highPriorityJobs.length) {
        // generate cover letters for each high priority job
        await Promise.all(highPriorityJobs.map(async (job) => {
            // generate cover letter
            const coverLetter = await generateCoverLetter({ userId, job });
            // attach cover letter to job object
            job.coverLetter = coverLetter;
        }));
        // send email to user with high priority jobs
        const response = await sendMatchEmail(userEmail, highPriorityJobs);
        console.log('response is email', response);
        return response.accepted
    }

}
