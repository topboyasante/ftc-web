"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Play, Expand } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MediaItem } from "@/types/media";
import { FullScreenImage } from "../app/(blog)/components/fullscreen-image";

export const ImageMasonryLayout = ({
  mediaItems,
  showVideos = false,
  videoFrameClassName,
  title,
  subtitle,
}: {
  mediaItems: MediaItem[];
  showVideos?: boolean;
  videoFrameClassName?: string;
  title?: string;
  subtitle?: string;
}) => {
  const [fullScreenIndex, setFullScreenIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const displayedItems = useMemo(() => {
    const filteredItems = showVideos
      ? mediaItems
      : mediaItems.filter((item) => item.type === "image");

    return filteredItems;
  }, [mediaItems, showVideos]);

  const openFullScreen = (index: number) => {
    if (displayedItems[index].type === "image") {
      setFullScreenIndex(index);
      setDirection("right");
    }
  };

  const closeFullScreen = () => {
    setFullScreenIndex(null);
  };

  const goToPrevImage = () => {
    setDirection("left");
    setFullScreenIndex((prevIndex) =>
      prevIndex !== null
        ? prevIndex > 0
          ? prevIndex - 1
          : displayedItems.length - 1
        : null
    );
  };

  const goToNextImage = () => {
    setDirection("right");
    setFullScreenIndex((prevIndex) =>
      prevIndex !== null
        ? prevIndex < displayedItems.length - 1
          ? prevIndex + 1
          : 0
        : null
    );
  };

  return (
    <div className='bg-gray-100'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-4'>
          <h1 className='my-3 text-center text-3xl'>{title}</h1>
          <p className='my-3 text-center'>{subtitle}</p>
        </div>
        <AnimatePresence>
          <motion.div
            className='columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {displayedItems.map((item, index) => (
              <motion.div
                layoutId={item.id.toString()}
                key={`${item.id}-${index}`}
                className='relative overflow-hidden rounded-xl transition-shadow duration-300 group break-inside-avoid mb-4'
                onClick={() => openFullScreen(index)}
              >
                <div className='relative w-full'>
                  {item.type === "image" ? (
                    typeof item.src === "object" ? (
                      <Image
                        src={item.src.src}
                        alt={item.title ?? "free the citizens"}
                        width={item.src.width}
                        height={item.src.height}
                        layout='responsive'
                        objectFit='cover'
                        className='cursor-pointer object-cover'
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className='w-full h-auto cursor-pointer'
                      />
                    )
                  ) : item.type === "video" ? (
                    <div
                      className={`aspect-w-16 aspect-h-9 ${videoFrameClassName}`}
                    >
                      <iframe
                        src={item.src as string}
                        title={item.title}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        className='w-full h-full'
                      ></iframe>
                    </div>
                  ) : null}
                  {item.type === "video" && (
                    <div className='absolute top-2 left-2 bg-black bg-opacity-50 text-white p-1 rounded-full'>
                      <Play size={16} />
                    </div>
                  )}
                </div>
                {item.type === "image" && (
                  <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center'>
                    <button className='text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4'>
                      <Expand color='#fff' />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence initial={false} custom={direction}>
        {fullScreenIndex !== null && (
          <FullScreenImage
            items={displayedItems}
            currentIndex={fullScreenIndex}
            onClose={closeFullScreen}
            onPrev={goToPrevImage}
            onNext={goToNextImage}
            direction={direction}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
