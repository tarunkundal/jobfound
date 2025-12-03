"use client"
import { useUser } from "@/app/(auth)/_hooks/useUser";
import { FormField } from "@/components/shared/FormField";
import useCustomToast from "@/hooks/useCustomToast";
import { useLocationOptions } from "@/hooks/useLocationOptions";
import { countries } from "@/lib/data/onboarding/countriesData";
import { jobTitles } from "@/lib/data/onboarding/jobTitles";
import { resumeSchema } from "@/schema/resumeParser.schema";
import { userFormSchema } from "@/schema/user.schema";
import { Button } from "@/theme/ui/components/button";
import { Input } from "@/theme/ui/components/input";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-full lg:w-[48%] md:w-[48%]">{children}</div>
);

interface OnBoardingProps {
    parsedData?: z.infer<typeof resumeSchema>
    parsingResume?: boolean
}

export type UserFormValues = z.infer<typeof userFormSchema>;
const OnboardingForm = ({ parsedData, parsingResume }: OnBoardingProps) => {
    const utils = trpc.useUtils();
    const toast = useCustomToast()
    const { user } = useUser()

    const { data: profileData, isLoading: userProfileIsLoading } = trpc.userProfile.getUserProfileData.useQuery(undefined, {
        staleTime: Infinity,        // never becomes stale
        gcTime: Infinity,           // never garbage collect
    })
    const updateUserOnboarded = trpc.user.updateUserOnboarded.useMutation({
        onSuccess: () => { utils.user.getUser.invalidate() }
    });
    const updateUserProfile = trpc.userProfile.updateUserProfile.useMutation({
        onSuccess: (updatedData) => {
            toast({
                title: 'Profile Updated',
                description: 'Your profile has been successfully updated.',
                status: 'success',
            });
            form.reset(prev => ({
                ...prev,
                ...updatedData,
            }));
            // Mark user as onboarded first time when they submit the form.
            updateUserOnboarded.mutate({ onboarded: true });
            utils.userProfile.getUserProfileData.invalidate()
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.message || 'An error occurred while updating your profile.',
                status: 'error',
            })
        }
    })
    const form = useForm<UserFormValues>({
        defaultValues: { ...profileData, ...parsedData } as UserFormValues,
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: zodResolver(userFormSchema) as any
    });

    // When API data loads
    useEffect(() => {
        if (profileData) {
            form.reset(prev => ({
                ...prev,
                ...profileData,
                ...parsedData,
            }));
        }
    }, [profileData, parsedData]);

    // When resume parser updates
    useEffect(() => {
        if (parsedData) {
            form.reset(prev => ({ ...prev, ...parsedData }));
        }
    }, [parsedData]);

    const { control, setValue } = form;
    const { stateOptions, cityOptions } = useLocationOptions(control, setValue);
    console.log('user', user);

    const onSubmit = async (data: UserFormValues) => {
        await updateUserProfile.mutateAsync(data);
    }

    return (
        <div className="w-[90%] bg-primary my-[2%] mx-auto border-card rounded-card relative">
            {/* Loading Overlay */}
            {(parsingResume || userProfileIsLoading) && (
                <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-xs rounded-card">
                    <p className="text-xl text-primary font-semibold animate-pulse">
                        {parsingResume ? 'Autofilling your resume...' : 'Loading your profile...'}
                    </p>
                </div>
            )}
            <div className={`mx-auto px-6 py-6 flex flex-col gap-6 ${(parsingResume || userProfileIsLoading) ? "pointer-events-none select-none" : ""
                }`}>
                <div>
                    <h2 className="text-brand-foreground text-2xl font-semibold">Set up Your Profile</h2>
                    <p className="text-secondary">This is the last time you'll need to enter this information! Our AI agent will use it to apply to hundreds of jobs for you!</p>
                </div>
                <div className="flex flex-col gap-1 w-[90%] md:w-[50%] lg:w-[50%]">
                    <label className="text-sm font-medium text-brand-foreground">Email</label>
                    <Input type="text" value={user?.email || ''} disabled />
                    <p className="text-xs font-medium text-tertiary mt-0.5">Email address cannot be changed.</p>
                </div>
                <FormProvider {...form}>
                    <h2 className="text-2xl text-brand-foreground font-bold">Required Information</h2>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-6 md:flex-row lg:flex-row md:flex-wrap"
                    >
                        <FormRow>
                            <FormField name="fullName" label="Full Name" type="text" required placeholder="eg Joe Dee" />
                        </FormRow>
                        <FormRow>
                            <FormField
                                name="experienceYears"
                                type="select"
                                label="Experience Years"
                                placeholder="Select Experience"
                                required
                                options={[
                                    { label: "Internship", value: "internship" },
                                    { label: "0-1 years", value: "0-1" },
                                    { label: "1-3 years", value: "1-3" },
                                    { label: "3-5 years", value: "3-5" },
                                    { label: "5+ years", value: "5+" },
                                ]}
                            />
                        </FormRow>
                        <FormRow>
                            <FormField
                                name="experienceLevel"
                                type="select"
                                label="Experience Level"
                                placeholder="Select Experience level"
                                required
                                options={[
                                    { label: "Entry", value: "entry" },
                                    { label: "Mid", value: "mid" },
                                    { label: "Senior", value: "senior" },
                                    { label: "Executive", value: "executive" },
                                ]}
                            />
                        </FormRow>
                        <FormRow>
                            <FormField
                                name="jobTitles"
                                type="multiSelect"
                                label="Desired Job Titles"
                                maxSelections={3}
                                options={jobTitles}
                                required
                                search
                                helperText="You can select upto 3"
                            />
                        </FormRow>
                        <FormRow>
                            <FormField
                                name="workPreference"
                                type="multiSelect"
                                label="Work Preferences"
                                placeholder="Select Experience level"
                                required
                                options={[
                                    { label: "Remote", value: "Remote" },
                                    { label: "Hybrid", value: "Hybrid" },
                                    { label: "On Site", value: "On-site" },
                                ]}
                            />
                        </FormRow>
                        <FormRow>
                            <FormField name="phoneNumber" label="Phone Number" type="tel" required placeholder="+91 8908475432" />
                        </FormRow>
                        <FormRow>
                            <FormField
                                name="residenceCountry"
                                type="select"
                                label="Country of Residence"
                                placeholder="Select Country"
                                options={countries}
                                required
                                search
                                helperText="Select the country where you currently live"
                            />
                        </FormRow>
                        <FormRow>
                            <FormField
                                name="state"
                                type="select"
                                label="Please select State"
                                placeholder="Select State"
                                options={stateOptions}
                                required
                                search
                            />
                        </FormRow>
                        <FormRow>
                            <FormField
                                name="city"
                                type="select"
                                label="Please select City"
                                placeholder="Select City"
                                options={cityOptions}
                                required
                                search
                            />
                        </FormRow>
                        <FormRow>
                            <FormField
                                name="skills"
                                type="commaSeparatedInput"
                                label="Skills"
                                placeholder="e.g., React.js, Node, Python"
                                helperText="List your key skills separated by commas."
                            />
                        </FormRow>

                        <div className="w-full">
                            <h2 className="text-brand-foreground text-2xl font-semibold">Additional Information</h2>
                            <p className="text-secondary">Information to help us apply to jobs for you. Encouraged, but not required for account creation.</p>
                        </div>
                        <FormRow>
                            <FormField name="currentEmployer" type="text" label="Current Employer" placeholder="Enter Current Employer Name"
                                helperText="Your current employer will be excluded from Full Auto Apply to prevent conflicts"
                            />
                        </FormRow>
                        <FormRow>
                            <FormField name="preferredJobLocation" label="Preferred Job Location" type="text" placeholder="eg USA" helperText="Your Preferred location for work." />
                        </FormRow>
                        <FormRow>
                            <FormField name="minimumSalary" type="text" label="Minimum Salary" placeholder="$150k per year"
                                helperText="Minimum salary is optional. Setting it to $0 will match with all jobs."
                            />
                        </FormRow>
                        <FormRow>
                            <FormField name="linkedinUrl" type="text" label="LinkedIn URL" placeholder="https://linkedin.com/in/your-profile"
                                helperText="Your LinkedIn profile URL. Required for Full Auto Apply to be enabled.
                                            We only require a LinkedIn URL because a lot of companies require it to submit an application."
                            />
                        </FormRow>
                        <FormRow>
                            <FormField
                                name="educationLevel"
                                type="select"
                                label="Education Level"
                                placeholder="Select Education"
                                options={[
                                    { label: "High School", value: "highSchool" },
                                    { label: "Associates", value: "associates" },
                                    { label: "Bachelors", value: "bachelors" },
                                    { label: "Masters", value: "masters" },
                                    { label: "PHD", value: "phd" },
                                ]}
                            />
                        </FormRow>

                        <FormRow>
                            <FormField
                                name="gender"
                                type="radio"
                                label="Gender"
                                options={[
                                    { label: "Male", value: "male" },
                                    { label: "Female", value: "female" },
                                ]}
                            />
                        </FormRow>
                        <FormRow>
                            <FormField name="additionalContext" type="textarea" label="Additional Context"
                                placeholder="Share any additional information that might help with job matches"
                                helperText="We suggest providing the equivalent of a 'cover letter' here. The AI Agent will use this information to improve your job matches, and to answer questions in job applications."
                            />
                        </FormRow>
                        <FormRow>
                            <FormField
                                name="terms"
                                type="checkbox"
                                placeholder="I agree to Terms and Conditions"
                            />
                        </FormRow>
                        <Button type="submit" className="w-full" disabled={updateUserProfile.isPending} isLoading={updateUserProfile.isPending}>Submit</Button>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default OnboardingForm