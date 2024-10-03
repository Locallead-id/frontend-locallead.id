import { Card } from "@/components/ui/card";
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sumarno",
    img: "https://cdn.pixabay.com/photo/2023/01/26/08/21/office-7745317_1280.png",
    title: "Wakil Rektor II",
    company: "Univ. Tribhuwana Tunggadewi",
    message:
      "Profil Kepemimpinan dan solusi mutasi yang disolusikan locallead sangat real time dan sesuai dengan dinamika organisasi",
  },
  {
    name: "Daconi Khotob",
    img: "https://cdn.pixabay.com/photo/2023/01/26/08/21/office-7745317_1280.png",
    title: "Direktur Utama",
    company: "PT Semen Baturaja Tbk",
    message:
      "Locallead sangat membantu dalam pengembangan kepemimpinann talenta muda dan penempatan leader pada posisi dan waktu yang tepat",
  },
  {
    name: "Herry Kristanto",
    img: "https://cdn.pixabay.com/photo/2023/01/26/08/21/office-7745317_1280.png",
    title: "Country Head Indonesia",
    company: "PT Advanta Seeds",
    message:
      "Sebagai user dan pengguna program peningkatan SDM dari Locallead, sangat bermanfaat sekali, efisien waktu dan biaya, report cepat didapat sehingga dapat menjadi salah satu penunjang dalam pengambilan keputusan management dalam bidang sumber daya manusia",
  },
];

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className='flex flex-col gap-6 pb-6'
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(
                ({ company, message, name, title, img }) => (
                  <Card className='p-4 shadow-lg' key={name}>
                    <div>
                      <q>{message}</q>
                    </div>
                    <div className='flex items-center gap-2 mt-5'>
                      <img
                        width={40}
                        height={40}
                        src={img}
                        alt={name}
                        className='h-10 w-10 rounded-full'
                      />
                      <div className='flex flex-col'>
                        <div className='font-medium tracking-tight leading-5'>
                          {name}
                        </div>
                        <div className='leading-5 tracking-tight text-xs'>
                          {title}
                        </div>
                        <div className='leading-5 tracking-tight text-xs'>
                          {company}
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              )}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section>
      <div className='flex justify-center'>
        <h1 className='font-semibold text-xl mt-16 mb-8'>Testimonials</h1>
      </div>
      <h2 className='flex justify-center font-bold text-3xl'>
        What Our Client’s Say
      </h2>
      <div className='flex justify-center gap-6 mt-10 mx-44 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden'>
        <TestimonialsColumn testimonials={testimonials} duration={15} />
        <TestimonialsColumn
          testimonials={testimonials}
          className='hidden md:block'
          duration={19}
        />
        <TestimonialsColumn
          testimonials={testimonials}
          className='hidden lg:block'
          duration={17}
        />
      </div>
    </section>
  );
};

export default Testimonials;
