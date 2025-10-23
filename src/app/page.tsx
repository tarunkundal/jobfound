
'use client';;
import { Button } from "@/theme/ui/components/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Carousel from "./components/carousel";
import { trpc } from "@/utils/trpc";

const companies = [
  { name: "Google", logo: "/google.svg" },
  { name: "Amazon", logo: "/google.svg" },
  { name: "Meta", logo: "/google.svg" },
  { name: "Netflix", logo: "/google.svg" },
  { name: "Airbnb", logo: "/google.svg" },
  { name: "Figma", logo: "/globe.svg" },
];

const data = [
  {
    title: "SSO for secure access",
    description:
      "Enable Single Sign-On (SSO) to allow users to authenticate through your organization's identity provider, enhancing security and simplifying access management.",
    logo: "/logo2.png"
  },
  {
    title: "Customize and extend",
    description:
      "Tailor your apps to fit your unique needs. Vibe coding allows you to modify and enhance your creations effortlessly.",
    logo: "/logo2.png"
  },
  {
    title: "SOC 2 for enterprise",
    description: "Achieve SOC 2 compliance to ensure your applications meet stringent security and privacy standards, providing peace of mind for enterprise users.",
    logo: "/logo2.png"
  },
  {
    title: "Advanced analytics",
    description: "Gain deeper insights into your application's performance and user behavior with advanced analytics tools, helping you make informed decisions to optimize your software.",
    logo: "/logo2.png"
  }
]

export default function Home() {
  const { data: usersData, isLoading } = trpc.user.list.useQuery()
  console.log(usersData);

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-primary text-3xl my-3 font-bold">Turn your ideas into apps</h1>
      <h2 className="text-secondary text-2xl">What will you create? The possibilities are endless.</h2>
      <br />
      {/* section 2 */}

      <div className="w-[80%] flex flex-col md:flex-row items-center justify-center gap-8 my-16">
        <div className="w-[50%] md:w-[80%]">
          <Image
            src="/logo2.png"
            alt="Hero Image"
            width={600}
            height={400}
            className="object-contain"
          />
        </div>
        <div className="w-[90%] flex flex-col items-start text-left gap-4">
          <h1 className="text-primary text-4xl font-bold">Build apps using natural language</h1>
          <h2 className="text-secondary text-lg">
            Vibe coding is a revolutionary approach to software development that allows you to create applications using simple, everyday language. No coding skills required!
          </h2>
          <ul className="list-disc list-inside text-secondary space-y-2">
            <li>Describe your app's functionality in plain English.</li>
            <li>Watch as Vibe coding generates the code for you.</li>
            <li>Customize and refine your app with ease.</li>
            <li>Deploy your app with just a few clicks.</li>
          </ul>
        </div>
      </div>


      {/* section 3 */}
      <div className="w-[50%] text-center">
        <h1 className="text-primary text-6xl py-4">The safest place for vibe coding</h1>
        <h2 className="text-secondary text-2xl mt-2">Vibe coding makes software creation accessible to everyone, entirely through natural language. Whether it’s personal software for yourself and family, a new business coming to life, or internal tools at your workplace, Replit is the best place for anybody to build.
        </h2>
      </div>

      {/* auto sliding effect */}
      <div className="relative w-[80%] overflow-hidden py-8 my-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand to-transparent z-10 rounded-3xl" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand to-transparent z-10 rounded-3xl" />

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
      </div>

      <div className="w-full h-full space-y-4 text-center">
        <h1 className="text-primary text-6xl">What are you waiting for?</h1>
        <Button variant="default" size="lg" className="mt-6">Get Started Now</Button>
      </div>

      {/* section 4 */}
      <div className="w-[60%] my-20 grid grid-cols-2 gap-8  p-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4 shadow-linear hover:shadow-hover rounded-card transition-shadow duration-300">
            <Image src={item.logo} alt={item.title} width={80} height={80} className="mb-4" />
            <h3 className="text-primary text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-secondary text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      <Carousel />

    </div>
  );
}
