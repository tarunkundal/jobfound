"use client"

import { ROUTES } from "@/constants/routes";
import useCustomToast from "@/hooks/useCustomToast";
import { createClient } from "@/lib/supabseClient";
import { Button } from "@/theme/ui/components/button";
import { Input } from "@/theme/ui/components/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    const router = useRouter();


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
            redirectTo: `${window.location.origin}${ROUTES.AUTH.RESET_PASSWORD}`,
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
        router.push(ROUTES.AUTH.LOGIN)
        setEmail("");

    };

    return (
        <div className="w-[80%] my-[10%] flex flex-col gap-4">
            <h1 className="text-2xl font-semibold mb-4 text-brand-foreground text-center">Forgot Password</h1>
            <form onSubmit={handleReset} className="flex flex-col gap-3 w-full items-center">
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
                    className="w-full"
                >
                    Send Reset Link
                </Button>

            </form>
        </div>
    );
}

export default ForgotPasswordPage;