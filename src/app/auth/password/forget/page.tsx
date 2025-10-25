"use client"

import { useState } from "react";
import { createClient } from "@/lib/supabseClient";
import useCustomToast from "@/app/hooks/useCustomToast";
import { Button } from "@/theme/ui/components/button";
import { Input } from "@/theme/ui/components/input";

const schema = {
    email: (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const supabase = createClient();
    const toast = useCustomToast();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!schema.email(email)) {
            toast({
                title: "Invalid email",
                description: "Please enter a valid email address.",
                status: "error",
            });
            return;
        }
        setLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/password/reset`,
        });

        setLoading(false);

        if (error) {
            toast({
                title: "Error sending reset email",
                description: error.message,
                status: "error",
            });
            return;
        }

        toast({
            title: "Email sent!",
            description: "Check your inbox for password reset link.",
            status: "success",
        });
        setEmail("");
    };

    return (
        <div className="flex flex-col items-center justify-center m-auto shadow-card border-card rounded-card bg-card p-4 ">
            <h1 className="text-2xl font-semibold mb-4 text-primary">Forgot Password</h1>
            <form onSubmit={handleReset} className="flex flex-col gap-3 w-80">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    disabled={loading}
                    variant="default"
                    isLoading={loading}
                >
                    Send Reset Link
                </Button>

            </form>
        </div>
    );
}

export default ForgotPasswordPage;