"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabseClient";
import useCustomToast from "@/app/hooks/useCustomToast";
import { Input } from "@/theme/ui/components/input";
import { Button } from "@/theme/ui/components/button";
import { ROUTES } from "@/constants/routes";

const schema = {
    password: (password: string) => {
        return password.length >= 7 && password.length <= 32;
    }
};

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();
    const toast = useCustomToast();

    useEffect(() => {
        // Supabase automatically sets the session when user lands here with reset token
        const handleSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                toast({
                    title: "Invalid or expired link",
                    description: "Please request a new password reset.",
                    status: "error",
                });
            }
        };
        handleSession();
    }, [supabase, toast]);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!schema.password(password)) {
            toast({
                title: "Invalid password",
                description: "Password must be between 7 and 32 characters.",
                status: "error",
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "Passwords don’t match",
                description: "Please re-enter your passwords.",
                status: "error",
            });
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.updateUser({ password });
        setLoading(false);

        if (error) {
            toast({
                title: "Failed to reset password",
                description: error.message,
                status: "error",
            });
            return;
        }

        toast({
            title: "Password updated!",
            description: "You can now log in with your new password.",
            status: "success",
        });

        router.push(ROUTES.AUTH.LOGIN);
    };

    return (
        <div className="flex flex-col items-center justify-center m-auto shadow-card border-card rounded-card bg-card p-4 ">
            <h1 className="text-2xl font-semibold mb-6 text-primary">Reset Password</h1>
            <form onSubmit={handleReset} className="flex flex-col gap-3 w-80">
                <Input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    disabled={loading}
                    variant="default"
                    isLoading={loading}
                >
                    Update Password
                </Button>
            </form>
        </div>
    );
}

export default ResetPasswordPage;