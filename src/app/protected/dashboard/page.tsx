"use client";;
import { FormField } from "@/components/shared/FormField";
import { createClient } from "@/lib/supabseClient";
import { Button } from "@/theme/ui/components/button";
import { Input } from "@/theme/ui/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

// ✅ Define your Zod schema
export const schema = z.object({
    firstName: z.string().min(2, "First name is required and must be at least 2 characters."),
    lastName: z.string().min(2, "Last name is required and must be at least 2 characters."),

    role: z.string().min(1, "Please select a role"),

    email: z.string().email("Enter a valid email"),

    about: z.string().min(1, "Please enter something about yourself"),

    terms: z
        .boolean()
        .refine((val) => val === true, { message: "You must accept the terms" }),

    gender: z.enum(["male", "female"], {
        message: "Please select your gender",
    }),
});

const Dashboard = () => {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            about: "",
            role: "",
            terms: false,
            gender: undefined,
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: any) => console.log(data);

    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setLoading(false);
        router.push("/auth/login");
    };
    return (<>
        <div className="text-primary">Dashboard Page</div>
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <FormField name="firstName" label="First Name" />
                <FormField name="lastName" label="Last Name" />
                <FormField name="email" type="email" label="Email" />
                <FormField name="about" type="textarea" label="About You" />
                <FormField
                    name="role"
                    type="select"
                    label="Role"
                    options={[
                        { label: "Developer", value: "dev" },
                        { label: "Designer", value: "design" },
                    ]}
                />
                <FormField
                    name="gender"
                    type="radio"
                    label="Gender"
                    options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                    ]}
                />
                <FormField
                    name="terms"
                    type="checkbox"
                    placeholder="I agree to terms"
                />

                <button
                    type="submit"
                    className="rounded-md bg-brand text-brand-foreground px-4 py-2 font-semibold"
                >
                    Submit
                </button>
            </form>
        </FormProvider>
        <Input placeholder="hfdhfks" type="text" />
        <Button variant='destructive' onClick={handleLogout} isLoading={loading}>Log Out</Button>
    </>
    )
}

export default Dashboard