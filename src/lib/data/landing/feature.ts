import { Brain, Clock, FileText, FileUp, Layers, Mail, PenTool, RefreshCw, Repeat, Search, Send, Target, TrendingUp } from "lucide-react";

export const steps = [
    {
        icon: FileUp,
        step: "01",
        title: "Upload Your Resume",
        description: "Simply upload your PDF resume. Our AI instantly parses and extracts all your skills, experience, and qualifications.",
        color: "primary",
    },
    {
        icon: Brain,
        step: "02",
        title: "AI Builds Your Profile",
        description: "Our intelligent system creates a comprehensive profile, understanding your expertise, career goals, and ideal job preferences.",
        color: "secondary",
    },
    {
        icon: Search,
        step: "03",
        title: "Get Matched Jobs",
        description: "Access curated jobs from LinkedIn, Remotive, Jobble, and more—all ranked by AI match score based on your profile.",
        color: "accent",
    },
    {
        icon: Send,
        step: "04",
        title: "Apply Instantly",
        description: "Generate personalized cover letters and apply with one click. Our AI drafts professional applications tailored to each role.",
        color: "primary",
    },
];

export const getColorClasses = (color: string) => {
    switch (color) {
        case "primary":
            return {
                bg: "bg-pink-500/10",
                border: "border-pink-500/30",
                text: "text-pink-500",
                glow: "shadow-pink-500/20",
            };
        case "secondary":
            return {
                bg: "bg-teal-500/10",
                border: "border-teal-500/30",
                text: "text-teal-500",
                glow: "shadow-teal-500/20",
            };
        case "accent":
            return {
                bg: "bg-violet-500/10",
                border: "border-violet-500/30",
                text: "text-violet-500",
                glow: "shadow-violet-500/20",
            };
        default:
            return {
                bg: "bg-primary/10",
                border: "border-primary/30",
                text: "text-primary",
                glow: "shadow-primary/20",
            };
    }
};

export const features = [
    {
        icon: FileText,
        title: "Smart Resume Parsing",
        description: "Upload your PDF and our AI extracts skills, experience, education, and achievements automatically. Your profile is ready in seconds.",
        gradient: "from-pink-500 to-pink-400",
    },
    {
        icon: Layers,
        title: "Unified Job Aggregation",
        description: "We fetch jobs from LinkedIn, Remotive, Jobble, and more—converting them into one standardized format for easy browsing.",
        gradient: "from-cyan-500 to-cyan-400",
    },
    {
        icon: Target,
        title: "AI Match Scoring",
        description: "Every job gets a match score (0-100) using vector embeddings. See your Top Matches, Recommended, and New Jobs instantly.",
        gradient: "from-purple-500 to-purple-400",
    },
    {
        icon: PenTool,
        title: "AI Cover Letters",
        description: "Generate personalized, ATS-optimized cover letters for any job in one click. Uses your resume data and job requirements.",
        gradient: "from-brand-hover to-brand",
    },
    {
        icon: Mail,
        title: "Email Automation",
        description: "Send applications directly through our platform. AI drafts the email and attaches your cover letter—apply in seconds.",
        gradient: "from-emerald-500 to-emerald-400",
    },
    {
        icon: RefreshCw,
        title: "Always Fresh Data",
        description: "Cron jobs run every 6 hours to fetch new jobs, update listings, and remove expired postings. Your feed is always accurate.",
        gradient: "from-violet-500 to-blue-400",
    },
];


export const benefits = [
    {
        icon: Clock,
        title: "Save 10+ Hours Weekly",
        description: "Stop manually searching and applying. Our AI handles the repetitive work while you focus on preparing for interviews.",
        stat: "10+ hrs",
        statLabel: "saved weekly",
    },
    {
        icon: TrendingUp,
        title: "3x More Interviews",
        description: "Users report getting significantly more interview callbacks thanks to AI-optimized applications and better job matching.",
        stat: "3x",
        statLabel: "more interviews",
    },
    {
        icon: Target,
        title: "Apply to Right Roles",
        description: "AI match scores ensure you're applying to jobs where you have the highest chance of success. No more wasted applications.",
        stat: "98%",
        statLabel: "match accuracy",
    },
    {
        icon: Repeat,
        title: "Fully Automated",
        description: "From job discovery to application—everything runs on autopilot. New jobs appear daily, matched to your profile.",
        stat: "24/7",
        statLabel: "automation",
    },
];