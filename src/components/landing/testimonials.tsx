import { testimonialsData } from "@/lib/data/landing/testimonialsData"
import Image from "next/image"

const Testimonials = () => {
    return (
        <div className="w-[90%] md:w-[80%] lg:w-[80%] mx-auto">
            <h2 className="text-primary text-4xl font-bold text-center">
                50,000+ job seekers are using
                JobFound
            </h2>

            <div className="mt-12 flex flex-wrap gap-4 mx-auto justify-center">
                {
                    testimonialsData.map((user, i) => {
                        return <div key={i} className="py-4 px-6 bg-card sm:w-[40%] md:w-[30%] lg:w-[22%] border-card shadow-card rounded-card">
                            <div className="flex items-center">
                                <Image src={user.avatar} alt="" width={5} height={5} className="inline-block size-8 rounded-full ring-2 ring-brand" />
                                <div className="flex flex-col ml-3" >
                                    <p className="font-semibold text-primary">{user.name}</p>
                                    <p className="text-secondary text-xs">{user.role}</p>
                                </div>
                            </div>
                            <h2 className="text-tertiary mt-2">
                                {user.quote}
                            </h2>
                            <p className="text-secondary text-xs mt-6">
                                {user.date}
                            </p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Testimonials