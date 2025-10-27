"use client";
import { createClient } from "@/lib/supabseClient";
import { Button } from "@/theme/ui/components/button";
import { Spinner } from "@/theme/ui/components/spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Dashboard = () => {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setLoading(false);
        router.push("/auth/login");
    };
    return (<>
        <div className="text-primary">Dashboard Page</div>
        <Spinner />
        <Button variant='destructive' onClick={handleLogout} isLoading={loading}>Log Out</Button>
    </>
    )
}

export default Dashboard