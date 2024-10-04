"use client";
import Image from "next/image";
import type { EventImage, TEvent, Update } from "@/types";
import { formatDate, formatTime, getFormattedDate } from "@/utils/date";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { MediaItem } from "@/types/media";
import { AnimatePresence } from "framer-motion";
import { FullScreenImage } from "@/app/(blog)/components/fullscreen-image";
import { ImageSlider } from "@/components/image-carousel";
import { LiveIndicator } from "@/components/live-indicator";
import ReactHtmlParser from "react-html-parser";

type Props = {
  event: TEvent;
};

function UpdateItem({ item }: { item: Update }) {
  const [updateItem, setUpdateItem] = useState<string | null>();

  const itemToScrollTo = String(item.id) === updateItem ? item.id : undefined;

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    setUpdateItem(hash);
  }, []);

  const imagesData: MediaItem[] =
    item.images &&
    item.images.map((data, index) => ({
      id: index + 1,
      title: data.caption,
      type: "image",
      src: data.image,
    }));

  const [fullScreenIndex, setFullScreenIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const openFullScreen = (index: number) => {
    if (imagesData[index].type === "image") {
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
          : imagesData.length - 1
        : null
    );
  };

  const goToNextImage = () => {
    setDirection("right");
    setFullScreenIndex((prevIndex) =>
      prevIndex !== null
        ? prevIndex < imagesData.length - 1
          ? prevIndex + 1
          : 0
        : null
    );
  };

  useEffect(() => {
    const itemContainer = document.getElementById(String(itemToScrollTo));

    itemContainer?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [itemToScrollTo]);

  return (
    <div>
      <AnimatePresence initial={false} custom={direction}>
        {fullScreenIndex !== null && (
          <FullScreenImage
            items={imagesData}
            currentIndex={fullScreenIndex}
            onClose={closeFullScreen}
            onPrev={goToPrevImage}
            onNext={goToNextImage}
            direction={direction}
          />
        )}
      </AnimatePresence>

      <div
        role='tab'
        className='flex items-start mb-8 relative'
        id={String(item.id)}
        tabIndex={1}
      >
        <div className='absolute left-0 -mt-2 lg:ml-6 ml-2 flex items-center gap-2'>
          <div className='size-[10px] bg-orange-500 rounded-full ring-4 ring-orange-200'></div>
          <div className='flex gap-1'>
            <span className='text-sm text-gray-800 font-bold block'>
              {getFormattedDate(item.created_at)}
            </span>
            <span className='text-sm text-gray-600 font-light block'>
              ({formatTime(item.created_at)} GMT)
            </span>
          </div>
        </div>
        <div className='lg:ml-0 md:ml-4 ml-0 bg-white p-4 rounded-md border mt-8 w-full'>
          <h1 className='text-lg font-bold tracking-tight lg:text-xl mt-2 mb-[0.5]'>
            {item.summary}
          </h1>
          <div className='mt-6 Html__Wrapper'>
            {ReactHtmlParser(item.content)}
          </div>
          <div className='my-5 w-full'>
            <ImageSlider data={item.images}>
              {item.images.map((image: EventImage, index: number) => (
                <SwiperSlide key={index} onClick={() => openFullScreen(index)}>
                  <div className='relative lg:h-[30rem] h-60 w-full'>
                    <Image
                      className='w-full h-full object-cover rounded-md'
                      src={image.image ?? "/images/default.jpg"}
                      alt={image.caption ?? "free the citizens"}
                      fill
                    />
                    <em className='text-sm text-gray-500 font-medium'>
                      {image.caption}
                    </em>
                  </div>
                </SwiperSlide>
              ))}
            </ImageSlider>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpdatesList({ updates }: { updates: Update[] }) {
  if (updates.length === 0) {
    return (
      <div className='flex justify-center items-center'>
        <p className='text-neutral-500'>No Updates to display</p>
      </div>
    );
  }

  return (
    <div className='p-4 w-full rounded-md'>
      <div className='mt-4 relative w-full'>
        <div className='absolute left-[5px] top-[9px] bottom-[9px] w-px lg:ml-6 md:ml-4 ml-2 bg-orange-300'></div>
        {updates.map((item, index) => (
          <UpdateItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export function EventDetailsPage({ event }: Props) {
  return (
    <div className='max-w-screen-xl mx-auto px-3'>
      <div className='max-w-screen-xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
          <div className='space-y-4'>
            <div className='inline-flex items-center space-x-2'>
              <div className='static top-4 bg-white px-3 py-0.5 rounded-full'>
                <LiveIndicator label='Live Updates' />
              </div>
            </div>
            <h1 className='text-3xl font-bold leading-tight text-gray-900'>
              {event?.title}
            </h1>
            <div className='flex gap-2'>
              <div className='h-6 bg-aljazeera-red w-[3px]' />
              <div className='flex items-center space-x-2 text-gray-700'>
                <span>By Anon</span>
                <span>{formatDate(event.created_at)}</span>
              </div>
            </div>
            <div className='Html__Wrapper'>
              {ReactHtmlParser(event.description)}
            </div>
          </div>
          <div className='relative aspect-video'>
            <Image
              src={event?.image?.image}
              alt={event?.image?.caption}
              layout='fill'
              className='rounded-lg object-cover'
            />
          </div>
        </div>
      </div>
      {event?.updates ? (
        <div className='mb-2'>
          <span> {event?.updates?.length} Updates</span>
        </div>
      ) : null}
      <div className='h-px bg-gray-300 w-full' />
      <UpdatesList updates={event.updates} />
    </div>
  );
}
