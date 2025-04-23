"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FaChevronLeft, FaChevronRight, FaDownload } from "react-icons/fa";
import { downloadBase64File } from "@/lib/utils";

type ImageFile = {
  _id: string;
  filename: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const Certificates = ({ interval = 3000 }) => {
  const [activeCard, setActiveCard] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [items, setItems] = useState<ImageFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    (async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      try {
        const certificatesRes = await fetch(`${apiUrl}/api/certificates`);
        const certificates = await certificatesRes.json();
        setItems(certificates?.data || []);
      } catch (error) {
        console.error("Failed to fetch certificates", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || items.length === 0 || isHovered) return;

    const timer = setInterval(() => {
      setDirection(1);
      setActiveCard((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, interval, items.length, isHovered]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setActiveCard((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setActiveCard((prev) => (prev + 1) % items.length);
  };

  const getCardStyles = (index: number) => {
    const total = items.length;
    const offset = (((index - activeCard + total) % total) + total) % total;

    const center = Math.floor(total / 2);
    const distance = Math.abs(offset - center);

    return {
      zIndex: total - distance,
      filter: distance === 0 ? "none" : `blur(${distance * 2}px)`,
      x: `${(offset - center) * 330}px`,
      scale: 1 - distance * 0.1,
      opacity: 1 - distance * 0.15,
    };
  };

  const ShimmerCard = ({ offset }: { offset: number }) => (
    <div
      className="absolute w-[450px] h-[400px] rounded-xl bg-gray-800/50 animate-pulse"
      style={{
        transform: `translateX(${offset * 330}px)`,
        opacity: 1 - Math.abs(offset) * 0.15,
        scale: `${1 - Math.abs(offset) * 0.1}`,
        zIndex: 3 - Math.abs(offset),
      }}
    >
      <div className="h-[320px] bg-gray-700/50 rounded-t-xl" />
      <div className="h-[80px] bg-gray-700/50 rounded-b-xl mt-2" />
    </div>
  );

  return (
    <section id="certificates">
      <h1 className="heading mb-10 mt-28">
        My <span className="text-purple">Certificates</span>
      </h1>
      <div className="flex flex-col items-center justify-center relative mx-auto max-w-7xl px-4">
        {isLoading ? (
          <div className="relative w-full h-[400px] flex items-center justify-center">
            <ShimmerCard offset={-1} />
            <ShimmerCard offset={0} />
            <ShimmerCard offset={1} />
          </div>
        ) : (
          <div
            className="relative w-full h-[400px] flex items-center justify-center overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {items.length > 0 && (
              <AnimatePresence initial={false} custom={direction}>
                {items.map((item, idx) => (
                  <motion.div
                    key={item._id}
                    className={twMerge(
                      "absolute flex flex-col items-center justify-center w-[450px] h-[400px] rounded-xl",
                      "bg-gray-800/50 backdrop-blur-lg shadow-xl hover:shadow-2xl cursor-pointer",
                      "border border-gray-700 transition-all p-5"
                    )}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={getCardStyles(idx)}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      mass: 1.2,
                      duration: 0.5,
                    }}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setActiveCard(idx);
                    }}
                    whileHover={{ scale: idx === activeCard ? 1.05 : 1 }}
                  >
                    <div className="relative w-full">
                      <img
                        src={item.content}
                        alt={item.filename}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex gap-3 items-end">
                      <h3 className="text-xl font-bold text-white mt-5 text-center">
                        {item.filename}
                      </h3>
                      <FaDownload
                        title="Download Certificate"
                        className="w-5 h-5 mb-1 hover:text-purple transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadBase64File(item?.content, item?.filename);
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        )}

        <div className="flex gap-4 mt-8">
          <button
            onClick={handlePrevious}
            className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-all border border-white/10"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-all border border-white/10"
            aria-label="Next slide"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
