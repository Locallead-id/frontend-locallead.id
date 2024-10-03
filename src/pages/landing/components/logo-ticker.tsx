import { motion } from "framer-motion";

const logos = [
  {
    img: "https://locallead.id/new_web/_next/static/chunks/images/pos_indonesia_logo-b1d4b17bbdb0987c4b40b2a192bd2381.webp",
  },
  {
    img: "https://locallead.id/new_web/_next/static/chunks/images/universitas_logo-62bedd6722a723b1fe8b8aafacf1da15.webp",
  },
  {
    img: "https://locallead.id/new_web/_next/static/chunks/images/advanta_logo-276f16609ba43ac322b1b94d0dfbb3f7.webp",
  },
  {
    img: "https://locallead.id/new_web/_next/static/chunks/images/pos_indonesia_logo-b1d4b17bbdb0987c4b40b2a192bd2381.webp",
  },
  {
    img: "https://locallead.id/new_web/_next/static/chunks/images/universitas_logo-62bedd6722a723b1fe8b8aafacf1da15.webp",
  },
  {
    img: "https://locallead.id/new_web/_next/static/chunks/images/advanta_logo-276f16609ba43ac322b1b94d0dfbb3f7.webp",
  },
];

const LogoTicker = () => {
  return (
    <div className='py-8 md:py-12'>
      <div className='flex items-center justify-center my-12 text-3xl font-bold'>
        {/* <h2>Our Client</h2> */}
      </div>
      <div className='container'>
        <div className='flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]'>
          <motion.div
            className='flex gap-48 flex-none pr-14'
            animate={{ translateX: "-50%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {logos.map((logo, index) => (
              <img
                className='h-16 w-auto md:h-24 md:w-auto'
                key={index}
                src={logo.img}
                alt='logo'
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
