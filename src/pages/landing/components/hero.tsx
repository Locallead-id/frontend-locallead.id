import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";
import { useRouter } from "@/routes/hooks";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "lucide-react";

const Hero = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <div className='mx-12 md:mx-44 h-full'>
      <div className='md:flex items-center'>
        <div className='md:w-[670px] md:mt-24 mt-16'>
          <div className='text-sm inline-flex border border-slate-950 dark:border-slate-200 px-3 py-1 rounded-lg tracking-tight'>
            Locallead is here
          </div>
          <h1 className='text-3xl md:text-4xl leading-10 font-bold tracking-tighter bg-gradient-to-b from-slate-950 dark:from-slate-200 dark:to-rose-700 to-rose-500 text-transparent bg-clip-text mt-2'>
            Empowering Leaders, Building Stronger Organizations
          </h1>
          <p className='text-sm tracking-tight mt-6 w-96'>
            Celebrate the joy of accomplishment with an app designed to track
            your progress, motivate your efforts, and celebrate your success.
          </p>
          <div className='flex gap-1 items-center mt-[30px]'>
            <Button onClick={() => router.push("/login")} className=''>
              Login
            </Button>
            <button className='text-sm flex items-center ms-4'>
              <span>Learn more</span>
              <ArrowUpIcon className='w-4 h-auto ms-2' />
            </button>
          </div>
        </div>
        <div className='left-1/2 md:mt-12 md:h-[648px] absolute '>
          {theme === "dark" ? (
            <motion.img
              src='https://raw.githubusercontent.com/RezaConz/Mocci/53feb8439e421f7182a6f01814dea33b42dc2097/Ellipse%2033.svg'
              alt='Cog'
              className='absolute md:h-full md:w-auto max-w-none left-0 w-auto h-52 -top-0'
              animate={{
                translateY: [-10, 30],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
            />
          ) : (
            <motion.img
              src='https://raw.githubusercontent.com/RezaConz/Mocci/a4e3d2b19b0d5e4c49740b8bec8fba57a5868a06/Ellipse%2034.svg'
              alt='Cog'
              className='md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0'
              animate={{
                translateY: [-10, 30],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
            />
          )}
          <motion.img
            src='https://artfiles.alphacoders.com/161/161273.jpeg'
            width={220}
            alt='Noodle image'
            className='hidden md:block absolute h-72 w-72 object-cover md:max-w-none top-52 left-52'
            style={{
              rotate: 2,
            }}
            animate={{
              translateY: [-10, 20],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
