import Image from "next/image";
import { motion } from "framer-motion";

const companies = [
    { name: "Google", logo: "/t-mobile.svg" },
    { name: "Amazon", logo: "/ibm.svg" },
    { name: "Meta", logo: "/logitech.svg" },
    { name: "Netflix", logo: "/fortinet.svg" },
    { name: "Airbnb", logo: "/spotify.svg" },
    { name: "Figma", logo: "/netflix.svg" },
];

const AutoSliding = () => {
    return (
        <div className="relative w-[90%] md:w-[80%] lg:w-[60%] overflow-hidden py-8 my-12 mx-auto" >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-800 to-transparent z-10 rounded-3xl" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-800 to-transparent z-10 rounded-3xl" />

            <motion.div
                className="flex w-max space-x-16"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: 25, // slower = smoother
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {[...companies, ...companies].map((c, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <Image
                            src={c.logo}
                            alt={c.name}
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                        <span className="text-gray-600 font-medium">{c.name}</span>
                    </div>
                ))}
            </motion.div>
        </div >
    )
}

export default AutoSliding