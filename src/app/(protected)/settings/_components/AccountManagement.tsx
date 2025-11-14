import { Button } from "@/theme/ui/components/button"

const AccountManagement = () => {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <p className="text-xl font-semibold text-brand-foreground">Account Management</p>
                <p className="text-secondary text-sm">Manage your account security and data</p>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-brand-foreground"> Password & Security</p>
                    <p className="text-secondary text-sm">Update your password to keep your account secure.</p>
                </div>
                <Button variant={'secondary'}>Change Password</Button>
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-semibold text-destructive"> Danger Zone</p>
                <p className="text-secondary text-sm">Permanently delete your account and all associated data. This action cannot be undone.</p>
                <Button variant={'destructive'} className='w-sidebar'>Delete Account</Button>
            </div>
        </div>
    )
}

export default AccountManagement