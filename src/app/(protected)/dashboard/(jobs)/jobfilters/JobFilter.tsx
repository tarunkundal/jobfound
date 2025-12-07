import { Icon } from "@/theme/ui/components/icon";
import { Separator } from "@/theme/ui/components/separator";
import { FileText, Rocket, Search, Send } from "lucide-react";
import HeaderToDisplayName from "./HeaderToDisplayName";

export const features = [
    {
        icon: Search,
        color: "text-teal-400 bg-teal-400/10",
        title: "AI-Matched Jobs",
        description:
            "We compare each job with your resume and rank it using AI.",
    },
    {
        icon: Rocket,
        color: "text-pink-400 bg-pink-400/10",
        title: "80%+ Match Priority",
        description:
            "High-match jobs automatically jump to the top of your feed.",
    },
    {
        icon: FileText,
        color: "text-violet-400 bg-violet-400/10",
        title: "Auto-Generated Cover Letters",
        description:
            "Fully personalized cover letters crafted for every job you open.",
    },
    {
        icon: Send,
        color: "text-lime-400 bg-lime-400/10",
        title: "Automatic Job Alerts",
        description:
            "High-match roles with auto-generated cover letters delivered to your inbox.",
    },
];


const JobFilter = () => {
    return (
        <div className="flex flex-col gap-4 mt-2 mb-4 bg-primary rounded-card p-4 w-[95%] mx-auto shadow-card border-card">
            <HeaderToDisplayName />
            <div className="flex flex-col gap-2">
                <p className="text-primary">Your personalized job feed is ready.<br></br>
                    We analyze thousands of roles and show only the ones that match your resume — powered by <span className="text-brand font-semibold">AI scoring</span>.</p>
            </div>
            <Separator />
            <div className="p-2 flex gap-2 flex-wrap justify-around">
                {features.map((item, i) => (
                    <div key={i} className={`flex gap-2 p-1 items-center ${item.color} rounded-md`}>
                        <Icon
                            icon={item.icon}
                            className={`size-5`}
                        />
                        <p className={`font-medium`}>{item.title}</p>
                        {/* <p className="text-primary">{item.description}</p> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JobFilter