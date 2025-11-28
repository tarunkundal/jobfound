import { ROUTES } from "@/constants/routes";
import { Button } from "@/theme/ui/components/button";
import Link from "next/link";

interface PageProps {
    params?: { [key: string]: string | string[] | undefined }; // For dynamic route segments
    searchParams?: { [key: string]: string | string[] | undefined }; // For URL query parameters
}

const CheckEmailPage = async ({ searchParams }: PageProps) => {
    return (
        <div className="text-primary flex flex-col items-center justify-center bg-body w-[80]% h-1/2 mx-auto my-auto p-4 rounded-md shadow-md gap-6 m-2 shadow-card">
            <h1 className="text-6xl">Check your email</h1>
            <p className="text-secondary text-2xl text-center">
                We sent a confirmation link to <b>{searchParams?.email}</b>. Please verify your account before logging in.
            </p>
            <Button variant="default" size="lg" className="mt-4">
                <Link href={ROUTES.AUTH.LOGIN} prefetch={true}>Go to Login</Link>
            </Button>
        </div>
    );
}

export default CheckEmailPage;