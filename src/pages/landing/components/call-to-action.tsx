import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { RefObject, useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";

const useRelativeMousePosition = (to: RefObject<HTMLElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const updateMousePosition = (event: MouseEvent) => {
    if (!to.current) return;
    const { top, left } = to.current.getBoundingClientRect();
    mouseX.set(event.x - left);
    mouseY.set(event.y - top);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  });
  return [mouseX, mouseY];
};

const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const borderedDivRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start end`, "end start"],
  });
  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );

  const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);
  const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <>
      <section className={"py-20 md:py-24 mx-12 md:mx-44"} ref={sectionRef}>
        <div className={"container"}>
          <motion.div
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className={
              "border border-muted py-24 px-6 rounded-xl overflow-hidden relative group"
            }
            style={{
              backgroundPositionY,
            }}
          >
            <div
              className={
                "absolute inset-0 bg-[rgb(222,27,85)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"
              }
            />
            <motion.div
              className={
                "absolute inset-0 bg-[rgb(222,27,85)] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"
              }
              style={{
                maskImage: maskImage,
              }}
              ref={borderedDivRef}
            />
            <div className={"relative"}>
              <h2
                className={"text-5xl tracking-tighter text-center font-medium"}
              >
                Understand your leadership professional
              </h2>
              <p
                className={
                  "text-center text-lg md:text-xl tracking-tight px-4 mt-5"
                }
              >
                Achieve clear, impactful results without the complexity.
              </p>
              <div className={"flex justify-center mt-8"}>
                <Button className="px-8 font-medium text-lg">Start</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
