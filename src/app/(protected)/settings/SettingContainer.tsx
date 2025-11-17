import { Button } from "@/theme/ui/components/button";
import { Icon } from "@/theme/ui/components/icon";
import { Separator } from "@/theme/ui/components/separator";
import { MailIcon, Monitor } from "lucide-react";
import AccountManagement from "./_components/AccountManagement";
import EmailSettings from "./_components/EmailSettings";

const SettingContainer = () => {
    return (
        <div className="w-[90%] bg-primary px-6 py-4 my-[2%] mx-auto border-card rounded-card">
            <div>
                <h2 className="text-brand-foreground font-semibold text-2xl">Settings</h2>
                <p className="text-secondary text-sm"> Manage your account preferences and notifications </p>
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h2 className="text-brand-foreground font-semibold text-sm flex gap-1 items-center">
                        <span><Icon icon={Monitor} className="w-4 h-4" /></span> Theme</h2>
                    <p className="text-secondary text-sm"> Manage your account preferences and notifications </p>
                </div>
                <Button>Switch Theme</Button>
            </div>
            <Separator className="my-6" />
            <EmailSettings />
            <Separator className="my-6" />
            <AccountManagement />
            <Separator className="my-6" />
            <div>
                <h2 className="text-brand-foreground font-semibold text-2xl">Need Help</h2>
                <p className="text-secondary text-sm flex items-center gap-1"> For support or any questions, please contact us at
                    <span>{<Icon icon={MailIcon} className="w-4 h-4" />}</span>
                    support@jobfound.ai
                </p>
            </div>
        </div>
    )
}

export default SettingContainer