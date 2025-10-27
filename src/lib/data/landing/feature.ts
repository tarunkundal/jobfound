import { Loader2Icon, MousePointerClickIcon, Search, Send, SparklesIcon, SquarePenIcon, TrendingUp, ZapIcon } from "lucide-react";

export const featureData = [
    {
        step: "Step 1",
        title: "Choose a Resume",
        description:
            "Upload your resume so our AI Agent can start to find relevant jobs, and auto apply if enabled!",
        icon: SquarePenIcon,
        iconColor: 'blue-200'
    },
    {
        step: "Step 2",
        title: "Set Your Job Preferences",
        description:
            "Define your ideal job titles, relevant skills, salary range, and additional information to ensure our AI finds the best job matches for you.",
        icon: Search,
    },
    {
        step: "Step 3",
        title: "AI Finds Job Matches and Can Apply Automatically",
        description:
            "Our AI will find hundreds of job matches for you and assign a relevance score. Select 'Simple Apply' and our AI will auto apply on your behalf!",
        icon: Send,
    },
    {
        step: "Step 4",
        title: "Track Your Applications",
        description:
            "Monitor the status of your applications and see what jobs we've applied to for you.",
        icon: TrendingUp,
    },
]

export const featureData2 = [
    {
        title: "AI Job Scoring",
        description:
            "Don't fully trust AI to apply for you? Have our AI Agent find and apply a score to the jobs you match with. Then you can manually apply for each job.",
        icon: Search,
    },
    {
        title: "Simple Apply",
        description:
            "Yup, we made up that term. You select the jobs and let the AI apply for you using your information and resume.",
        icon: MousePointerClickIcon,
    },
    {
        title: "Full AI Auto Apply",
        description:
            "Let us take the wheel and get interviews for you. We automatically apply to jobs that are over certain match. The score is based on how likely you are to get an interview.",
        icon: ZapIcon,
    }
]

export const infoData = [
    {
        title: "Intelligent Job Matching",
        description:
            "Our AI analyzes your profile and preferences to find the perfect job opportunities across multiple platforms.",
        icon: Search,
    },
    {
        title: "Let AI Apply",
        description: "Auto Apply to multiple positions simultaneously with automatically tailored resumes and cover letters. Or select the jobs for the AI to auto-apply to.",
        icon: Send,
    },
    {
        title: "Smart Progress Tracking",
        description: "Monitor your matched jobs and application status in a unified dashboard.",
        icon: Loader2Icon,
    },
    {
        title: "AI-Powered Optimization",
        description: "Get intelligent suggestions to improve your applications based on real-time market data and success patterns.",
        icon: SparklesIcon,
    }
]