import { Switch } from "@/theme/ui/components/switch"

const EmailSettings = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-brand-foreground"> Marketing Emails</p>
                    <p className="text-secondary text-sm">Enable/disable all marketing emails</p>
                </div>
                <Switch
                // checked={true}
                // onCheckedChange={() => { }}
                />
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-brand-foreground">Weekly Job Application Summary</p>
                    <p className="text-secondary text-sm">Receive a weekly summary of your job applications</p>
                </div>
                <Switch
                // checked={true}
                // onCheckedChange={() => { }}
                />
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-brand-foreground">Job Alert Frequency</p>
                    <p className="text-secondary text-sm">Get notified about new jobs daily</p>
                </div>
                <Switch
                // checked={true}
                // onCheckedChange={() => { }}
                />
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-brand-foreground">User profile improvement reminders</p>
                    <p className="text-secondary text-sm">Get suggestions to enhance your profile for better job matches</p>
                </div>
                <Switch
                // checked={true}
                // onCheckedChange={() => { }}
                />
            </div>
        </div>
    )
}

export default EmailSettings